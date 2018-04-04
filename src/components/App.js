import React, { Component } from 'react'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'

import Timeline from './Timeline'


class App extends Component {

  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div>
        <LoadingBar />
        {this.props.loading === true ? null : <Timeline />}
      </div>
    )
  }
}

function mapStateToProps({ authedUser }){
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
