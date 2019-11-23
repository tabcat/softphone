
import React from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
}))

function AppFooter (props) {
  // const classes = useStyles()
  // const theme = useTheme()

  return (
    <List>
      {['Softphone'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  )
}

// const mapStateToProps = s => {
//   return {
//
//   }
// }

AppFooter.propTypes = {
  classes: PropTypes.instanceOf(Object)
}

export default AppFooter
