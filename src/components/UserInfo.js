export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    console.log(this._name.textContent, this._about.textContent);
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      
    };
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  setUserAvatar(avatar) {
    this._profileAvatar.src = avatar;
  }
}
