
import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux'
import {
  barSelectors,
  drawerActionCreators,
  drawerSelectors
} from '../../state'

function Bar (props) {
  const classes = makeStyles(theme => ({
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${props.drawerWidth}px)`,
        marginLeft: props.drawerWidth
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none'
      }
    }
  }))

  const handleDrawerToggle = () => {
    props.toggleMobileOpen()
  }

  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' noWrap>
          {props.title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = s => {
  return {
    title: barSelectors.title(s),
    drawerWidth: drawerSelectors.width(s)
  }
}
const mapDispatchToProps = {
  toggleMobileOpen: drawerActionCreators.toggleMobileOpen
}

Bar.propTypes = {
  classes: PropTypes.instanceOf(Object)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bar)
