import React from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import { handleLikeTweet } from '../actions/tweets'
import Compose from './Compose'

class Tweet extends React.Component {

  handleLike = (tweetId, liked) => {
    const { authedUser } = this.props
    this.props.dispatch(handleLikeTweet({ authedUser, id: tweetId, hasLiked: liked }))
  }

  render(){
    const id = this.props.match.params.id
    const currentTweet = this.props.tweets.find(function(tweet){
      return tweet.id === id
    })
    const replyTweets = this.props.tweets.filter(function(tweet){
      return tweet.parent && tweet.parent.id === id
    })


    return (
      <div>
        <div className="time-line">
        <div className='tweet-box' key={currentTweet.id}>
          <div className='avatar-box'>
            <img className="avatar" src={currentTweet.avatar} alt={`Avatar for ${currentTweet.name}`} />
          </div>
          <div className='tweet-content'>
            <p className='tweet-name'>{currentTweet.name}</p>
            <p>{currentTweet.parent ? "replying to @" + currentTweet.parent.author : ""}</p>
            <p>{formatDate(currentTweet.timestamp)}</p>
            <p>{currentTweet.text}</p>
            <div className='button-area'>
              <button
                className='reply-button'>
              </button>
              <button
                className={currentTweet.hasLiked ? 'unlike-button' : 'like-button'}
                onClick={()=>{this.handleLike(currentTweet.id, currentTweet.hasLiked)}}
                >
              </button>
              <p className="likes">{currentTweet.likes}</p>
            </div>
          </div>
        </div>

        <Compose
          title={"Reply to Tweet"}
          parentId={id}
          noRedirect={true}
          />

          {replyTweets.map((tweet) => (
            <div className='tweet-box' key={tweet.id}>
              <div className='avatar-box'>
                <img className="avatar" src={tweet.avatar} alt={`Avatar for ${tweet.name}`} />
              </div>
              <div className='tweet-content'>
                <p className='tweet-name'>{tweet.name}</p>
                <p>{tweet.parent ? "replying to @" + tweet.parent.author : ""}</p>
                <p>{formatDate(tweet.timestamp)}</p>
                <p>{tweet.text}</p>
                <div className='button-area'>
                  <button
                    className='reply-button'>
                  </button>
                  <button
                    className={tweet.hasLiked ? 'unlike-button' : 'like-button'}
                    onClick={()=>{this.handleLike(tweet.id, tweet.hasLiked)}}
                    >
                  </button>
                  <p className="likes">{tweet.likes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, tweets, users} ){

  return {
    tweets: Object.keys(tweets).map((id) => {
      return (
      formatTweet(
        tweets[id],
        users[tweets[id].author],
        authedUser,
        tweets[tweets[id].replyingTo]
      )
    )
  }).sort((a,b) => b.timestamp - a.timestamp),
   authedUser,
   users
 }
}

export default connect(mapStateToProps)(Tweet)
