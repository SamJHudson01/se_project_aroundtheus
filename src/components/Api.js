class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._method = options.method;
  }

  getInitialCards(generateCards) {
    fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        generateCards(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUserInfo(getUserInfo) {
    fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        getUserInfo(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setUserInfo(data) {
    fetch(`${this._baseUrl}/users/me`, {
      method: this._method,
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addCard(data, generateCard) {
    fetch(`${this._baseUrl}/cards`, {
      method: this._method,
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        console.log(result);
        generateCard(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(cardId, element) {
    fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: this._method,
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        console.log(result);
        element.remove();
        element = null;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggleLike(cardId, isLiked, element) {
    if (isLiked) {
      fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        })
        .then((result) => {
          element
            .querySelector(".card__like-button")
            .classList.remove("card__like-button_true");
            console.log(element.querySelector(".card__like-button"))
          element.querySelector(".card__like-count").textContent =
            result.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._headers,
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        })
        .then((result) => {
          element
            .querySelector(".card__like-button")
            .classList.add("card__like-button_true");
          console.log( element
            .querySelector(".card__like-button"))
          element.querySelector(".card__like-count").textContent =
            result.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  // other methods for working with the API
}

export default Api;
