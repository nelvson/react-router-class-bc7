// @flow
//
// hello world!

export default function token(key: string, action: string) {
  if (action === 'CREATE_TOKEN') setToken(key);
  if (action === 'DELETE_TOKEN') deleteToken(key);
}

function getToken(key) {
  let item = localStorage.getItem(key);
  return item;
}

function deleteToken(key) {
  //foobar
  localStorage.removeItem(key);
}

function setToken(key) {
  localStorage.setItem('token', key);
}
