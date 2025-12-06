import { useState } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function NewCard({ onClose, onAddPlaceSubmit }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlaceSubmit({ name, link })
      .then(() => {
        setName("");
        setLink("");
        onClose(); //Cierra el popup después de guardar exitosamente
      })
      .catch((err) => console.error(err));
  }

  return (
    <form
      action="#"
      className="popup__form"
      id="popup__lugar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <h2 className="popup__title">Agregar imagen</h2>
      <fieldset className="popup__fieldset">
        <label id="labeltitulo" className="popup__label"></label>
        <input
          type="text"
          className="popup__input popup__input_type_error"
          id="name-titulo"
          name="name"
          placeholder="Titulo"
          minLength={2}
          maxLength={30}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="popup__input-error name-titulo-error">
          Por favor, rellena este campo.
        </span>
        <label id="labelenlace" className="popup__lugar-label"></label>
        <input
          type="url"
          className="popup__input popup__input_type_error"
          id="subname-enlace"
          name="url"
          placeholder="URL a la imagen"
          required
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <span className="popup__input-error subname-enlace-error">
          Por favor, Introduce una direccion web.
        </span>
        <button id="popup_guardar" type="submit" className="popup__button">
          Guardar
        </button>
      </fieldset>
    </form>
  );
}
