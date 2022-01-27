import React from 'react';
import ReactDOM from 'react-dom';

export function App(): JSX.Element {
  return <div>有始无重点</div>;
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);
