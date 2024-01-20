import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props: ChildNode) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something Wrong happened!!!</h1>
          <div>We are fixing it.</div>
        </div>
      )
    }
    return this.props.children;
  }
}

export default ErrorBoundary;