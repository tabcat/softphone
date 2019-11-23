
import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import StarBorder from '@material-ui/icons/StarBorder'
import { makeStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}))

function ActiveUser (props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleToggle = () => {
    setOpen(!open)
  }

  return (
    <List component='nav' aria-label='active_user'>
      <ListItem
        button
        key='user_info'
        aria-controls={open ? 'expand-list' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
      >
        <ListItemIcon>
          <ListItemAvatar>
            <Avatar>A</Avatar>
          </ListItemAvatar>
        </ListItemIcon>
        <ListItemText primary='Anders' />
        <ListItemSecondaryAction>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
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
    expanded: activeUserSelectors.expanded
  }
}

const mapDispatchToProps = {
  toggleExpand: activeUserActionCreators.toggleExpand,
  setContent: appContentActionCreators.setContent,
  selectLogOut: baseActionCreators.selectLogOut
}

ActiveUser.PropTypes = {
  classes: PropTypes.instanceOf(Object)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveUser)
