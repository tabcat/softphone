
import React from 'react'
import PropTypes from 'prop-types'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MailIcon from '@material-ui/icons/Mail'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { connect } from 'react-redux'

function App (props) {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <List>
      {['Messages', 'Contacts', 'Favorites'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>
            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  )
}

const mapStateToProps = s => {
  return {
    // state: appNavSelectors(s)
  }
}

const mapDispatchToProps = {
  selectContent: appContentActionCreators.selectContent
}

App.propTypes = {
  classes: PropTypes.instanceOf(Object)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
