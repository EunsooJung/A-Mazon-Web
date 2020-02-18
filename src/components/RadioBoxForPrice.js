/**
 * @function RadioBoxForPrice
 * @usedBy ./Shop.js
 */

import React, { useState, useEffect, Fragment } from 'react';

/**
 *
 * @param {*} param0
 * @argument handleFilters from Shop.js
 */
const RadioBoxForPrice = ({ prices, handleFilters }) => {
  const [value, setValues] = useState(0);

  const handleChange = event => {
    handleFilters(event.target.value);
    setValues(event.target.value);
  };

  return prices.map((p, i) => (
    <div key={i}>
      <input
        onChange={handleChange}
        value={`${p._id}`}
        name={p}
        type='radio'
        className='mr-2 ml-4'
      />
      <label className='form-check-label'>{p.name}</label>
    </div>
  ));
};

export default RadioBoxForPrice;
