import React, { Component } from 'react'

import Header from './Header'
import Sidebar from './Sidebar'
// import assign from 'object-assign'

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <Sidebar />

        <main className="content">
          {this.props.children}
        </main>
      </div>
    )
  }
}

// <div>
//   <pre>{JSON.stringify(this.state, null, 2)}</pre>
// </div>
export default App
