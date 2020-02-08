
import React from 'react'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
// import { useTheme } from '@material-ui/core/styles'

import { connect } from 'react-redux'
import { messagesSelectors, messagesActionCreators, profileSelectors } from '../../state'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%'
  },
  title: {
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

  const title = props.selected
    ? 'Messages / ' + (props.names[props.selected] || props.selected.split('/')[3])
    : 'Messages'

  return (
    <>
      <Typography variant='h6' className={classes.title}>
        {title}
      </Typography>
      <IconButton onClick={handleAddContact}>
        <PersonAddIcon />
      </IconButton>
    </>
  )
}

const mapStateToProps = s => {
  return {
    selected: messagesSelectors.selected(s),
    names: profileSelectors.names(s)
    // initialized: messagesSelectors.initialized(s)
  }
}

const mapDispatchToProps = {
  setAddContactDialogOpen: messagesActionCreators.setAddContactDialogOpen,
  showContactList: messagesActionCreators.showContactList
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BarContent)
