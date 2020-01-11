
import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import ErrorBoundary from '../errorBoundary'

import { connect } from 'react-redux'
import {
  barSelectors,
  drawerActionCreators,
  drawerSelectors
} from '../../state'

const barContent = {
  Profile: lazy(() => import('../profile/barContent')),
  Contacts: lazy(() => import('../contacts/barContent'))
}

function Bar (props) {
  const theme = useTheme()
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
  }))(theme)

  const handleDrawerToggle = () => {
    props.toggleMobileOpen()
  }

  const renderBarContent = (content) => {
    if (!content || !barContent[content]) return null
    return (
      <ErrorBoundary>
        <Suspense fallback={null}>
          {React.createElement(barContent[content])}
        </Suspense>
      </ErrorBoundary>
    )
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
        {renderBarContent(props.content)}
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = s => {
  return {
    content: barSelectors.content(s),
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
