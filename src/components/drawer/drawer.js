
import React from 'react'
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider'
import ResponsiveDrawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { connect } from 'react-redux'
import { drawerSelectors, drawerActionCreators } from '../../state'

import ActiveUser from './activeUser'
import Nav from './nav'
import Footer from './footer'

function Drawer (props) {
  const classes = makeStyles(theme => ({
    root: {
      [theme.breakpoints.up('sm')]: {
        width: props.width,
        flexShrink: 0
      },
      height: '100%'
    },
    drawer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },
    drawerPaper: {
      width: props.width + 1
    },
    activeUser: theme.mixins.toolbar,
    nav: {
      flexGrow: 1
    },
    footer: theme.mixins.toolbar
  }))()
  const theme = useTheme()

  const handleDrawerToggle = () => {
    props.toggleMobileOpen()
  }

  const drawer = (
    <div className={classes.root}>
      <div className={classes.drawer}>
        <div className={classes.activeUser}>
          <ActiveUser />
        </div>
        <Divider />
        <div className={classes.nav}>
          <Nav />
        </div>
        <Divider />
        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
    </div>
  )

  return (
    <nav className={classes.root} aria-label='mailbox folders'>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

      <Hidden smUp implementation='js'>
        <ResponsiveDrawer
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
        </ResponsiveDrawer>
      </Hidden>

      <Hidden xsDown implementation='js'>
        <ResponsiveDrawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant='permanent'
          open
        >
          {drawer}
        </ResponsiveDrawer>
      </Hidden>
    </nav>
  )
}

const mapStateToProps = (s) => {
  return {
    width: drawerSelectors.width(s),
    mobileOpen: drawerSelectors.mobileOpen(s)
  }
}

const mapDispatchToProps = {
  toggleMobileOpen: drawerActionCreators.toggleMobileOpen
}

Drawer.propTypes = {
  classes: PropTypes.instanceOf(Object)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Drawer)
