import { API } from '../config';

export const signup = user => {
  // console.log(name, email, password);

  // fetch method's first argument is url using 'API'
  return (
    fetch(`${API}/signup`, {
      // second arguement
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      // error handling
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.log(err);
      })
  );
};

/** SignIn */
export const signin = user => {
  // console.log(name, email, password);

  // fetch method's first argument is url using 'API'
  return (
    fetch(`${API}/signin`, {
      // second arguement
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      // error handling
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.log(err);
      })
  );
};

/** user authenticate data save to localStorage */
export const authenticate = (data, cb) => {
  // If window object is not equal to 'undefined'
  if (typeof window !== 'undefined') {
    // Save jwt to localStorage
    localStorage.setItem('jwt', JSON.stringify(data));
    // then call callback function
    cb();
  }
};

/**
 * sign-out
 * Romove token from localStorage and then make a logout request to backend.
 * Redirect to home
 */
export const signout = cb => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
    cb();
    return fetch(`${API}/signout`, {
      method: 'GET'
    })
      .then(response => {
        console.log('signout', response);
      })
      .catch(err => console.log(err));
  }
};

/**
 * display or hide sign-in, sign-out link
 */
export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
  } else {
    return false;
  }
};
