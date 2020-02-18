/**
 * @description To calculate how many categories are linked
 * @associate with Shop.js
 */
import React from 'react';

/**
 * @description This component going to send list of categories from the Shop
 * @param {*}
 * @argument categories
 * @return category list (selected categories by user each of them)
 * @usedBy Shop.js
 */
const CategoriesCheckBox = ({ categories }) => {
  // c: alias of categories, i: index of categories
  return categories.map((c, i) => (
    <li key={i} className='list-unstyled'>
      <input type='checkbox' className='form-check-input' />
      <label className='form-check-label'>{c.name}</label>
    </li>
  ));
};

export default CategoriesCheckBox;
