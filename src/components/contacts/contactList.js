
import React from 'react'
import { useTheme, makeStyles } from '@material-ui/core/styles'
// import useMediaQuery from '@material-ui/core/useMediaQuery'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import VirtualizedList from '../virtualizedList'
import IconButton from '@material-ui/core/IconButton'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import MailIcon from '@material-ui/icons/Mail'

import { connect } from 'react-redux'
import {
  profileSelectors,
  contactsSelectors,
  contactsActionCreators,
  contentActionCreators,
  messagesActionCreators
} from '../../state'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  listContainer: {
    flexGrow: 1
  },
  list: {
    width: '99%',
    height: '99%'
  }
}))

// const renderRow = (onClick, contactList, names) => (props) => {
//   const { index, style } = props
//
//   const { profile } = contactList[index]
//   const name = names[profile]
//
//   return (
//     <ListItem
//       // button
//       // onClick={() => onClick(profile)}
//       style={style}
//       key={index}
//     >
//       <ListItemText
//         primary={name || profile.split('/')[3] || '<invalid contact>'}
//         secondary={name ? profile.split('-')[1] : ''}
//         primaryTypographyProps={{ variant: 'h6' }}
//       />
//     </ListItem>
//   )
// }

const renderContacts = ({ handleMessage }, contacts, names) => props => {
  const { style, index } = props
  const { profile, pending } = contacts[index]
  const name = names[profile] || profile.split('/')[3] || '<invalid contact>'
  return (
    <ListItem
      style={style}
      key={index}
    >
      <ListItemText
        primary={pending ? name + ' (PENDING)' : name}
        secondary={names[profile] ? profile.split('/')[3] : undefined}
        primaryTypographyProps={{ variant: 'h6' }}
      />
      <IconButton
        onClick={() => handleMessage(profile)}
        aria-label='message'
        disabled={pending}
      >
        <MailIcon />
      </IconButton>
    </ListItem>
  )
}

const renderRequests = ({ handleAccept }, requests, names) => props => {
  const { style, index } = props
  const { profile } = requests[index]
  const name = names[profile] || profile.split('/')[3] || '<invalid contact>'
  return (
    <ListItem
      // button
      // onClick={() => onClick(profile)}
      style={style}
      key={index}
    >
      <ListItemText
        primary={name}
        secondary={names[profile] ? profile.split('/')[3] : undefined}
        primaryTypographyProps={{ variant: 'h6' }}
      />
      <IconButton
        onClick={() => handleAccept(profile)}
        aria-label='accept'
      >
        <PersonAddIcon />
      </IconButton>
    </ListItem>
  )
}

function ContactList (props) {
  const theme = useTheme()
  const classes = useStyles(theme)

  // const grande = useMediaQuery(theme.breakpoints.up('sm'))
  const itemSize = 94

  const handleMessage = (profile) => {
    props.setMessage(profile)
    props.selectContent('Messages')
  }

  const handleAccept = (profile) => {
    handleTabChange(null, 0)
    props.acceptContact(profile)
  }

  const handleTabChange = (event, index) => {
    if (props.tabIndex !== index) {
      props.setTabIndex(index)
    }
  }

  if (props.tabIndex > 1) console.error('invalid contacts tabIndex')
  const listType = props.tabIndex === 0 ? 'contacts' : 'requests'
  const list = props.tabIndex === 0 ? props.contactList : props.requestList

  const renderRow = props.tabIndex === 0 ? renderContacts : renderRequests
  const handlers = props.tabIndex === 0
    ? { handleMessage }
    : { handleAccept }

  return (
    <Paper className={classes.root}>
      <div>
        <Tabs
          value={props.tabIndex}
          onChange={handleTabChange}
          variant='fullWidth'
        >
          <Tab label='Contacts' />
          <Tab label='Requests' />
        </Tabs>
      </div>
      <div className={classes.listContainer}>
        <div className={classes.list}>
          {
            list.length === 0
              ? (
                <Typography style={{ textAlign: 'center' }} variant='h4'>
                  {props.initialized ? `no ${listType}` : 'loading...'}
                </Typography>
              )
              : (
                <VirtualizedList
                  renderRow={renderRow(handlers, list, props.names)}
                  itemSize={itemSize}
                  itemCount={list.length}
                />
              )
          }
        </div>
      </div>
    </Paper>
  )
}

const mapStateToProps = s => {
  return {
    contactList: contactsSelectors.contactList(s),
    requestList: contactsSelectors.requestList(s),
    initialized: contactsSelectors.initialized(s),
    tabIndex: contactsSelectors.tabIndex(s),
    names: profileSelectors.names(s)
  }
}

const mapDispatchToProps = {
  selectContent: contentActionCreators.selectContent,
  setMessage: messagesActionCreators.setSelected,
  acceptContact: contactsActionCreators.acceptContact,
  setTabIndex: contactsActionCreators.setTabIndex
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactList)
