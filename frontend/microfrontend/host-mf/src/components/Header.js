import React from 'react';
import { Route, Link } from 'react-router-dom';
import logoPath from '../images/logo.svg';
import { UserProfileContext } from "profile/UserProfileProvider";


function Header ({onSignOut, email }) {
  const { userProfile } = useContext(UserProfileContext); 
  function handleSignOut(){
    onSignOut();
  }
  const LogoutButton = 
  lazy(() => import('auth/LogoutButton').catch(() => {
      return { default: () => <div className='error'>Компонент недоступен!</div> };
    })
  );  
  return (
    <header className="header page__section">
      <img src={logoPath} alt="Логотип проекта Mesto" className="logo header__logo" />
      <Route exact path="/">
        <div className="header__wrapper">
          <p className="header__user">{ userProfile?.email }</p>
          <LogoutButton className="header__logout" onClick={handleSignOut}/>
        </div>
      </Route>
      <Route path="/signup">
        <Link className="header__auth-link" to="signin">Войти</Link>
      </Route>
      <Route path="/signin">
        <Link className="header__auth-link" to="signup">Регистрация</Link>
      </Route>
    </header>
  )
}

export default Header;
