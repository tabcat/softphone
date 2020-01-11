
import React, { useState } from 'react'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
// import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined'
import QrReaderDialog from '../qrReaderDialog'

import { connect } from 'react-redux'
import { baseSelectors, contactsActionCreators } from '../../state'

const QRCode = require('qrcode.react')

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overFlow: 'auto'
  },
  profile: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  qrCode: {
    display: 'flex',
    justifyContent: 'center',
    padding: '30px',
    paddingBottom: '10px',
    alignItems: 'flex-end'
  },
  qrValue: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

function Profile (props) {
  const theme = useTheme()
  const classes = useStyles(theme)

  const [readerOpen, setReaderOpen] = useState(false)

  const address =
    '/orbitdb/zdpuAo94N9wbyZUbVw8Bk9RDiwWZEqETJ8VQfjRKcKdJoZigh/asym_channel-158.91.123.90.179.4.50.87.60.66.27.151'

  const name = props.loggedIn.username || ''

  const onScan = (val) => {
    if (val !== null) {
      props.addContact(val)
    }
  }

  const handleCopy = () => {
    window.navigator.clipboard.writeText(address)
  }

  // <PhotoCameraOutlinedIcon onClick={() => setReaderOpen(true)} />
  // <div style={{ width: '30px' }} />

  return (
    <Paper className={classes.root}>
      <div className={classes.container}>
        <div style={{ height: '30px' }} />
        <div className={classes.profile}>
          <Avatar>{name[0] || ''}</Avatar>
          <div style={{ width: '15px' }} />
          <Typography variant='h6'>{name}</Typography>
        </div>
        <div>
          <div className={classes.qrCode}>
            <QRCode value={address} size={196} />
          </div>
          <div className={classes.qrValue}>
            <IconButton onClick={handleCopy}>
              <FileCopyOutlinedIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <QrReaderDialog
        open={readerOpen}
        setOpen={setReaderOpen}
        onScan={onScan}
      />
    </Paper>
  )
}

const mapStateToProps = s => {
  return {
    loggedIn: baseSelectors.loggedIn(s)
    // expanded: drawerSelectors.activeUserOpen(s)
  }
}

const mapDispatchToProps = {
  addContact: contactsActionCreators.addContact
  // toggleMobileOpen: drawerActionCreators.toggleMobileOpen,
  // toggleExpanded: drawerActionCreators.toggleUserExpanded,
  // selectContent: contentActionCreators.selectContent
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
