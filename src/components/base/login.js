
import React, { useRef } from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Lock from '@material-ui/icons/Lock'
import { makeStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux'
import { baseSelectors, baseActionCreators } from '../../state'

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'auto',
    backgroundColor: 'grey',
    height: '100%',
    width: '100%'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    paddingBottom: '20px'
  },
  loginContainer: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  login: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '40px',
    [theme.breakpoints.up('lg')]: {
      minWidth: theme.breakpoints.values.lg
    },
    [theme.breakpoints.down('lg')]: {
      minWidth: '100%'
    },
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginInputs: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: '200px'
    },
    paddingLeft: '20px'
  },
  footer: {}
}))

function Login (props) {
  const classes = useStyles()

  const username = useRef(null)
  const password = useRef(null)

  const handleEnter = (event) => {
    if (event.keyCode === 13 && event.target.value !== '') {
      props.logIn(username.current.value, password.current.value)
    }
  }

  const { initialized, loggingIn, logInFailed } = props

  return (
    <div className={classes.root}>
      <Container maxWidth='xl' className={classes.container}>
        <div className={classes.header} />
        <div className={classes.loginContainer}>
          <div className={classes.login}>
            <Typography variant='h2'>softphone</Typography>
            <div className={classes.loginInputs}>
              <Grid container spacing={1} alignItems='flex-end'>
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item>
                  <TextField
                    error={logInFailed}
                    id='username'
                    label={initialized ? 'username' : 'initializing...'}
                    InputLabelProps={{
                      style: { color: 'black' }
                    }}
                    inputRef={username}
                    onKeyDown={handleEnter}
                    disabled={!initialized || loggingIn}
                    required={initialized}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems='flex-end'>
                <Grid item>
                  <Lock />
                </Grid>
                <Grid item>
                  <TextField
                    error={logInFailed}
                    helperText={logInFailed ? 'login failed' : null}
                    id='password'
                    type='password'
                    label={initialized ? 'password' : 'initializing...'}
                    InputLabelProps={{
                      style: { color: 'black' }
                    }}
                    inputRef={password}
                    onKeyDown={handleEnter}
                    disabled={!initialized || loggingIn}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <div className={classes.footer} />
      </Container>
    </div>
  )
}

const mapStateToProps = (s) => {
  return {
    initialized: baseSelectors.initialized(s),
    loggingIn: baseSelectors.loggingIn(s),
    logInFailed: baseSelectors.logInFailed(s)
  }
}

const mapDispatchToProps = {
  logIn: baseActionCreators.logIn
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
