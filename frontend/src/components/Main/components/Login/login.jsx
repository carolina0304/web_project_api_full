import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";

export default function Login(props) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin({ email: data.email, password: data.password });
  }

  return (
    <div>
      <form
        action="#"
        className="login__form"
        id="Loginform"
        noValidate
        onSubmit={handleSubmit}
      >
        <h2 className="login__title">Inicia sesión</h2>
        <fieldset className="login__fieldset">
          <label htmlFor="email" className="login__label">
            Email:
          </label>
          <input
            type="email"
            className="login__input login__input_type_error"
            id="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="Correo electronico"
            required
          />
          {/*<span className="login__input-error login-email-error">
            Introduce un correo electronico.
          </span>*/}
          <label htmlFor="password" className="login__password-label">
            Contraseña:
          </label>
          <input
            type="password"
            className="login__input login__input_type_error"
            id="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder="Password"
          />

          {/*<span className="login__input-error login-password-error">
            Introduce tu contraseña.
          </span>*/}

          <button id="buttonLogin" type="submit" className="login__buttonlogin">
            Inicia Sesion
          </button>
          <div className="login__signin">
            <Link to="/signup" className="login__link">
              ¿Aún no eres miembro? Regístrate aquí
            </Link>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
