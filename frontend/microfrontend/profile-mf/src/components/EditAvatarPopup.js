import React, {useContext, useRef} from 'react';
import PopupWithForm from './PopupWithForm';
import { UserProfileContext } from './UserProfileContext';
import api from '../utils/api';
function EditAvatarPopup({ isOpen, onClose }) {
  const inputRef = useRef();
  // Доступ к контексту профиля
  
  
  const { userProfile, setUserProfile } = useContext(UserProfileContext);

  function handleSubmit(e) {
    e.preventDefault();

    api
      .setAvatarInfo({ avatar: inputRef.current.value })
      .then((newUserData) => {
        // Обновляем контекст профиля
        setUserProfile({
          ...userProfile,  // Сохраняем старые данные, на случай если API не возвращает всё
          avatar: newUserData.avatar,
        });

        // Закрытие попапа после успешного обновления
        onClose();
      })
      .catch((err) => console.error("Ошибка обновления профиля:", err));
  }

  return (
    <PopupWithForm
      isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} title="Обновить аватар" name="edit-avatar"
    >

      <label className="popup__label">
        <input type="url" name="avatar" id="owner-avatar"
               className="popup__input popup__input_type_description" placeholder="Ссылка на изображение"
               required ref={inputRef} />
        <span className="popup__error" id="owner-avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
