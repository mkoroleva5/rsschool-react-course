import './NotFoundPage.css';
import React from 'react';

export class NotFoundPage extends React.Component {
  constructor(props: object) {
    super(props);
  }
  render() {
    return (
      <div className="not-found-wrapper">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-text">Page not found</p>
        <a className="return-button" href="/">
          Return to home page
        </a>
      </div>
    );
  }
}
