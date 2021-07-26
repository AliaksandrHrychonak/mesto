export default class UserInfo {
  constructor( name, info, avatar ) {
    this._nameSelector = name;
    this._infoSelector = info;
    this._avatar = avatar;
  }

  getUserInfo() {
    const infoObject = {};
    infoObject.name = this._nameSelector.textContent;
    infoObject.info = this._infoSelector.textContent;
    infoObject.avatar = this._avatar.src;
    return infoObject;
  }

  setUserInfo(data) {
    this._nameSelector.textContent = data.name;
    this._infoSelector.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}
