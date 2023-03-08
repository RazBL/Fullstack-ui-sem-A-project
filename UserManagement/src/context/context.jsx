import React, { useEffect, useState, createContext } from 'react'
export const Context = createContext();

export default function ContextProvider({ children }) {

  const [users, SetUsers] = useState([]);
  const [cities, SetCities] = useState([]);
  const [auth, SetAuth] = useState(false);
  const [adminLoggedIn, SetAdminLoggedIn] = useState(false);

  const LoadUsers = async () => {
    try {
      let res = await fetch('../data/users.json');
      let data = await res.json();
      SetUsers(data);
    } catch (err) {
      console.log(err);
    }
  }

  const LoadCitiesApi = async () => {
    try {
      let res = await fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=1567`);
      let data = await res.json();
      SetCities(data.result.records);
    } catch (err) {
      console.log(err);
    }
  }

  const LoadUserById =  (username) => {
    const user =  users.find((user) => user.username === username);
    return user;
  }

  const CheckIfUserExist = (email, username) => {
    let foundUser = users.find(item => email.toLocaleLowerCase() === item.email.toLocaleLowerCase() || username.toLocaleLowerCase() === item.username.toLocaleLowerCase());
    return foundUser;
  }

  const CheckIfEmailExist = (email) => {
    let foundEmail = users.find(item => email.toLocaleLowerCase() === item.email.toLocaleLowerCase());
    return foundEmail;
  }

  const CheckIfUsernameExist = (username) => {
    let foundUsername = users.find(item => username.toLocaleLowerCase() === item.username.toLocaleLowerCase());
    return foundUsername;
  }

  const CheckValidEmail = (email) => {
    return email.endsWith(".com") && /^[a-zA-Z_!.]+@[a-zA-Z_!.]+\.[a-zA-Z]{3,}$/.test(email);
  }

  const CheckIfValidDate = (birthDate) => {
    let currentDate = new Date().getFullYear();
    let userDate = new Date(birthDate).getFullYear();
    return currentDate - userDate
  }

  const CheckIfValidPassword = (password) => {
    let validPassword = /[A-Z]/.test(password) && /[@_!.]/.test(password) && password.length > 6 && password.length <= 12;
    return validPassword;
  }


  const ValidateStreet = (street) => {
    return /^[א-ת]+$/.test(street);
  }

  const InputTextOnly = (user) => {
    return /^[a-zA-Z]+$/.test(user.firstName) && /^[a-zA-Z]+$/.test(user.lastName);
  }

  const CheckIfValidUsername = (username) => {
    return username.length > 60 || !/^[a-zA-Z]+$/.test(username);
  }

  const CheckIfValidCity = (city) => {
    let isCorrectCity = cities.find(item => city === item.שם_ישוב_לועזי && city !== " ");
    return isCorrectCity
  }


  const AdminLogin = (username, password) => {
    let admin = username.toLocaleLowerCase() === "admin" && password === "admin1234admin"
    return admin;
  }

  const EditUser = (username, editedUser) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        users[i] = editedUser;
        break;
      }
    }
  }

  useEffect(() => {
    LoadUsers();
    LoadCitiesApi();
  }, [])

  const value = {
    users,
    SetUsers,
    cities,
    CheckIfUserExist,
    CheckValidEmail,
    CheckIfValidPassword,
    ValidateStreet,
    AdminLogin,
    CheckIfValidDate,
    CheckIfValidUsername,
    InputTextOnly,
    LoadUserById,
    CheckIfUsernameExist,
    CheckIfEmailExist,
    EditUser,
    SetAdminLoggedIn,
    adminLoggedIn,
    auth,
    SetAuth,
    CheckIfValidCity
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}
