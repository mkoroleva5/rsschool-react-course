import './ProgressBar.css';

export const ProgressBar = () => {
  return (
    <div className="progress-bar_wrapper">
      In progress...
      <div className="progress-bar">
        <div className="progress-bar_inner"></div>
      </div>
    </div>
  );
};
