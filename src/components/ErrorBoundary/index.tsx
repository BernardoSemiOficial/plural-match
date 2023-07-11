import { Component, ErrorInfo } from 'react'

import { ErrorBoundaryProps, ErrorBoundaryState } from './types'

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps | Readonly<ErrorBoundaryProps>) {
    super(props)
    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    // Documentation: https://react.dev/reference/react/Component#static-getderivedstatefromerror
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // You can use your own error logging service here
    // Documentation: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
    console.error({ error, info })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Ops, há um erro!</h2>
          <button
            type='button'
            onClick={() => this.setState({ hasError: false })}
          >
            Tentar novamente?
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
