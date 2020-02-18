/**
 * @function RadioBoxForPrice
 * @usedBy ./Shop.js
 */

import React, { useState, useEffect, Fragment } from 'react';

const handleChange = () => {};

const RadioBoxForPrice = ({ prices }) => {
  const [value, setValues] = useState(0);

  return prices.map((p, i) => (
    <div key={i}>
      <input
        onChange={handleChange}
        value={`${p._id}`}
        type='radio'
        className='mr-2 ml-4'
      />
      <label className='form-check-label'>{p.name}</label>
    </div>
  ));
};

export default RadioBoxForPrice;
