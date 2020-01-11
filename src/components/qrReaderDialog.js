
import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import QrReader from 'react-qr-reader'

export default function QrReaderDialog (props) {
  const [errored, setErrored] = React.useState(false)
  const [facingMode, setFacingMode] = React.useState('environment')
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const handleClose = () => {
    props.setOpen(false)
  }

  const handleError = (e) => {
    console.error('QrReader errored')
    console.error(e)
    setErrored(true)
  }

  const handleSwitchCamera = () => {
    const opposite = facingMode === 'environment' ? 'user' : 'environment'
    setFacingMode(opposite)
  }

  const handleScan = (val) => {
    if (val !== null) props.onScan(val)
  }

  const reader = (
    <>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
        facingMode={facingMode}
      />
      <DialogActions>
        <Button onClick={handleSwitchCamera} color='secondary'>
          Switch Camera
        </Button>
        <Button onClick={handleClose} color='secondary'>
          Cancel
        </Button>
      </DialogActions>
    </>
  )

  const error = (
    <>
      <DialogTitle id='alert-dialog-title'>
        Error while using Qr Reader.
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          It's likely camera access is simply blocked for the web site.
          Try enabling it, reloading the site, and trying again.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='secondary' autoFocus>
          Exit
        </Button>
      </DialogActions>
    </>
  )

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={!fullScreen}
        open={props.open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        {errored ? error : reader}
      </Dialog>
    </div>
  )
}
