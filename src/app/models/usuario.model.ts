export class User {
  constructor(
    public uid: string,
    public nombre: string,
    public email: string
  ) {}

  // static userFireStore(uid: string, nombre: string, email: string) {
  static fromFireStore({uid, nombre, email}) {
    return new User(uid, nombre, email);
  }
}
