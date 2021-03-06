
import React from 'react'
import { useTheme, makeStyles } from '@material-ui/core/styles'
// import useMediaQuery from '@material-ui/core/useMediaQuery'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import VirtualizedList from '../virtualizedList'

import { connect } from 'react-redux'
import {
  profileSelectors,
  messagesSelectors,
  messagesActionCreators
} from '../../state'

import MessageFeed from './messageFeed'

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

const renderMessages = ({ handleSelect }, messageList, names) => props => {
  const { style, index } = props
  const profile = messageList[index]
  const name = names[profile] || profile.split('/')[3] || '<invalid message>'
  return (
    <ListItem
      button
      onClick={() => handleSelect(profile)}
      style={style}
      key={index}
    >
      <ListItemText
        primary={name}
        // secondary={messagesList[profile]}
        primaryTypographyProps={{ variant: 'h5' }}
      />
    </ListItem>
  )
}

function Messages (props) {
  const theme = useTheme()
  const classes = useStyles(theme)

  if (props.selected) return (<MessageFeed />)

  // const grande = useMediaQuery(theme.breakpoints.up('sm'))
  const itemSize = 94

  const handleSelect = (profile) => {
    props.selectMessage(profile)
  }

  const list = props.messageList

  const renderRow = renderMessages
  const handlers = { handleSelect }

  return (
    <Paper className={classes.root}>
      <div className={classes.listContainer}>
        <div className={classes.list}>
          {
            list.length === 0
              ? (
                <Typography style={{ textAlign: 'center' }} variant='h4'>
                  {props.initialized ? 'no messages' : 'loading...'}
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
    initialized: messagesSelectors.initialized(s),
    messageList: messagesSelectors.messageList(s),
    selected: messagesSelectors.selected(s),
    names: profileSelectors.names(s)
  }
}

const mapDispatchToProps = {
  selectMessage: messagesActionCreators.setSelected
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)
