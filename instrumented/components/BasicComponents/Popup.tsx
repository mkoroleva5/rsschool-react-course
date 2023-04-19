import './Popup.css';

interface PopupProps {
  onClick: () => void;
}

export const Popup = ({ onClick }: PopupProps) => {
  return (
    <button
      type="button"
      className="popup__wrapper"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClick();
        }
      }}
    >
      <div className="popup__content">The cat has been created!</div>
    </button>
  );
};
