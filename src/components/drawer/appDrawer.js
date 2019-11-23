
import React from 'react'
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { connect } from 'react-redux'

import ActiveUser from './activeUser'
import AppNav from './appNav'
import AppFooter from './appFooter'

const drawerWidth = 260

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  drawerPaper: {
    width: drawerWidth
  },
  activeUser: theme.mixins.toolbar,
  appNav: {
    flexGrow: 1
  },
  appFooter: theme.mixins.toolbar
}))

function AppDrawer (props) {
  const classes = useStyles()
  const theme = useTheme()

  const handleDrawerToggle = () => {
    props.toggleMobileOpen()
  }

  const drawer = (
    <div className={classes.root}>
      <div className={classes.activeUser} style={{ flexGrow: 0 }}>
        <ActiveUser />
      </div>
      <Divider />
      <div className={classes.appNav}>
        <AppNav />
      </div>
      <Divider />
      <div className={classes.appFooter}>
        <AppFooter />
      </div>
    </div>
  )

  return (
    <nav className={classes.root} aria-label='mailbox folders'>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

      <Hidden smUp implementation='js'>
        <Drawer
          variant='temporary'
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={props.mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>

      <Hidden xsDown implementation='js'>
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant='permanent'
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  )
}

const mapStateToProps = (s) => {
  return {
    mobileOpen: appDrawerSelectors(s).mobileOpen
  }
}

const mapDispatchToProps = {
  toggleMobileOpen: appDrawerActionCreators.toggleMobileOpen
}

AppDrawer.propTypes = {
  classes: PropTypes.instanceOf(Object)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDrawer)
