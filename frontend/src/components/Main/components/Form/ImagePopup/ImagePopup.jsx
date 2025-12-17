import { useEffect } from "react";

export default function ImagePopup({ card, onClose }) {
  useEffect(() => {
    if (!card) return; // Solo agregar listeners si hay una tarjeta

    console.log("🔍 ImagePopup montado!"); // Para verificar

    const handleEscapeKey = (event) => {
      console.log("🔍 Tecla presionada:", event.key);
      if (event.key === "Escape") {
        console.log("🔍 Escape presionado en ImagePopup!");
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      console.log("🔍 ImagePopup desmontado!");
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [card, onClose]);

  // 👇 NUEVA FUNCIÓN para manejar click en el overlay
  const handleOverlayClick = (event) => {
    console.log("🔍 Click detectado!");
    console.log("🔍 event.target:", event.target);
    console.log(
      "🔍 ¿Es popup__container?",
      event.target.classList.contains("popup__container")
    );

    if (event.target.classList.contains("popup__container")) {
      console.log("🔍 ¡Cerrando popup!");
      onClose();
    }
  };

  if (!card) return null;
  return (
    <div className="popup popup-image" onClick={handleOverlayClick}>
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
