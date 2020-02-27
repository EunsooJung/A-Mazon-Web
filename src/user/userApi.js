import { API } from '../config';

/**
 * @description To retrieve user profile information
 * @param {*} userId
 * @param {*} token
 * @requestToBackEnd router.get('/user/:userId', requireSignin, isAuth, retrieveProfile);
 */
export const read = (userId, token) => {
  return fetch(`${API}/user/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * @description To update user profile
 * @param {*} userId
 * @param {*} token
 * @param {*} user send user data
 * @requestToBackEnd routes/userRoutes.js: router.put('/user/:userId', requireSignin, isAuth, updateProfile);
 */
export const update = (userId, token, user) => {
  return fetch(`${API}/user/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * @description To update localStorage
 * @param {*} user updage user profile information from Profile component
 * @param {*} next callback
 */
export const updateUser = (user, next) => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('jwt')) {
      let auth = JSON.parse(localStorage.getItem('jwt'));
      auth.user = user;
      localStorage.setItem('jwt', JSON.stringify(auth));
      // callback likes redirect user
      next();
    }
  }
};

/**
 * @description To get user's purchase history
 * @param {*} userId
 * @param {*} token
 * @requestToBackEnd routes/userRoutes.js: router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);
 * @usedIn ./user/UserDashboard.js
 */
export const getPurchaseHistory = (userId, token) => {
  return fetch(`${API}/orders/by/user/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
