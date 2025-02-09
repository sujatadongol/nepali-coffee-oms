export class API {
  static token = null;
  constructor() {
    API.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  removeTokens() {
    API.token = null;
  }

  resetToken() {
    this.removeTokens();
    this.setToken();
  }

  getToken() {
    return this.token;
  }

  authHeadersTypeJSON(token = API.token) {
    return { ...APIHeadersTypeJSON, Authorization: token || this.token };
  }
}
export const APIObj = new API();

export default new API();

export const APIHeadersTypeJSON = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Debug-Id": CreateUUID().replace(/-/g, ""),
};
export function CreateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
