import React from 'react'
import ReactRouter, { Router, Route, IndexRoute, IndexLink, Link, Redirect, browserHistory } from 'react-router'

import App from './components/App'
import Home from './components/Home'
import BookingList from './components/BookingList'
import Booking from './components/Booking'

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="booking-list" component={BookingList} />
      <Route path="booking" component={Booking} />
    </Route>
  </Router>
)