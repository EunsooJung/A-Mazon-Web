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

export const authenticate = (data, cb) => {
  // If window object is not equal to 'undefined'
  if (typeof window !== 'undefined') {
    // Save jwt to localStorage
    localStorage.setItem('jwt', JSON.stringify(data));
    // then call callback function
    cb();
  }
};
