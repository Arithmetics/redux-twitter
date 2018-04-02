import React from 'react'
import { connect } from 'react-redux'

class Timeline extends React.Component {
  render(){
    console.log("yoo",this.props.tweets)
    return (
      <div>
        <h1>Your Timeline</h1>
        
      </div>
    )
  }
}


function mapStateToProps({ authedUser, tweets, users} ){

  return {
   authedUser,
   tweets,
   users
 }
}

export default connect(mapStateToProps)(Timeline)
