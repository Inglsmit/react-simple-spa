import React, { Component }  from 'react'
import ReactRouter, { Link } from 'react-router'
import onWindowResize from '../decorators/onWindowResize'
import Loading from './Loading'

import { IconButton, Avatar, List, ListItem, TextField } from 'material-ui'

import BackIcon from 'material-ui/svg-icons/hardware/keyboard-backspace'
import CloseIcon from 'material-ui/svg-icons/navigation/close'

import PhoneIcon from 'material-ui/svg-icons/communication/phone'
import NotificationIcon from 'material-ui/svg-icons/social/notifications'
import MessagesIcon from 'material-ui/svg-icons/communication/email'

import CalendarIcon from 'material-ui/svg-icons/action/event'
import PlaceIcon from 'material-ui/svg-icons/maps/place'
import EventIcon from 'material-ui/svg-icons/action/assignment'
import WorkIcon from 'material-ui/svg-icons/action/work'
import ContactIcon from 'material-ui/svg-icons/action/perm-contact-calendar'
import PayIcon from 'material-ui/svg-icons/action/payment'
import DaysLeftIcon from 'material-ui/svg-icons/action/book'
import NoteIcon from 'material-ui/svg-icons/notification/event-note'
import TeamIcon from 'material-ui/svg-icons/social/group'
import TimeIcon from 'material-ui/svg-icons/device/access-time'
import RefIcon from 'material-ui/svg-icons/action/bookmark'

import CheckIcon from 'material-ui/svg-icons/action/check-circle'
import SendIcon from 'material-ui/svg-icons/content/send'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz'

// for form more
import SmileIcon from 'material-ui/svg-icons/editor/insert-emoticon'
import TemplatesIcon from 'material-ui/svg-icons/action/speaker-notes'
import AttachIcon from 'material-ui/svg-icons/editor/attach-file'
import ListBulletedIcon from 'material-ui/svg-icons/editor/format-list-bulleted'
import TimerIcon from 'material-ui/svg-icons/av/av-timer'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import AddIcon from 'material-ui/svg-icons/content/add'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'


class Booking extends Component {

  showMessages = () => {
    if (this.props.isMobile) {
      const messagesBlock = document.querySelector('.messages')
      const bookingBlock = document.querySelector('.booking')

      bookingBlock.classList.toggle('invisible')
      messagesBlock.classList.toggle('messages--active')
    }
  }

  showMessageTemplates = () => {
    const templates = document.querySelector('.messages__form-submit-templates')
    templates.classList.toggle('invisible')
  }

