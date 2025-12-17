import ButtonLike from "../../../../images/Group.svg";
import image from "../../../../images/VanoisNational.png";
import React, { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

const Card = ({ card, setSelectedCard, onCardLike, onCardDelete }) => {
  const { name, link, likes = [] } = card; // fallback a [] si likes no existe

  // 👇 AQUÍ van los console.log
  console.log("Card data:", { name, link, cardId: card._id });
  console.log("Link URL:", link);

  // 👇 AGREGA ESTOS LOGS
  console.log("🔍 Card likes:", likes);
  console.log("🔍 Likes length:", likes.length);

  const { currentUser } = useContext(CurrentUserContext);

  /*const isLiked = likes.some((like) => like._id === currentUser._id);*/

  const isLiked = currentUser?.data
    ? likes.some((like) => {
        // Si like es un objeto, usa like._id
        // Si like es un string, usa like directamente
        const likeId = typeof like === "object" ? like._id : like;
        return likeId === currentUser.data._id;
      })
    : false;

  // 👇 AGREGA ESTE LOG TAMBIÉN
  console.log("🔍 Is liked:", isLiked);
  console.log("🔍 Current user ID:", currentUser?.data?._id);

  /*console.log("Card likes:", likes);
  console.log("Is liked:", isLiked);
  console.log("Current user ID:", currentUser._id);*/
  /*const imageComponent = {
    title: name,
    card: {
      name,
      link,
    },
  };*/

  const cardLikeButtonClassName = `element__contentbutton ${
    isLiked ? "element__contentlike-active" : ""
  }`;

  // Abrir imagen en popup
  function handleOpenPopup() {
    setSelectedCard(card);
  }

  // 👇 Llama al manejador del like
  function handleLikeClick() {
    onCardLike(card);
  }

  // Eliminar cartas
  function handleCardDelete() {
    onCardDelete(card);
  }
  return (
    <div className="element__card">
      <img
        id="element__cardimage"
        className="element__cardimage"
        src={link}
        alt={name}
        onClick={handleOpenPopup}
      />
      <button
        id="popupdelete"
        type="button"
        className="element__delete"
        onClick={handleCardDelete}
      ></button>
      <div className="element__content">
        <p className="element__contentparagraph">{name}</p>
        <button
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        >
          <img src={ButtonLike} alt="like" className="element__contentlike" />
        </button>
      </div>
    </div>
  );
};

export default Card;
