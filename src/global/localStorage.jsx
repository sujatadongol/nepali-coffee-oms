export class LocalDb {
  constructor() {
    this.sessionObj = undefined;
  }
  getSessions() {
    return this.sessionObj;
  }
  setSessions(sessionObj) {
    this.sessionObj = sessionObj;
  }
}
const localDb = new LocalDb();
export default localDb;
