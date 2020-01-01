
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

    const defaultErrorMsg = (
      <div
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: '#000000'
        }}
      >
        <p
          style={{
            textAlign: 'center',
            paddingTop: '40%',
            color: '#ffffff'
          }}
        >
          fatal error
        </p>
      </div>
    )
    if (error) {
      return this.props.errorMsg
        ? this.props.errorMsg(error, errorInfo)
        : defaultErrorMsg
    }
    return this.props.children
  }
}

export default ErrorBoundary
