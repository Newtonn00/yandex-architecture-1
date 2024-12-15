import React, { useState, useEffect, useContext } from 'react';
import Card from './Card';
import { UserProfileContext } from 'profile/UserProfileProvider'; 
import api from "../utils/api";

function CardsListBase() {
  const { userProfile } = useContext(UserProfileContext);
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null);  // Состояние попапа

  useEffect(() => {
    api
      .getCardList()
      .then((cardData) => {

        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === userProfile._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    
  }
  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setSelectedCard(null);  // Закрыть попап
  }

  return (
    <>
      <ul className="places__list">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        ))}
      </ul>


    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}

export default CardsListBase;
