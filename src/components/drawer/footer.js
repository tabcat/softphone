
import React from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import config from '../../config'

function Footer (props) {
  return (
    <List>
      <ListItem button key={config.appName}>
        <ListItemText primary={config.appName} />
      </ListItem>
    </List>
  )
}

Footer.propTypes = {
  classes: PropTypes.instanceOf(Object)
}

export default Footer
