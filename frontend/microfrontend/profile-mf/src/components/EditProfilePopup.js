// EditProfilePopup.js
import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { UserProfileContext } from 'profile/UserProfileContext';
import api from '../utils/api';

function EditProfilePopup({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Доступ к контексту профиля
  const { userProfile, setUserProfile } = useContext(UserProfileContext);

  // Заполнение полей формы из текущего профиля
  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || '');
      setDescription(userProfile.about || '');
    }
  }, [userProfile]);

  // Обработчики полей
  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  // Обработчик отправки формы
  function handleSubmit(e) {
    e.preventDefault();

    api
      .setUserInfo({ name, about: description })
      .then((newUserData) => {
        // Обновляем контекст профиля
        setUserProfile({
          ...userProfile,  // Сохраняем старые данные, на случай если API не возвращает всё
          name: newUserData.name,
          about: newUserData.about,
        });

        // Закрытие попапа после успешного обновления
        onClose();
      })
      .catch((err) => console.error("Ошибка обновления профиля:", err));
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Редактировать профиль"
      name="edit"
    >
      <label className="popup__label">
        <input
          type="text"
          name="userName"
          id="owner-name"
          className="popup__input popup__input_type_name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          pattern="[a-zA-Zа-яА-Я -]{1,}"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="owner-name-error"></span>
      </label>

      <label className="popup__label">
        <input
          type="text"
          name="userDescription"
          id="owner-description"
          className="popup__input popup__input_type_description"
          placeholder="Занятие"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error" id="owner-description-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
