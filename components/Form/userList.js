export class UserList {
  constructor() {
    this.person = [];
    this.status = false;
  }
  // or
  // person = []

  addUser(newUser) {
    const isExixting = this.person.find((item) => item.email === newUser.email);
    if (!isExixting) {
      return this.person.push(newUser);
    }
    return this.status;
  }
  listAllUsers() {
    return this.person;
  }
  catchExistingMembers() {}
}
