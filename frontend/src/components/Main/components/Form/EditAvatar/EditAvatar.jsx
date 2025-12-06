import { useRef } from "react";
import { useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditAvatar({ onClose }) {
  const avatarRef = useRef();
  const { onUpdateAvatar } = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Formulario enviado:", avatarRef.current.value);
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    onClose();
  }

  return (
    <form
      action="#"
      className="popup__form"
      id="popup__editperfil-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <h2 className="popup__title">Cambiar foto de perfil</h2>
      <fieldset className="popup__fieldset">
        <label id="labelenlace" className="popup__lugar-label"></label>
        <input
          type="url"
          className="popup__input popup__input_type_error"
          id="perfil-enlace"
          name="url"
          placeholder="URL de imagen"
          ref={avatarRef}
          required
        />
        <span className="popup__input-error perfil-enlace-error">
          Por favor, Introduce una imagen.
        </span>
        <button id="popup_guardar" type="submit" className="popup__button">
          Guardar
        </button>
      </fieldset>
    </form>
  );
}
