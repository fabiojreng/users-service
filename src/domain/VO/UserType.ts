export default class UserType {
  private typeUser: string;

  constructor(type: string) {
    const validTypes = ["Aluno", "Servidor", "Bibliotecário"];
    if (validTypes.includes(type)) {
      this.typeUser = type;
    } else {
      throw new Error("Invalid type user");
    }
  }

  getType() {
    return this.typeUser;
  }
}
