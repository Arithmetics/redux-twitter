import React, { Component, Fragment } from 'react'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import Compose from './Compose'
import Timeline from './Timeline'
import Tweet from './Tweet'
import Nav from './Nav'


class App extends Component {

  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div>
            <Nav />
              {this.props.loading === true ?
                null
                : <div>
                    <Route path='/' exact component={Timeline} />
                    <Route path='/new' component={Compose} />
                    <Route path='/tweets/:id' component={Tweet} />
                  </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }){
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
