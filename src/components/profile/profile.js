
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
import {
  baseSelectors,
  profileSelectors,
  contactsActionCreators
} from '../../state'

console.log(profileSelectors)

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
  profileId: {
    display: 'flex',
    justifyContent: 'center',
    margin: '5px',
    textAlign: 'center'
  },
  qrCode: {
    display: 'flex',
    justifyContent: 'center',
    padding: '5px 30px',
    alignItems: 'flex-end'
  },
  address: {
    display: 'flex',
    justifyContent: 'center',
    width: 196,
    margin: 'auto',
    wordBreak: 'break-all',
    textAlign: 'center'
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

  const code = (props.ipfsAddr || '') + props.address

  const name = props.loggedIn.username || ''

  const onScan = (val) => {
    if (val !== null) {
      props.addContact(val)
    }
  }

  const handleCopy = () => {
    try {
      window.navigator.clipboard.writeText(code)
    } catch (e) {
      console.error(e)
      console.error('failed to copy address to clipboard')
    }
  }

  if (!props.initialized) return null

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
          <div className={classes.profileId}>
            <Typography>{props.address.split('/')[3]}</Typography>
          </div>
          <div className={classes.qrCode}>
            <QRCode value={code} size={196} />
          </div>
          <div className={classes.address}>
            <Typography>{code}</Typography>
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
    loggedIn: baseSelectors.loggedIn(s),
    initialized: profileSelectors.initialized(s),
    address: profileSelectors.address(s),
    ipfsAddr: profileSelectors.ipfsAddr(s)
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
