
import React from 'react'
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { connect } from 'react-redux'
import { drawerSelectors, drawerActionCreators } from '../../state'

import ActiveUser from './activeUser'
import Nav from './nav'
import Footer from './footer'

function AppDrawer (props) {
  const classes = makeStyles(theme => ({
    root: {
      [theme.breakpoints.up('sm')]: {
        width: props.drawerWidth,
        flexShrink: 0
      }
    },
    drawer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },
    drawerPaper: {
      width: props.drawerWidth
    },
    activeUser: theme.mixins.toolbar,
    nav: {
      flexGrow: 1
    },
    footer: theme.mixins.toolbar
  }))
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
      <div className={classes.nav}>
        <Nav />
      </div>
      <Divider />
      <div className={classes.footer}>
        <Footer />
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
    width: drawerSelectors(s).width,
    mobileOpen: drawerSelectors(s).mobileOpen
  }
}

const mapDispatchToProps = {
  toggleMobileOpen: drawerActionCreators.toggleMobileOpen
}

AppDrawer.propTypes = {
  classes: PropTypes.instanceOf(Object)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDrawer)
