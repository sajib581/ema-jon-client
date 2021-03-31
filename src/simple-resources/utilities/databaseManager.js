const getUser = () => {
    const existingUser = localStorage.getItem('userId');
    console.log(existingUser);
    if (existingUser) {
        return existingUser; 
    } else {
        const newUser = 'user-' + new Date().getTime();
        console.log(newUser);
        localStorage.setItem('userId', newUser)
        return newUser;
    }
}


const getDataKey = () => {
    const userId = getUser();
    console.log(userId);
    return `emaJohn/carts/${userId}`
}

// push to local storage: a temporary place for database
const getDatabaseCart = () => {
    const dataKey = getDataKey();
    console.log(dataKey);
    const data = localStorage.getItem(dataKey) || "{}";
    return JSON.parse(data);
}

const addToDatabaseCart = (key, count) => {
    const currentCart = getDatabaseCart();
    currentCart[key] = count;
    localStorage.setItem(getDataKey(), JSON.stringify(currentCart));
}

const removeFromDatabaseCart = key => {
    const currentCart = getDatabaseCart();
    delete currentCart[key];
    localStorage.setItem(getDataKey(), JSON.stringify(currentCart));
}

const processOrder = (cart) => {
    localStorage.removeItem(getDataKey());
}


export { addToDatabaseCart, getDatabaseCart, removeFromDatabaseCart, processOrder };


// polyfill to support older browser
const localStorage = window.localStorage || (() => {
  let store = {}
  return {
    getItem(key) {
      return store[key]
    },
    setItem(key, value) {
      store[key] = value.toString()
    },
    clear() {
      store = {}
    }
  };
})()

const sessionStorage = window.sessionStorage || (() => {
  let store = {}
  return {
    getItem(key) {
      return store[key]
    },
    setItem(key, value) {
      store[key] = value.toString()
    },
    clear() {
      store = {}
    }
  };
})()
// end of poly fill