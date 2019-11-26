
import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Lock from '@material-ui/icons/Lock'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
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
    padding: '20px',
    [theme.breakpoints.up('lg')]: {
      minWidth: theme.breakpoints.values.lg
    },
    [theme.breakpoints.down('lg')]: {
      minWidth: '100%'
    },
    backgroundColor: '#dfdfdf',
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

export default function Login () {
  const classes = useStyles()

  return (
    <>
      <CssBaseline />
      <Container maxWidth='xl'>
        <div className={classes.root}>
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
                    <TextField id='input-with-icon-grid' label='username' />
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems='flex-end'>
                  <Grid item>
                    <Lock />
                  </Grid>
                  <Grid item>
                    <TextField
                      id='input-with-icon-grid'
                      type='password'
                      label='password'
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
          <div className={classes.footer} />
        </div>
      </Container>
    </>
  )
}
