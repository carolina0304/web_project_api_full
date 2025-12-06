import Header from "../components/Header/Header";
import "../blocks/page.css";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import { useState, useEffect } from "react";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "./Main/components/Login/login.jsx";
import Register from "./Main/components/Register/register.jsx";
import InfoTooltip from "./Main/components/InfoTooltip/InfoTooltip.jsx";

/*import Login from "./components/Main/components/Login/login";
import Register from "./components/Main/components/Register/register";
import InfoTooltip from "./components/InfoTooltip/InfoTooltip";*/

import ProtectedRoute from "./ProtectedRoute"; // Nueva importación

import { signin, register, usersme } from "../utils/auth.js";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [token, setToken] = useState(localStorage.getItem("token")); //Para el token

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [cards, setCards] = useState([]);

  const [useremail, setUseremail] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      // Solo cargar datos si está logueado
      api
        .getInitialCards()
        .then((response) => setCards(response.data))
        .catch((err) => console.error("Error al cargar tarjetas:", err));

      api
        .getUserInfo()
        .then((userData) => setCurrentUser(userData))
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]); // Dependencia del estado de login

  const handleUpdateUser = (data) => {
    console.log(data);
    (async () => {
      await api
        .updateUserInfo(data)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((err) => {
          console.error(err);
        });
    })();
  };

  // No renderices la app hasta que currentUser esté listo
  /*if (!currentUser) {
    return <div>Cargando usuario...</div>;
  }*/
  const handleOpenPopup = (card) => setSelectedCard(card);

  const handleClosePopup = () => {
    setSelectedCard(null);
  };

  const handleUpdateAvatar = (data) => {
    api
      .AvatarUpdate(data)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        handleClosePopup();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //Like de la tarjeta
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    const likePromise = isLiked
      ? api.removeLike(card._id)
      : api.addLike(card._id);

    likePromise
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.error(err));
  };

  //Eliminar tarjeta
  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.error(err));
  };

  const handleAppPlaceSubmit = (newCardData) => {
    api
      .addCard(newCardData)
      .then((newCard) => {
        setCards((prevCards) => [newCard, ...prevCards]);
        handleClosePopup();
      })
      .catch((err) => {
        console.error("Error al agregar tarjeta:", err);
      });
  };

  function handleLogin(data) {
    signin(data.email, data.password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setToken(res.token);
          setIsLoggedIn(true);
          setUseremail(data.email);
          navigate("/");
          // Redirigir a la página principal
          // navigate('/'); // Si usas useNavigate
        }
      })
      .catch((err) => {
        console.log("Error en login:", err);
        showInfoTooltip(false);
        // Aquí puedes mostrar un mensaje de error al usuario
      });
  }

  function handleRegister(data) {
    register(data.email, data.password)
      .then((res) => {
        console.log("Usuario registrado exitosamente:", res);
        showInfoTooltip(true);
        navigate("/signin");

        // Redirigir al login después del registro exitoso
        // navigate('/signin');
      })
      .catch((err) => {
        console.log("Error en registro:", err);
        // Aquí puedes mostrar un mensaje de error al usuario
      });
  }

  //Verificacion de Token al cargar

  function checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      usersme(token)
        .then((res) => {
          setCurrentUser(res);
          setUseremail(res.email);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log("Token invalido", err);
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          setCurrentUser(null);
        })
        .finally(() => {
          setIsLoading(false); // ✅ Termina la carga
        });
    } else {
      setCurrentUser(null);
      setIsLoggedIn(false);
      setUseremail("");
      setIsLoading(false); // ✅ Termina la carga
    }
  }

  // ✅ Ahora usa isLoading en lugar de currentUser
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  useEffect(() => {
    checkToken();
  }, []);

  const handleInfoTooltipClose = () => {
    setIsInfoTooltipOpen(false);
  };

  const showInfoTooltip = (success) => {
    setIsSuccess(success);
    setIsInfoTooltipOpen(true);
  };

  // Función para cerrar sesión
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser({});
    setUseremail("");
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        onUpdateAvatar: handleUpdateAvatar,
        handleAppPlaceSubmit,
      }}
    >
      <div className="page">
        <Header
          userEmail={currentUser?.email || useremail}
          isLoggedIn={isLoggedIn}
          onSignOut={handleSignOut}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  cards={cards}
                  setCards={setCards}
                  onAddPlaceSubmit={handleAppPlaceSubmit}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  popup={selectedCard}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
        </Routes>

        <InfoTooltip
          isSuccess={isSuccess}
          isOpen={isInfoTooltipOpen}
          onClose={handleInfoTooltipClose}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
