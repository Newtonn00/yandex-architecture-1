import React from 'react';

function LogoutButton({ onSignOut }) {


    function onLogout() {
        // при вызове обработчика onSignOut происходит удаление jwt
        localStorage.removeItem("jwt");
        onSignOut()
        }

  return (
    <button onClick={onLogout} className="logout-button">
      Выйти
    </button>
  );
}

export default LogoutButton;