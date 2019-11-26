
import React from 'react'

class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch (error, errorInfo) {
    this.setState({ error, errorInfo })
    console.error(error, errorInfo)
  }

  render () {
    const { error, errorInfo } = this.state
    if (error) {
      return this.props.errorMsg
        ? this.props.errorMsg(error, errorInfo)
        : <h1>ERROR</h1>
    }
    return this.props.children
  }
}

export default ErrorBoundary
