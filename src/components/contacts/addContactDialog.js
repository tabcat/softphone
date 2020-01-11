
import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import QrReaderDialog from '../qrReaderDialog'

import { connect } from 'react-redux'
import { contactsSelectors, contactsActionCreators } from '../../state'

function AddContactDialog (props) {
  const [readerOpen, setReaderOpen] = React.useState(false)
  const [input, setInput] = React.useState('')
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const handleClose = () => {
    props.setOpen(false)
  }

  const handleInputChange = e => {
    if (e.target.value !== input) {
      setInput(e.target.value)
    }
  }

  const handleReaderScan = val => {
    if (val !== null) {
      setReaderOpen(false)
      setInput(val)
    }
  }

  const handleConfirm = () => {
    if (input !== '') {
      props.addContact(input)
      handleClose()
    }
  }

  return (
    <div>
      <Dialog
        fullWidth={fullScreen}
        open={props.open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle>
          Add Contact
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Provide profile code of account to add as contact.
          </DialogContentText>
          <div style={{ display: 'flex' }}>
            <TextField
              autoFocus
              margin='dense'
              label='profile code'
              value={input}
              onChange={handleInputChange}
              fullWidth
            />
            <div>
              <IconButton onClick={() => setReaderOpen(true)}>
                <PhotoCameraOutlinedIcon />
              </IconButton>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <QrReaderDialog
        open={readerOpen}
        setOpen={setReaderOpen}
        onScan={handleReaderScan}
      />
    </div>
  )
}

const mapStateToProps = s => {
  return {
    open: contactsSelectors.addContactDialogOpen(s)
  }
}

const mapDispatchToProps = {
  setOpen: contactsActionCreators.setAddContactDialogOpen,
  addContact: contactsActionCreators.addContact
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddContactDialog)
