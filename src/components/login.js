
import React from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Lock from '@material-ui/icons/Lock'
import { makeStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux'
import { baseActionCreators } from '../state'

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

function Login () {
  const classes = useStyles()

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
                    id='username'
                    label='username'
                    InputLabelProps={{
                      style: { color: 'black'}
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems='flex-end'>
                <Grid item>
                  <Lock />
                </Grid>
                <Grid item>
                  <TextField
                    id='password'
                    type='password'
                    label='password'
                    InputLabelProps={{
                      style: { color: 'black'}
                    }}
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

const mapDispatchToProps = {
  logIn: baseActionCreators.logIn
}

export default connect(undefined, mapDispatchToProps)(Login)
