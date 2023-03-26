import React from 'react';
import './Tooltip.css';

interface TooltipProps {
  className?: string;
  message: string;
}

export class Tooltip extends React.Component<TooltipProps> {
  render() {
    return (
      <div className={`error ${this.props.className || ''}`}>
        <div className="error-text">{this.props.message}</div>
      </div>
    );
  }
}
