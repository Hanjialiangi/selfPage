import React, { ReactNode } from 'react';

type Props = Record<string, unknown>;

interface State {
  hasError: boolean;
  errorMessage: string;
}

export default class PotentialError extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: ''
    };
  }
  static getDerivedStateFromError(error: Error): State {
    console.log('Error Stack', error.stack);
    return { hasError: true, errorMessage: error.message };
  }
  render(): ReactNode {
    return this.state.hasError ? (
      <section>
        <h2>Error: {this.state.errorMessage}</h2>
      </section>
    ) : (
      this.props.children
    );
  }
}
