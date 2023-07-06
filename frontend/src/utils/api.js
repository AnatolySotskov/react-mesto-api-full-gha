import { apiSettings } from "./constants";

class Api {
  constructor(apiSettings) {
    this._token = apiSettings.token;
    this._address = apiSettings.address;
    this._headers = apiSettings.headers;
  }


  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      Promise.reject(`Ошибка ${res.status}`);
    }
  };

  getCards() {
    const token = localStorage.getItem("token");
    return fetch(`${this._address}/cards`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }

  getInfoUser() {
    const token = localStorage.getItem("token");
    return fetch(`${this._address}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }

  patchProfile({ name, about }) {
    const token = localStorage.getItem("token");
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, about }),
    }).then(this._handleResponse);
  }

  patchAvatar(avatar) {
    const token = localStorage.getItem("token");
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ avatar }),
    }).then(this._handleResponse);
  }

  addCard({ name, link }) {
    const token = localStorage.getItem("token");
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, link }),
    }).then(this._handleResponse);
  }

  _setLike(id) {
    const token = localStorage.getItem("token");
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }

  _removeLike(id) {
    const token = localStorage.getItem("token");
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }

  toggleLike(cardId, isLiked) {
    if (isLiked === true) {
      return this._removeLike(cardId);
    } else {
      return this._setLike(cardId);
    }
  }

  deleteCards(cardId) {
    const token = localStorage.getItem("token");
    return fetch(`${this._address}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }
}

const api = new Api(apiSettings);

export default api;
