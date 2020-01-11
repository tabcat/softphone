
import React from 'react'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
// import { useTheme } from '@material-ui/core/styles'
import AddContactDialog from './addContactDialog'

import { connect } from 'react-redux'
import { contactsSelectors, contactsActionCreators } from '../../state'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%'
  },
  grow: {
    flexGrow: 1
  }
}))

function BarContent (props) {
  const theme = useTheme()
  const classes = useStyles(theme)
  // useTheme()

  const handleAddContact = () => {
    props.setAddContactDialogOpen(true)
  }

  return (
    <div className={classes.root}>
      <Typography variant='h6' noWrap>
        Contacts
      </Typography>
      <div className={classes.grow} />
      <IconButton onClick={handleAddContact}>
        <PersonAddIcon />
      </IconButton>
      <AddContactDialog />
    </div>
  )
}

const mapStateToProps = s => {
  return {
    selected: contactsSelectors.selected(s)
    // initialized: contactsSelectors.initialized(s)
  }
}

const mapDispatchToProps = {
  setAddContactDialogOpen: contactsActionCreators.setAddContactDialogOpen,
  showContactList: contactsActionCreators.showContactList
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BarContent)
