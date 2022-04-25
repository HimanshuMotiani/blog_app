import React from "react";
import { withRouter } from 'react-router-dom';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  handleError = () => {
    this.setState({ hasError: false });
    this.props.history.push("/");
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <h1>Something went wrong.</h1>
          <button
            className="mt-8 text-primary text-xl"
            onClick={this.handleError}
          >
            <span className="mr-2">
              <i class="fas fa-arrow-left"></i>
            </span>{" "}
            Go to home page
          </button>
        </>
      );
    }

    return this.props.children;
  }
}
export default withRouter(ErrorBoundary)
