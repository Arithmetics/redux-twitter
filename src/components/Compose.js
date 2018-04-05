import React from 'react'
import { connect } from 'react-redux'
import { handleNewTweet } from '../actions/tweets'



class Compose extends React.Component {

  state = {
    text: '',
    replyingTo: this.props.parentId || null
  }

  handleInputChange = (e) => {
    const { value } = e.target

    this.setState(() => ({
      text: value
    }))
  }

  isDisabled = () => {
    const { text } = this.state
    return text === ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.dispatch(handleNewTweet(this.state))

    this.setState(() => ({
      text: ''
    }))

    if(this.props.noRedirect){

    } else {
      this.props.history.push('/')
    }

  }

  render(){
    const { text } = this.state

    return (
      <div className="reply-box">
        <h3>Compose {this.props.title || "New Tweet"}</h3>
        <form className='compose-form' onSubmit={this.handleSubmit}>
          <textarea
            rows="5"
            cols="55"
            value={text}
            onChange={this.handleInputChange}
            name='text'
            className='tweet-input'
            type='text' />
          <br />
          <button
            className='submit-button'
            type='submit'
            disabled={this.isDisabled()}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(Compose)
