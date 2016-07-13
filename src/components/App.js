import React, { Component } from 'react'

import Header from './Header'
import Sidebar from './Sidebar'
import Content from './Content'
// import assign from 'object-assign'

class App extends Component {
  state = {
    navIsOpen: false,
    fetching: false,
    error: '',
    fetched: false,
    token: ''
  }

  toggleNav = (ev) => {
    this.setState({
      navIsOpen: !this.state.navIsOpen
    })
  }

  componentDidMount() {
    this.setState({
      fetching: true,
      error: '',
      fetched: false
    })

    const http = new XMLHttpRequest()
    const url = 'http://test.easybook.ie/api/login'
    const params = 'user=info@thepearlsband.ie&password=27e877c3d7c5c939fb3b995a366f52d9'

    http.open('POST', url, true);

    // Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // http.setRequestHeader("Content-length", params.length);
    // http.setRequestHeader("Connection", "close");

    http.onreadystatechange = () => {//Call a function when the state changes.
    	if (http.readyState == 4 && http.status == 200) {
    		const res = JSON.parse(http.responseText)

        // console.log('         *** *** ***')
        // console.log('error:')
        // console.log(res.error)
        // console.log('succes:')
        // console.log(res.success)
        // console.log('token:')
        // console.log(res.response.token)
        // console.log('         *** *** ***')

        this.setState({
          fetching: false,
          error: res.error,
          fetched: res.success,
          token: res.response.token
        })
    	}
    }
    http.send(params);
  }

  render() {
    return (
      <div>
        <Sidebar navIsOpen={this.state.navIsOpen} toggleNav={this.toggleNav} />
        <Header navIsOpen={this.state.navIsOpen} toggleNav={this.toggleNav} />
        <Content token={this.state.token} children={this.props.children} navIsOpen={this.state.navIsOpen}/>
      </div>
    )
  }
}

export default App
