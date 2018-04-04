import { saveLikeToggle } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { saveTweet } from '../utils/api'
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const LIKE_TWEET = 'LIKE_TWEET'
export const NEW_TWEET = 'NEW_TWEET'


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

function newTweet(tweet){
  return {
    type: NEW_TWEET,
    tweet
  }
}

export function handleNewTweet(tweet){
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveTweet({
      ...tweet,
      author: authedUser
    }).then((tweet) => {
      console.log("gsdf", tweet)
      dispatch(newTweet(tweet))
    })
    .then(() => dispatch(hideLoading()))
  }
}
