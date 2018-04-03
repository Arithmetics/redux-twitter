import React from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'

class Timeline extends React.Component {
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
                <p>{tweet.parent ? 'replying to @' + tweet.parent.author : null}</p>
                <p>Liked?{tweet.hasLiked ? " yes" : " no"}</p>
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
