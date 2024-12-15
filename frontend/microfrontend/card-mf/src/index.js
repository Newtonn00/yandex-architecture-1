export { default as AddPlacePopup } from "./components/AddPlacePopup.js";

// Оборачиваем CardsList в провайдер контекста
import React from "react";
import CardsListBase from "./components/CardsList.js";
import { UserProfileProvider } from "profile/UserProfileProvider";

// Оборачиваем и экспортируем с тем же именем
const CardsList = () => (
  <UserProfileProvider>
    <CardsListBase />
  </UserProfileProvider>
);

export { CardsList };

ReactDOM.render(
    <React.StrictMode>
      <CardsList />
    </React.StrictMode>,
    document.getElementById("app")
  );