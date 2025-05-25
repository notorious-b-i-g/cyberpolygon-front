import React, { useState } from "react";
import CustomAlert from "./CustomAlert";
import apiClient from "./api/apiClient";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      setAlert({ message: "Пароли не совпадают!", type: "error" });
      return;
    }

    // Формируем данные с учетом требований API
    const userData = { username, email, password: password1 };

    try {
      // Отправка данных на сервер с использованием apiClient
      const response = await apiClient.post("/auth/register", userData);
      console.log("Response data:", response);
      setAlert({ message: "Регистрация успешна!", type: "success" });
    } catch (error) {
      console.error("Error:", error);
      setAlert({ message: error.message || "Ошибка при регистрации", type: "error" });
    }
  };

  return (
    <div>
      <CustomAlert message={alert.message} type={alert.type} />
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="Confirm Password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
