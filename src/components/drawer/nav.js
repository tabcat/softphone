
import React from 'react'
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Collapse from '@material-ui/core/Collapse'
import MailIcon from '@material-ui/icons/Mail'
import ContactsIcon from '@material-ui/icons/Contacts'
import StarIcon from '@material-ui/icons/Star'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux'
import {
  drawerSelectors,
  drawerActionCreators,
  contentActionCreators
} from '../../state'

const contentToIcon = {
  Messages: <MailIcon />,
  Contacts: <ContactsIcon />
}

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}))

function Nav (props) {
  const classes = useStyles()

  const handleSetContent = (content) => {
    props.setContent(content)
  }

  const handleExpand = () => {
    props.toggleFavoritesOpen()
  }

  return (
    <List component='nav' aria-label='navigation'>
      {Object.keys(contentToIcon).map(key => (
        <ListItem button key={key} onClick={() => handleSetContent(key)}>
          <ListItemIcon>
            {contentToIcon[key]}
          </ListItemIcon>
          <ListItemText primary={key} />
        </ListItem>
      ))}
      <Divider />
      <ListItem button key='Favorites' onClick={handleExpand}>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary='Favorites' />
        <ListItemSecondaryAction>
          {props.favoritesOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={props.favoritesOpen} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              icon
            </ListItemIcon>
            <ListItemText primary='Starred' />
          </ListItem>
        </List>
      </Collapse>
    </List>
  )
}

const mapStateToProps = s => {
  return {
    favoritesOpen: drawerSelectors(s).favoritesOpen
  }
}

const mapDispatchToProps = {
  setContent: contentActionCreators.setContent,
  toggleFavoritesOpen: drawerActionCreators.toggleFavoritesOpen
}

Nav.propTypes = {
  classes: PropTypes.instanceOf(Object)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav)
