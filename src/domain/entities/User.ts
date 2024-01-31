import crypto from "crypto";
import Email from "../VO/Email";
import Name from "../VO/Name";
import TypeUser from "../VO/UserType";
import Password from "../VO/Password";

export default class User {
  constructor(
    readonly id: string,
    readonly name: Name,
    readonly email: Email,
    readonly password: Password,
    readonly registerCode: string,
    readonly course: string,
    readonly typeUser: TypeUser,
    readonly createdAt: Date
  ) //readonly qtdDocuments: Number
  {}

  static create(
    name: string,
    email: string,
    password: string,
    registerCode: string,
    course: string,
    typeUser: string
  ) {
    const id = crypto.randomUUID();
    //const qtdDocuments = 0;
    const createdAt = new Date();
    return new User(
      id,
      new Name(name),
      new Email(email),
      new Password(password),
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
      new Password(password),
      registerCode,
      course,
      new TypeUser(typeUser),
      new Date(createdAt)
      //qtdDocuments
    );
  }
}
