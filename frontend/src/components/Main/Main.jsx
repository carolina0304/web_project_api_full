import FotoAvatar from "../../images/Arlen-37.png";
import EditarAvatar from "../../images/Editarperfil.png";
import EditarNombre from "../../images/EditButton.png";
import BotonAdd from "../../images/AddButton.png";
import Card from "../Main/components/Card/Card";
import Popup from "./components/Popup/Popup";
import NewCard from "./components/Form/New Card/NewCard.jsx";
import EditAvatar from "./components/Form/EditAvatar/EditAvatar.jsx";
import EditProfile from "./components/Form/EditProfile/EditProfile.jsx";
import ImagePopup from "./components/Form/ImagePopup/ImagePopup.jsx";

import { useState, useEffect } from "react";

import api from "../../utils/api.js";

import { useContext } from "react";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";

const Main = ({ cards, setCards, onAddPlaceSubmit }) => {
  const [popup, setPopup] = useState(null);

  const [selectedCard, setSelectedCard] = useState(null);

  const newCardPopup = {
    title: "Nuevo Lugar",
    children: (
      <NewCard
        onClose={handleClosePopup}
        onAddPlaceSubmit={(newCardData) =>
          Promise.resolve(onAddPlaceSubmit(newCardData)).then(handleClosePopup)
        }
      />
    ),
  };

  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar onClose={handleClosePopup} />,
  };

  const editProfilePopup = {
    title: "Editar Perfil",
    children: <EditProfile onClose={handleClosePopup} />,
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  const { currentUser } = useContext(CurrentUserContext);

  console.log("Current user from context:", currentUser);
  console.log("Current user data:", currentUser?.data);
  console.log("Current user name:", currentUser?.data?.name);
  console.log("Current user avatar:", currentUser?.data?.avatar);

  /*const [cards, setCards, onAddPlaceSubmit] = props;*/

  // 👇 Aquí va la función para likes/dislikes
  async function handleCardLike(card) {
    console.log("LIKE: ", card);
    // Verifica una vez más si a esta tarjeta ya les has dado like
    const isLiked =
      Array.isArray(card.likes) &&
      card.likes.some((like) => like._id === currentUser._id);

    // Envía una solicitud a la API y obtén los datos actualizados de la tarjeta
    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        console.log("Respuesta del servidor:", newCard);
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => console.log(err));
  }

  // 👇 Aquí va la función para likes/dislikes
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  console.log("Cards value:", cards);
  console.log("Is array:", Array.isArray(cards));

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <img
            src={currentUser?.data?.avatar}
            alt="Arlene Gomez"
            className="profile__infoavatar"
            id="avatar"
            /*loading="lazy"*/
          />
          <button
            className="profile__editavatar"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          >
            <img src={EditarAvatar} alt="Editar icono" />
          </button>
          <div className="profile__name">
            <h1 className="profile__namenames" id="name">
              {currentUser?.data?.name}
            </h1>
            <img
              src={EditarNombre}
              alt="editar boton"
              className="profile__nameeditbutton"
              id="nameedit-button"
              onClick={() => handleOpenPopup(editProfilePopup)}
            />
            <p className="profile__namesubname" id="about">
              {currentUser?.data?.about}
            </p>
          </div>
          <img
            src={BotonAdd}
            alt="boton de signo mas"
            className="profile__infoaddbutton"
            onClick={() => handleOpenPopup(newCardPopup)}
          />
        </div>
      </section>

      <section className="element">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardLike={handleCardLike} // <-- Aquí pasas la función
            setSelectedCard={setSelectedCard}
            onCardDelete={handleCardDelete}
          />
        ))}
      </section>

      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}

      {selectedCard && (
        <ImagePopup card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
    </main>
  );
};

export default Main;
