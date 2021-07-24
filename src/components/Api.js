export default class Api {
  constructor(config){
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _handleResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,  
    })
    .then(this._handleResponce);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then(this._handleResponce);
  }

  setUserInfo( name, info ) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: info,
      })
    })
    .then(this._handleResponce);
  }

  postCard( name, image ) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: image,
      })
    })
    .then(this._handleResponce);
  }
  
  setAvatar( avatar ) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(console.log(avatarLink))
    .then(this._checkResponse);
  }

  LikeCard( cardId, handleLike ) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: handleLike ? 'DELETE' : 'PUT' ,
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  deleteCard( cardId ) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

}