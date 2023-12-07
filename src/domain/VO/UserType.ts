export default class TypeUser {
  private value: string;

  constructor(type: string) {
    const validTypes = ["Aluno", "Servidor", "Bibliotecário"];
    if (validTypes.includes(type)) {
      this.value = type;
    } else {
      throw new Error("Invalid type user");
    }
  }

  getValue() {
    return this.value;
  }
}
