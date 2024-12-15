import React from 'react';
import InfoTooltip from './InfoTooltip';
import '../blocks/login/login.css';
import auth from '../utils/auth';

function Login (){
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");

  function handleSubmit(e){
    e.preventDefault();
    const userData = {
      email,
      password
    }
    handleLogin(userData);
  }
  function handleCloseTooltip() {
    setIsInfoToolTipOpen(false);
  }
  function handleLogin({ email, password }) {
    auth
      .login(email, password)
      .then(() => {
        setTooltipStatus("success");
        setIsInfoToolTipOpen(true);
      })
      .catch((err) => {
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
      });
  }

  return (
    <div className="auth-form">
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <div className="auth-form__wrapper">
          <h3 className="auth-form__title">Вход</h3>
          <label className="auth-form__input">
            <input type="text" name="name" id="email"
              className="auth-form__textfield" placeholder="Email"
              onChange={e => setEmail(e.target.value)} required  />
          </label>
          <label className="auth-form__input">
            <input type="password" name="password" id="password"
              className="auth-form__textfield" placeholder="Пароль"
              onChange={e => setPassword(e.target.value)} required  />
          </label>
        </div>
        <button className="auth-form__button" type="submit">Войти</button>
      </form>
      <InfoTooltip
        isOpen={isInfoToolTipOpen}
        onClose={handleCloseTooltip}
        status={tooltipStatus}
      />
    </div>
  )
}

export default Login;
