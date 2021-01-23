// const endpoint = 'https://mysterious-lowlands-03819.herokuapp.com/api';
const endpoint = 'http://localhost:8080/api';

const fetchBoth = function() {
  return Promise.all([
      fetch(`${endpoint}/pets`),
      fetch(`${endpoint}/people`),
    ])
      .then(([petsRes, peopleRes]) => {
        if (!petsRes.ok) {
          return petsRes.json().then(e => Promise.reject(e))
        }
        if (!peopleRes.ok) {
          return peopleRes.json().then(e => Promise.reject(e))
        }
        return Promise.all([
          petsRes.json(),
          peopleRes.json(),
        ])
      })
}

const addPerson = function(name) {
  name = { name };
  return fetch(`${endpoint}/people`, {
    method: 'POST',
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(name)
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((e)=> Promise.reject(e));
      }
      return res.json();
    })
}

const petIsAdopted = (type) => {
  type = { type };
  return fetch(`${endpoint}/pets`, {
    method: 'DELETE',
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(type)
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((e)=> Promise.reject(e));
      }
      return res.json();
    })
}
const helper = {
  fetchBoth,
  addPerson,
  petIsAdopted,
}
export default helper;