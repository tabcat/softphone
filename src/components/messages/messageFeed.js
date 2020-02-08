
import React from 'react'
import { useTheme, makeStyles } from '@material-ui/core/styles'
// import useMediaQuery from '@material-ui/core/useMediaQuery'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import { connect } from 'react-redux'
import {
  profileSelectors,
  messagesSelectors,
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
  },
  sendbox: {
    flexGrow: 0
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

const renderMessageFeed = (profile, feed, names) => props => {
  const { style, index } = props
  return (
    <ListItem
      style={style}
      key={index}
    >
      <ListItemText
        primary={feed[index].payload.value.msg.name}
        secondary={feed[index].payload.value.msg.txt}
        primaryTypographyProps={{ variant: 'h6' }}
      />
    </ListItem>
  )
}

function MessageFeed (props) {
  const theme = useTheme()
  const classes = useStyles(theme)

  const listRef = React.createRef()

  React.useEffect(() => {
    if (listRef.current) listRef.current.scrollToItem(feed.length, 'end')
  })

  // const grande = useMediaQuery(theme.breakpoints.up('sm'))
  const itemSize = 76

  const handleChange = (event) => {
    if (event.keyCode === 13 && event.target.value !== '') {
      props.sendMessage(props.selected, { name: props.names[props.address], txt: event.target.value })
      event.target.value = ''
    }
  }

  const renderRow = renderMessageFeed
  const feed = props.feeds[props.selected]

  return (
    <Paper className={classes.root}>
      <div className={classes.listContainer}>
        <div className={classes.list}>
          {
            feed.length === 0
              ? (
                <Typography style={{ textAlign: 'center' }} variant='h4'>
                  {props.initialized ? 'no messages' : 'loading...'}
                </Typography>
              )
              : (
                <AutoSizer>
                  {({ height, width }) => (
                    <FixedSizeList
                      height={height}
                      width={width}
                      itemSize={itemSize}
                      itemCount={feed.length}
                      ref={listRef}
                    >
                      {renderRow(props.selected, feed, props.names)}
                    </FixedSizeList>
                  )}
                </AutoSizer>
              )
          }
        </div>
      </div>
      <div className={classes.sendbox}>
        <TextField
          fullWidth
          // multiline
          rowsMax='4'
          variant='outlined'
          placeholder='send message'
          onKeyDown={handleChange}
        />
      </div>
    </Paper>
  )
}

const mapStateToProps = s => {
  return {
    selected: messagesSelectors.selected(s),
    feeds: messagesSelectors.feeds(s),
    scrolls: messagesSelectors.scrolls(s),
    sendboxes: messagesSelectors.sendboxes(s),
    names: profileSelectors.names(s),
    address: profileSelectors.address(s),
    initialized: messagesSelectors.initialized(s)
  }
}

const mapDispatchToProps = {
  sendMessage: messagesActionCreators.sendMessage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageFeed)
