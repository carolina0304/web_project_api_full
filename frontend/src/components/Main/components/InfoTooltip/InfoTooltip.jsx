/*import React from "react";*/
import Popup from "../Popup/Popup.jsx";
import error from "../../../../images/Error.png";
import exito from "../../../../images/registro exitoso.png";

function InfoTooltip({ isSuccess, onClose, isOpen }) {
  return (
    isOpen && (
      <Popup onClose={onClose}>
        <div className="popup__form">
          <img
            src={isSuccess ? exito : error}
            alt={isSuccess ? "Registro exitoso" : "Error en el registro"}
            className="popup__icon"
          />
          <p className="popup__message">
            {isSuccess
              ? "¡Correcto! Ya estás registrado."
              : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
          </p>
        </div>
      </Popup>
    )
  );
}

export default InfoTooltip;
