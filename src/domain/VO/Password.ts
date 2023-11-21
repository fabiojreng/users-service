import * as bcrypt from "bcrypt";

export default class Password {
  private value: string;

  constructor(password: string) {
    this.value = this.encryptPassword(password);
  }

  private encryptPassword(password: string) {
    this.validadePassword(password);
    const saltRounds = bcrypt.genSaltSync(12);
    return (this.value = bcrypt.hashSync(password, saltRounds));
  }

  private comparePassword(password: string) {
    return bcrypt.compareSync(password, this.value);
  }

  private validadePassword(password: string) {
    if (password.length < 6) throw new Error("Invalid length password");
    return password;
  }

  getValue() {
    return this.value;
  }
}
