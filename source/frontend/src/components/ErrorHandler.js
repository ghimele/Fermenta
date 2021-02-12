import React, { Component } from "react";
 
class ErrorHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
 
  componentDidCatch(error, info) {
    // Handle fallback UI
    this.setState({ hasError: true });
    // Manage error logs
    // logErrorStack(error, info);
  }
 
  render() {
    if (this.state.hasError) {
      return <div className="error-msg-screen">
        <h2 className="text-uppercase">Oops!</h2>
        <h3 className="text-uppercase mb-3">Something went wrong</h3>
        <p className="mb-4">
          Brace yourself till we get the error fixed.<br />
          You may also refresh the page or try again later.
        </p>
        <button type="button" class="btn btn-secondary btn-sm mr-2">Go Back</button>
        <button type="button" class="btn btn-secondary btn-sm">Try Again</button>
      </div>
    }
    return this.props.children
  }
}
 
export default ErrorHandler;