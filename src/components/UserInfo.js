export default class UserInfo {
  constructor( name, info, avatar ) {
    this._nameSelector = name;
    this._infoSelector = info;
    this._profileAvatar = avatar;
  }

  getUserInfo() {
    const infoObject = {};
    infoObject.name = this._nameSelector.textContent;
    infoObject.info = this._infoSelector.textContent;
    infoObject.avatar = this._profileAvatar.src;
    return infoObject;
  }

  setUserInfo(info) {
    this._nameSelector.textContent = info.name;
    this._infoSelector.textContent = info.about;
    this._profileAvatar = info.avatar;
  }
}
