
import React from 'react'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import VirtualizedList from '../virtualizedList'

import { connect } from 'react-redux'
import { contactsSelectors, contactsActionCreators } from '../../state'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  list: {
    flexGrow: 1
  }
}))

const renderRow = (grande, onClick, contactList) => (props) => {
  const { index, style } = props

  const { sessionId } = contactList[index]

  return (
    <ListItem
      button
      onClick={() => onClick(sessionId)}
      style={style}
      key={index}
    >
      <ListItemText
        primary={sessionId || '<invalid contact>'}
        primaryTypographyProps={{ variant: grande ? 'h4' : 'h5' }}
      />
    </ListItem>
  )
}

function ContactList (props) {
  const theme = useTheme()
  const classes = useStyles(theme)

  const grande = useMediaQuery(theme.breakpoints.up('sm'))
  const itemSize = grande ? 96 : 72

  const onClick = (sessionId) => {
    props.selectContact(sessionId)
  }

  const handleTabChange = (event, index) => {
    if (props.tabIndex !== index) {
      props.setTabIndex(index)
    }
  }

  if (props.tabIndex > 1) console.error('invalid contacts tabIndex')
  const listType = props.tabIndex === 0 ? 'contacts' : 'requests'
  const list = props.tabIndex === 0 ? props.contactList : props.requestList

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
                renderRow={renderRow(grande, onClick, list)}
                itemSize={itemSize}
                itemCount={list.length}
              />
            )
        }
      </div>
    </Paper>
  )
}

const mapStateToProps = s => {
  return {
    contactList: contactsSelectors.contactList(s),
    requestList: contactsSelectors.requestList(s),
    initialized: contactsSelectors.initialized(s),
    tabIndex: contactsSelectors.tabIndex(s)
  }
}

const mapDispatchToProps = {
  selectContact: contactsActionCreators.selectContact,
  setTabIndex: contactsActionCreators.setTabIndex
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactList)
