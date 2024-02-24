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
    readonly course: string,
    readonly typeUser: TypeUser,
    readonly createdAt: Date
  ) {}

  static async create(
    name: string,
    email: string,
    password: string,
    registerCode: string,
    course: string,
    typeUser: string
  ) {
    //const qtdDocuments = 0;
    const id = crypto.randomUUID();
    const createdAt = new Date();
    return new User(
      id,
      new Name(name),
      new Email(email),
      await Pass.create(password),
      registerCode,
      course,
      new TypeUser(typeUser),
      createdAt
      //qtdDocuments
    );
  }

  static restore(
    id: string,
    name: string,
    email: string,
    password: string,
    registerCode: string,
    course: string,
    typeUser: string,
    createdAt: string
    //qtdDocuments: number
  ) {
    return new User(
      id,
      new Name(name),
      new Email(email),
      new Pass(password),
      registerCode,
      course,
      new TypeUser(typeUser),
      new Date(createdAt)
      //qtdDocuments
    );
  }
  async validatePass(password: string) {
    return this.password.validate(password);
  }
}
