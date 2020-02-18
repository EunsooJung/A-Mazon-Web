/**
 * @description To calculate how many categories are linked
 * @associate with Shop.js
 */
import React, { useState } from 'react';

/**
 * @description This component going to send list of categories from the Shop
 * @param {*}
 * @argument categories
 * @return category list (selected categories by user each of them)
 * @usedBy ./Shop.js
 */
const CategoriesCheckBox = ({ categories }) => {
  // React useState Hooks
  const [checked, setChecked] = useState([]);
  const [error, setError] = useState(false);

  /**
   * It's going to be get c: categories then return another function (higher order function)
   * This function will invoke by onChange event in input field
   * onChange={handleToggle(c._id)}: It's means invoke onChange event by the handleToggle method with c: categories, each _id.
   */
  const handleToggle = c => () => {
    // if aleady caterogy name is exist, index of method will return the first index at which a given element can be found in the array.
    // according to exist or not, return the first index or -1
    const currentCategoryId = checked.indexOf(c);
    // ...checked: It means everything is in the checked state
    const newCheckedCategoryId = [...checked];
    // if currently checked was not already in checked state then push
    // else pull / take of
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
  };

  // c: alias of categories, i: index of categories
  // Apply the value based on the what we have in the state by the checked status.
  return categories.map((c, i) => (
    <li key={i} className='list-unstyled'>
      <input
        onChange={handleToggle(c._id)}
        value={checked.indexOf(c._id === -1)}
        type='checkbox'
        className='form-check-input'
      />
      <label className='form-check-label'>{c.name}</label>
    </li>
  ));
};

export default CategoriesCheckBox;
