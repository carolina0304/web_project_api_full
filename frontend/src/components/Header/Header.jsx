import logo from "../../images/Vector.png";
import logolinea from "../../images/Line.png";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = ({ userEmail, onSignOut, isLoggedIn }) => {
  const location = useLocation();
  // Agrega esta línea para debuggear
  console.log("isLoggedIn:", isLoggedIn, "location:", location.pathname);
  return (
    <header className="header">
      <div>
        <img className="header__logo" src={logo} alt="Logotipo Around" />

        {/* Solo mostrar links de auth si NO está logueado */}
        {!isLoggedIn && (
          <>
            {location.pathname === "/signin" && (
              <Link to="/signup" className="header__link">
                Regístrate
              </Link>
            )}
            {location.pathname === "/signup" && (
              <Link to="/signin" className="header__link">
                Iniciar sesion
              </Link>
            )}
          </>
        )}
        {/* Solo mostrar info de usuario si SÍ está logueado */}
        {isLoggedIn && (
          <div className="header__user-info">
            <span className="header__email">{userEmail}</span>
            <button className="header__signout-button" onClick={onSignOut}>
              Cerrar sesión
            </button>
          </div>
        )}
        <div>
          <img className="header__line" src={logolinea} alt="Linea" />
        </div>
      </div>
    </header>
  );
};

export default Header;
