export default function Popup(props) {
  //los hijos son el contenido de la ventana emergente
  const { onClose, title, children } = props;
  console.log("Popup props:", props);
  return (
    <div className="popup">
      <div className={`popup__content ${!title ? "popup popup-image" : ""}`}>
        <button
          aria-label="Close modal"
          className="popup__close"
          type="button"
          onClick={onClose} // llama a onClose al hacer clic en el boton
        >
          ✖
        </button>

        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
