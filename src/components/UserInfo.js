export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this.nameSelector = document.querySelector(nameSelector);
    this.infoSelector = document.querySelector(infoSelector);
  }

  getUserInfo() {
    return {
      nameData: this.nameSelector.textContent,
      infoData: this.infoSelector.textContent,
    };
  }

  setUserInfo({ nameData, infoData }) {
    this.nameSelector.textContent = nameData;
    this.infoSelector.textContent = infoData;
  }
}
