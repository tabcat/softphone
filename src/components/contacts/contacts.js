
import React from 'react'
import ContactList from './contactList'
import Contact from './contact'

import { connect } from 'react-redux'
import { contactsSelectors } from '../../state'

function Contacts (props) {
  return (
    props.selected !== null ? <Contact /> : <ContactList />
  )
}

const mapStateToProps = s => {
  return {
    selected: contactsSelectors.selected(s)
  }
}

export default connect(
  mapStateToProps
)(Contacts)
