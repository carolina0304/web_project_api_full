import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";

export default function Register(props) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister({ email: data.email, password: data.password });
  }

  return (
    <div className="register">
      <form
        action="#"
        className="register__form"
        id="Registerform"
        noValidate
        onSubmit={handleSubmit}
      >
        <h2 className="register__title">Registrate</h2>
        <fieldset className="register__fieldset">
          <label htmlFor="email" className="register__label">
            Email:
          </label>
          <input
            type="email"
            className="register__input register__input_type_error"
            id="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="Correo electronico"
            required
          />
          {/*<span className="register__input-error register-email-error">
            Por favor, Introduce un correo electronico.
          </span>*/}
          <label htmlFor="password" className="register__password-label">
            Contraseña:
          </label>
          <input
            type="password"
            className="register__input register__input_type_error"
            id="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder="Password"
          />
          {/*<span className="register__input-error register-password-error">
            Por favor, Introduce tu contraseña.
          </span>*/}
          <button
            id="buttonRegister"
            type="submit"
            className="register__buttonlogin"
          >
            Registrate
          </button>
          <div className="register__signup">
            <Link to="/signin" className="register__link">
              ¿Ya eres miembro? Inicia sesión aquí
            </Link>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
