export default function ImagePopup({ card, onClose }) {
  if (!card) return null;
  return (
    <div className="popup popup-image">
      <div className="popup__container">
        <button
          type="button"
          className="popup__close popup__close-imagebig"
          onClick={onClose}
        >
          ✖
        </button>
        <img className="popup__enlace" src={card.link} alt={card.name} />
        <div className="popup__text">
          <p className="popup__text">{card.name}</p>
        </div>
      </div>
    </div>
  );
}
