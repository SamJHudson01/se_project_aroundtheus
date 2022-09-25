export default class UserInfo {
    constructor( nameSelector, aboutSelector) {
        this._name = document.querySelector(nameSelector);
        this._description = document.querySelector(aboutSelector);
    }
    

    getUserInfo() {
        return {
            name: this._name.textContent,
            description: this._description.textContent,
        };
    }

    setUserInfo({ name, description }) {
        this._name.textContent = name;
        this._description.textContent = description;
    }

    
}