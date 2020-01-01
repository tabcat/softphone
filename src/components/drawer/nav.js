
import React from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MailIcon from '@material-ui/icons/Mail'
import ContactsIcon from '@material-ui/icons/Contacts'

import { connect } from 'react-redux'
import {
  contentSelectors,
  contentActionCreators
} from '../../state'

const contentToIcon = {
  Contacts: <ContactsIcon />,
  Messages: <MailIcon />
}

function Nav (props) {
  const handleSelectContent = (content) => {
    props.selectContent(content)
  }

  return (
    <List component='nav' aria-label='navigation'>
      {Object.keys(contentToIcon).map(key => (
        <ListItem button key={key} onClick={() => handleSelectContent(key)}>
          <ListItemIcon>
            {contentToIcon[key]}
          </ListItemIcon>
          <ListItemText primary={key} />
        </ListItem>
      ))}
    </List>
  )
}

const mapStateToProps = s => {
  return {
    // favoritesOpen: drawerSelectors.favoritesOpen(s)
    selectedContent: contentSelectors.selected(s)
  }
}

const mapDispatchToProps = {
  selectContent: contentActionCreators.selectContent
}

Nav.propTypes = {
  classes: PropTypes.instanceOf(Object)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav)
