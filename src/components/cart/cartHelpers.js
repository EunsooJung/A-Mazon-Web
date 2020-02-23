/**
 * To get,set item from localStorage
 * JSON.parse() to convert json to object
 * JSON.stringify() to convert object to json
 */

/**
 * @method addItem
 * @param {*} item
 * @param {*} next
 * @usedIn ./CardForProduct.js
 */
export const addItemToCart = (item = [], count = 0, next = f => f) => {
  let cart = [];
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }

    cart.push({
      ...item,
      count: 1
    });

    // Set: to remove depulicate item automatically
    // remove duplicates
    // build an Array from new Set and turn it back into array using Array.from
    // so that later it will be re-map it
    // new set will only allow unique values in it
    // pass the ids of each object/product
    // If the loop tries to add the same value again, it'll get ignored
    // ...with the array of ids we got on when first map() was used
    // run map() on it again and return the actual product from the cart
    cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
      return cart.find(p => p._id === id);
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    next();
  }
};

/**
 * @method getItemsCountInCartBadge It provides total items from localStorage then display into the Cart's badge by the length
 * @usedBy ./Menu.js component
 */
export const getItemsCountInCartBadge = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart')).length;
    }
  }
  return 0;
};

/**
 * @method getAllItemsInCart It provides all items in the Cart
 * @usedBy components/cart/CartLanding.js component
 */
export const getAllItemsInCart = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart'));
    }
  }
  return [];
};

/**
 * @method updateCartItem It provides all items in the Cart
 * @usedBy components/cart/CartLanding.js component
 */
export const updateCartItem = (productId, count) => {
  let cart = [];
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }

    cart.map((product, i) => {
      if (product._id === productId) {
        cart[i].count = count;
      }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

/**
 * @method removeItemInCart
 * @param {*} productId
 * @usedIn components/cart/CartLanding.js / components/CardForProduct.js
 */
export const removeItemInCart = productId => {
  let cart = [];
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }

    cart.map((product, i) => {
      if (product._id === productId) {
        // splice method takes two argument
        // the first argument is the index from where to splice
        // second argument is how many item to splice
        cart.splice(i, 1);
      }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  return cart;
};

/**
 * @description Once the user pay for the product, clear to empty the card from the localStorage
 * @param {*} next callback
 * @usedIn components/cart/CheckoutProductInCart.js
 */
export const emptyCart = next => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('cart');
    next();
  }
};
