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
