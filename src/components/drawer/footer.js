
import React from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { appName } from '../../../config'

function Footer (props) {
  return (
    <List>
      <ListItem button key={appName}>
        <ListItemText primary={appName} />
      </ListItem>
    </List>
  )
}

Footer.propTypes = {
  classes: PropTypes.instanceOf(Object)
}

export default Footer
