
import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { connect } from 'react-redux'

const drawerWidth = 260

const useStyles = makeStyles(theme => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }
}))

function App (props) {
  const classes = useStyles()
  const theme = useTheme()

  const handleDrawerToggle = () => {
    props.toggleDrawer()
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
          {props.appBarTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = s => {
  return {
    title: appBarSelectors(s).title
  }
}
const mapDispatchToProps = {
  toggleDrawer: appBarActionCreators.toggleDrawer
}

App.propTypes = {
  classes: PropTypes.instanceOf(Object)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
