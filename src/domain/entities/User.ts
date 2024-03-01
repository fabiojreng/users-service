import crypto from "crypto";
import Name from "../VO/Name";
import Email from "../VO/Email";
import TypeUser from "../VO/TypeUser";
import Pass from "../VO/Pass";

export default class User {
  constructor(
    readonly id: string,
    readonly name: Name,
    readonly email: Email,
    readonly password: Pass,
    readonly registerCode: string,
    readonly typeUser: TypeUser,
    readonly createdAt: Date
  ) {}

  static async create(
    name: string,
    email: string,
    password: string,
    registerCode: string,
    typeUser: string
  ) {
    const id = crypto.randomUUID();
    const createdAt = new Date();
    return new User(
      id,
      new Name(name),
      new Email(email),
      await Pass.create(password),
      registerCode,
      new TypeUser(typeUser),
      createdAt
    );
  }

  static restore(
    id: string,
    name: string,
    email: string,
    password: string,
    registerCode: string,
    typeUser: string,
    createdAt: string
  ) {
    return new User(
      id,
      new Name(name),
      new Email(email),
      new Pass(password),
      registerCode,
      new TypeUser(typeUser),
      new Date(createdAt)
    );
  }
  async validatePass(password: string) {
    return this.password.validate(password);
  }
}
