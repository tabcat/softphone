
import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import PersonIcon from '@material-ui/icons/Person'
import SettingsIcon from '@material-ui/icons/Settings'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { makeStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux'
import {
  baseSelectors,
  baseActionCreators,
  contentSelectors,
  contentActionCreators,
  drawerSelectors,
  drawerActionCreators
} from '../../state'

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}))

function ActiveUser (props) {
  const classes = useStyles()

  const handleExpand = () => {
    props.toggleExpanded()
  }

  const handleSelect = (key) => {
    if (props.mobileOpen) props.toggleMobileOpen()
    if (props.selectedContent !== key) props.selectContent(key)
  }

  const handleLogout = () => {
    props.logOut()
  }

  const name = props.loggedIn.username || ''

  const userOptions = (
    <Collapse in={props.expanded} timeout='auto' unmountOnExit>
      <List component='div' disablePadding>
        <ListItem
          button
          className={classes.nested}
          onClick={() => handleSelect('Profile')}
        >
          <ListItemText primary='Profile' />
          <PersonIcon />
        </ListItem>

        <ListItem
          button
          className={classes.nested}
          onClick={() => handleSelect('Settings')}
        >
          <ListItemText primary='Settings' />
          <SettingsIcon />
        </ListItem>

        <ListItem button className={classes.nested} onClick={handleLogout}>
          <ListItemText primary='Logout' />
          <ExitToAppIcon />
        </ListItem>
      </List>
    </Collapse>
  )

  return (
    <List className={classes.root} component='nav' aria-label='active user'>
      <ListItem
        button
        key='user options'
        aria-controls={props.expanded ? 'expand-list' : undefined}
        aria-haspopup='true'
        onClick={handleExpand}
      >
        <ListItemIcon>
          <ListItemAvatar>
            <Avatar>{name[0] || ''}</Avatar>
          </ListItemAvatar>
        </ListItemIcon>
        <ListItemText primary={name} />
        {props.expanded ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      {userOptions}
    </List>
  )
}

const mapStateToProps = s => {
  return {
    mobileOpen: drawerSelectors.mobileOpen(s),
    loggedIn: baseSelectors.loggedIn(s),
    expanded: drawerSelectors.userExpanded(s),
    selectedContent: contentSelectors.selected(s)
    // expanded: drawerSelectors.activeUserOpen(s)
  }
}

const mapDispatchToProps = {
  toggleMobileOpen: drawerActionCreators.toggleMobileOpen,
  toggleExpanded: drawerActionCreators.toggleUserExpanded,
  selectContent: contentActionCreators.selectContent,
  logOut: baseActionCreators.logOut
}

ActiveUser.propTypes = {
  classes: PropTypes.instanceOf(Object)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveUser)
