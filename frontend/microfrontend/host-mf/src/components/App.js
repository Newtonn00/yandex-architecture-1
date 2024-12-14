import React, { useState, useEffect, lazy, Suspense }  from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";
import { UserProfileProvider } from 'profile/UserProfileProvider'; 
import auth from '../utils/auth'


const EditProfilePopup = 
lazy(() => import('profile/EditProfilePopup').catch(() => {
    return { default: () => <div className='error'>Компонент недоступен!</div> };
  })
);

const EditAvatarPopup = 
lazy(() => import('profile/EditAvatarPopup').catch(() => {
    return { default: () => <div className='error'>Компонент недоступен!</div> };
  })
);

const AddPlacePopup = 
lazy(() => import('card/AddPlacePopup').catch(() => {
    return { default: () => <div className='error'>Компонент недоступен!</div> };
  })
);

const Register = 
lazy(() => import('auth/Register').catch(() => {
    return { default: () => <div className='error'>Компонент недоступен!</div> };
  })
);    
const Login = 
lazy(() => import('auth/Login').catch(() => {
    return { default: () => <div className='error'>Компонент недоступен!</div> };
  })
);   
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const history = useHistory();

  // при монтировании App описан эффект, проверяющий наличие токена и его валидности
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setIsLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, [history]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  }

  function onSignOut() {
    setIsLoggedIn(false);
    // После успешного вызова обработчика onSignOut происходит редирект на /signin
    history.push("/signin");
  }

  return (
    // В компонент App внедрён контекст через UserProfileContext.Provider
    <UserProfileProvider>
      <div className="page__content">
        <Header onSignOut={onSignOut} />
        <Suspense fallback={<div>Загрузка...</div>}>
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            isLoggedIn={isLoggedIn}
          />
          <Route path="/signup">
            <Register/>
          </Route>
          <Route path="/signin">
            <Login/>
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
        </Suspense>
      </div>
    </UserProfileProvider>
  );
}

export default App;
