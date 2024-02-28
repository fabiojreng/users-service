// import { randomBytes, pbkdf2 } from 'crypto';
import bcrypt, { compareSync } from "bcrypt";

export default class Pass {
  private value: string;
  constructor(password: string) {
    this.value = password;
  }

  static async create(password: string): Promise<Pass> {
    if (password.length < 8) throw new Error("Invalid password");
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    return new Pass(hash);
  }

  async validate(pass: string) {
    try {
      const hash = compareSync(pass, this.value);
      return hash;
    } catch (error) {}
  }

  getValue() {
    return this.value;
  }
}
