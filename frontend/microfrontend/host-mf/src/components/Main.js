import React, { useContext, lazy, Suspense }  from 'react';
import { UserProfileContext } from 'profile/UserProfileProvider'; 

function Main({ onEditProfile, onAddPlace, onEditAvatar }) {
  const { userProfile } = useContext(UserProfileContext);  

  const imageStyle = { backgroundImage: `url(${userProfile.avatar})` };
  const CardsList = 
    lazy(() => import('card/CardsList').catch(() => {
        return { default: () => <div className='error'>Компонент недоступен!</div> };
      })
    );
  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__image" onClick={onEditAvatar} style={imageStyle}></div>
        <div className="profile__info">
          <h1 className="profile__title">{userProfile.name}</h1>
          <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          <p className="profile__description">{userProfile.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="places page__section">
          <Suspense fallback={<div>Загрузка карточек...</div>}>
            <CardsList />
          </Suspense>
      </section>
    </main>
  );
}

export default Main;
