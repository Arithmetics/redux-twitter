import React from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import { handleLikeTweet } from '../actions/tweets'

class Timeline extends React.Component {

  handleLike = (tweetId, liked) => {
    const { authedUser } = this.props
    this.props.dispatch(handleLikeTweet({ authedUser, id: tweetId, hasLiked: liked }))
  }

  render(){
    const tweets = this.props.tweets
    console.log(tweets);
    return (
      <div>
        <div className="time-line">
          <h1>Your Timeline</h1>
          {tweets.map((tweet) => (
            <div className='tweet-box' key={tweet.id}>
              <div className='avatar-box'>
                <img className="avatar" src={tweet.avatar} alt={`Avatar for ${tweet.name}`} />
              </div>
              <div className='tweet-content'>
                <p className='tweet-name'>{tweet.name}</p>
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

export default connect(mapStateToProps)(Timeline)