  render() {

    const { isMobile } = this.props
    const { booking } = this.props

    const name = booking.contacts[0].first_name + ' ' + booking.contacts[0].last_name
    const role = booking.contacts[0].role || 'No Info'
    const date = new Date(booking.event_date).toUTCString().slice(0, 16) || 'No Info'
    const place = booking.venue || 'No Info'
    const eventType = booking.event_type || 'No Info'
    const workPackage = 'Band & DJ Package'
    const paid = 'Paid ' + booking.deposit + ' of ' + booking.total  || 'No Info'
    const daysLeft = Math.round((new Date(date) - new Date()) / 1000 / 60 / 60 / 24) + ' Days Left'  || 'No Info'
    let notesPart = 'No info'
    if (booking.notes.length > 0) {
      notesPart = booking.notes[booking.notes.length - 1].note
    }
    const inputStyles = {
      underlineStyle: {
        borderColor: '#2074fe',
      },
      floatingLabelStyle: {
        color: '#4286fe',
      },
      floatingLabelFocusStyle: {
        color: '#4286fe',
      },
    }

    const btnSendStyle = isMobile ? { borderRadius: '50%', backgroundColor: '#2979ff' } : { backgroundColor: 'white' }
    const iconSendColor = isMobile ? 'white' : '#2979ff'
    const iconMessageActionsColor = 'grey'

    const listOfMessages = booking.notes.map((message, i) => {
      const imgSrc = message.type === 'system' ? 'https://pp.vk.me/c10408/u4172580/-6/x_ee97448e.jpg' : 'https://placehold.it/50x50'
      const text = message.note
      const date = new Date(message.date_created.replace(' ', 'T'))
      const dayOfTheWeek = date.toUTCString().slice(0, 3)
      const time = dayOfTheWeek + ' ' + message.date_created.split(' ')[1].slice(0, 5)
      const messageClass = message.type === 'system' ? 'messages__item' : 'messages__item messages__item--reverse'

      return (
        <li key={message.note_id} className={messageClass}>
          <div className="messages__ava">
            <Avatar src="https://placehold.it/50x50" />
          </div>
          <div className="messages__content">
            <p className="messages__text">{text}</p>
            <p className="messages__time">{time}</p>
          </div>
          <div className="messages__actions">
            <CheckIcon color="green"/>
          </div>
        </li>
      )
    })

    return (
      <div>
        <div className="booking">
          <div className="booking__top">
            <div className="booking__nav">
              <Link to="/bookings"><IconButton><BackIcon color="white" /></IconButton></Link>
              <IconButton><CloseIcon color="white" /></IconButton>
            </div>
            <div className="booking__contacts">
              <div>
                <Avatar src="https://placehold.it/30x30" size={30}/>
              </div>
              <div>
                <Avatar src="https://placehold.it/30x30" size={30}/>
              </div>
              <div>
                <IconButton style={{ borderRadius: "50%", backgroundColor: "#2979ff", width: 30, height: 30, padding: 5 }} iconStyle={{ width: 20, height: 20 }}>
                  <MoreHorizIcon color="white" />
                </IconButton>
              </div>
            </div>
            <div className="booking__user">
              <div className="booking__user-ava">
                <Avatar src="https://placehold.it/50x50" size={50}/>
              </div>
              <div className="booking__user-name">
                <p>{name}</p>
                <small>{role}</small>
              </div>
            </div>
            <div className="booking__actions">
              <IconButton><PhoneIcon color="white" /></IconButton>
              <IconButton onTouchTap={this.showMessages}><MessagesIcon color="white" /></IconButton>
              <IconButton><NotificationIcon color="white" /></IconButton>
            </div>
          </div>
          <div className="booking__info">
            <List>
              <ListItem primaryText={date} leftIcon={<CalendarIcon />} />
              <ListItem primaryText={place} leftIcon={<PlaceIcon />} />
              <ListItem primaryText={eventType} leftIcon={<EventIcon />} />
              <ListItem primaryText={workPackage} leftIcon={<WorkIcon />} />
              <ListItem primaryText="???" leftIcon={<ContactIcon />} />
              <ListItem primaryText={paid} leftIcon={<PayIcon />} />
              <ListItem primaryText={daysLeft} leftIcon={<DaysLeftIcon />} />
              <ListItem primaryText={notesPart} leftIcon={<NoteIcon />} />
              <ListItem primaryText="Team" leftIcon={<TeamIcon />} />
              <ListItem primaryText="Timeline" leftIcon={<TimeIcon />} />
              <ListItem primaryText="???" leftIcon={<RefIcon />} />
            </List>
          </div>
        </div>

        <div className="messages">
          <div className="messages__inner">
            <div className="messages__header">
              <IconButton onTouchTap={this.showMessages}><BackIcon color="white" /></IconButton>
              <IconButton><CloseIcon color="white" /></IconButton>
            </div>
            <ul className="messages__list">
              {listOfMessages}
            </ul>
            <form className="messages__form">
              <div className="messages__form-more">
                <IconButton style={{ borderRadius: "50%", backgroundColor: "#9babb3" }}>
                  <MoreVertIcon color="white" />
                </IconButton>
              </div>
              <div className="messages__form-input">
                <TextField className="messages__form-input-desktop"
                  floatingLabelText="Write Message"
                  underlineStyle={inputStyles.underlineStyle}
                  underlineFocusStyle={inputStyles.underlineStyle}
                  floatingLabelStyle={inputStyles.floatingLabelStyle}
                  floatingLabelFocusStyle={inputStyles.floatingLabelFocusStyle}
                  style={{
                    width: '100%'
                  }}
                />
              <input className="messages__form-input-mobile" type="text" placeholder="Write Message"/>
              </div>
              <div className="messages__form-submit">
                <div className="messages__form-submit-templates invisible">
                  <div className="messages__form-submit-templates-top">
                    <IconButton style={btnSendStyle} onTouchTap={this.showMessageTemplates}>
                      <TemplatesIcon color={iconMessageActionsColor} />
                    </IconButton>
                    <p>Message Templates</p>
                    <IconButton style={btnSendStyle}>
                      <AddIcon color="#2979ff" />
                    </IconButton>

                  </div>
                  <ul className="messages__form-submit-templates-list">
                    <li>Hello
                      <IconButton style={btnSendStyle}>
                        <DeleteIcon color={iconMessageActionsColor} />
                      </IconButton>
                    </li>
                    <li>Goodbye
                      <IconButton style={btnSendStyle}>
                        <DeleteIcon color={iconMessageActionsColor} />
                      </IconButton>
                    </li>
                    <li>Thank you
                      <IconButton style={btnSendStyle}>
                        <DeleteIcon color={iconMessageActionsColor} />
                      </IconButton>
                    </li>
                    <li>How are you?
                      <IconButton style={btnSendStyle}>
                        <DeleteIcon color={iconMessageActionsColor} />
                      </IconButton>
                    </li>
                    <li>I have sent you a message
                      <IconButton style={btnSendStyle}>
                        <DeleteIcon color={iconMessageActionsColor} />
                      </IconButton>
                    </li>
                  </ul>
                </div>
                <div className="messages__form-submit-more">
                  <IconButton style={btnSendStyle}>
                    <SmileIcon color={iconMessageActionsColor} />
                  </IconButton>
                  <IconButton style={btnSendStyle} onTouchTap={this.showMessageTemplates}>
                    <TemplatesIcon color={iconMessageActionsColor} />
                  </IconButton>
                  <IconButton style={btnSendStyle}>
                    <AttachIcon color={iconMessageActionsColor} />
                  </IconButton>
                  <IconButton style={btnSendStyle}>
                    <ListBulletedIcon color={iconMessageActionsColor} />
                  </IconButton>
                  <IconButton style={btnSendStyle}>
                    <TimerIcon color={iconMessageActionsColor} />
                  </IconButton>
                  <IconButton style={btnSendStyle}>
                    <DeleteIcon color={iconMessageActionsColor} />
                  </IconButton>
                </div>
                <div className="messages__form-submit-sub">
                  <IconButton style={btnSendStyle}>
                    <SendIcon color={iconSendColor} />
                  </IconButton>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default onWindowResize(Booking)
