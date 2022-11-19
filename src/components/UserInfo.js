export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
    this._profileOwnerId = null;
  }

  getUserInfo() {
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

  setProfileOwnerId(id) {
    this._profileOwnerId = id;
  } 

  getProfileOwnerId() {
    return this._profileOwnerId;
  }

}
