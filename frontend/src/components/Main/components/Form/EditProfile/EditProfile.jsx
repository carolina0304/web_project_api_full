import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext.js";

export default function EditProfile({ onClose }) {
  /*const userContext = useContext(CurrentUserContext); // Obtiene el objeto currentUser*/
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  console.log("EditProfile render - currentUser:", currentUser);
  console.log("EditProfile render - currentUser?.name:", currentUser?.name);

  const [name, setName] = useState(currentUser?.data?.name || ""); // Agrega la variable de estado para name
  const [description, setDescription] = useState(
    currentUser?.data?.about || ""
  ); // Agrega la variable de estado para description

  useEffect(() => {
    console.log("EditProfile useEffect - currentUser:", currentUser);
    console.log("EditProfile useEffect - name:", currentUser?.data?.name);
    console.log("EditProfile useEffect - about:", currentUser?.data?.about);
    setName(currentUser?.data?.name || "");
    setDescription(currentUser?.data?.about || "");
  }, [currentUser]);

  const handleNameChange = (event) => {
    setName(event.target.value); // Actualiza name cuando cambie la entrada
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); // Actualiza about cuando cambie la entrada
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del envío de formularios
    handleUpdateUser({ name, about: description });
    onClose();
  };
  return (
    <form
      action="#"
      className="popup__form"
      id="popup__formedit"
      noValidate
      onSubmit={handleSubmit}
    >
      <h2 className="popup__title">Editar perfil</h2>
      <fieldset className="popup__fieldset">
        <label id="labelname" className="popup__label"></label>
        <input
          type="text"
          className="popup__input popup__input_type_error"
          id="name"
          name="name"
          placeholder="Nombre"
          minLength={2}
          maxLength={40}
          required
          value={name} // Vincula name con la entrada
          onChange={handleNameChange} // Agrega el controlador onChange
        />
        <span className="popup__input-error name-error">
          Por favor, rellena este campo.
        </span>
        <label id="labelsubname" className="popup__label"></label>
        <input
          type="text"
          className="popup__input"
          id="subname"
          name="job"
          placeholder="Acerca de mi"
          required
          minLength={2}
          maxLength={200}
          value={description} // Vincula description con la entrada
          onChange={handleDescriptionChange} // Agrega el controlador onChange
        />
        <span className="popup__input-error subname-error">
          Por favor, rellena este campo.
        </span>
        <button type="submit" className="popup__button" id="popup_guardaredit">
          Guardar
        </button>
      </fieldset>
    </form>
  );
}
