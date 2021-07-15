export default class UserInfo {
  constructor( nameSelector, infoSelector ) {
    this._nameSelector = nameSelector;
    this._infoSelector = infoSelector;
  }

  getUserInfo() {
    const infoObject = {};
    infoObject.name = this._nameSelector.textContent;
    infoObject.info = this._infoSelector.textContent;
    return infoObject;
  }

  setUserInfo(data) {
    this._nameSelector.textContent = data.name;
    this._infoSelector.textContent = data.info;
  }
}
