import { saveLikeToggle } from '../utils/api'
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const LIKE_TWEET = 'LIKE_TWEET'


export function receiveTweets(tweets){
  return {
    type: RECEIVE_TWEETS,
    tweets
  }
}

function likeTweet({ authedUser, id, hasLiked }){
  return {
    type: LIKE_TWEET,
    authedUser,
    hasLiked,
    id
  }
}

export function handleLikeTweet(likeData){
  return (dispatch) => {
    return saveLikeToggle(likeData)
      .then(() => dispatch(likeTweet(likeData)))
  }
}
