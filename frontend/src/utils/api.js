//Clase API
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  //Metodos
  // Nuevo método para actualizar el token
  setAuthToken(token) {
    this._headers.Authorization = `Bearer ${token}`;
  }

  // Método para obtener headers actualizados
  /*_getHeaders() {
    const token = localStorage.getItem("token");
    return {
      ...this._headers,
      authorization: token ? `Bearer ${token}` : this._headers.authorization,
    };
  }*/

  _getHeaders() {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);

    const headers = {
      ...this._headers,
      Authorization: token ? `Bearer ${token}` : undefined,
    };

    console.log("Headers being sent:", headers); // ← Ahora SÍ se ejecutará
    return headers;
  }
  //Metodo para manejar respuestas de la api+++++++++

  _ApiVerification(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Error: ${res.status}`);
  }

  //Obtener todas las cartas++++++++++
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._getHeaders(),
    }).then(this._ApiVerification);
  }

  //Agregar una card++++++++++
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._ApiVerification);
  }
  //Quitar una card+++++++++
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._ApiVerification);
  }

  //Obtener la info del usuario++++++++++
  /*getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._getHeaders(),
    }).then(this._ApiVerification);
  }*/

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._getHeaders(),
    })
      .then((res) => {
        console.log("Status de respuesta:", res.status);
        console.log("Headers de respuesta:", res.headers);
        console.log("¿Es ok?", res.ok);

        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        console.log("Datos procesados:", data);
        return data;
      });
  }

  // Método para actualizar la información del usuario++++
  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._ApiVerification);
  }

  //Colocar una foto de perfil+++++++
  AvatarUpdate(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ avatar: data.avatar }),
    }).then(this._ApiVerification);
  }

  //Actualizar el estado del like+++++++

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),
    }).then(this._ApiVerification);
  }

  //Metodo para eliminar like++++++++++++
  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._ApiVerification);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._getHeaders(),
    }).then(this._ApiVerification);
  }
}

const api = new Api({
  baseUrl: "http://localhost:3001",
  headers: {
    "content-type": "application/json; charset=UTF-8",
    /*authorization: "0057b409-6bb9-49e8-86f9-882549209061",*/
  },
});

export default api;
