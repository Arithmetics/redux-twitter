import { RECEIVE_TWEETS } from '../actions/tweets'
import { LIKE_TWEET } from '../actions/tweets'
import { NEW_TWEET } from '../actions/tweets'


export default function tweets(state = {}, action) {
  switch(action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets
      }
    case LIKE_TWEET:
      const { authedUser, id, hasLiked } = action
      const tweet = state[id]
      console.log("has liked?", hasLiked)
      if (!hasLiked){
        return {
          ...state,
          [action.id]: {
            ...tweet,
            ["likes"]: tweet["likes"].concat([authedUser])
          }
        }
      } else {
        return {
          ...state,
          [action.id]: {
            ...tweet,
            ["likes"]: tweet["likes"].filter((uid) => uid !== authedUser)
          }
        }
      }
    case NEW_TWEET:
      return {
        ...state,
        [action.tweet.id]: action.tweet
      }

  default:
    return state
  }
}
