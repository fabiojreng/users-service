import IUserRepository from "../../aplication/repository/UserRepository";
import User from "../../domain/entities/User";
import AdapterMongoDB from "../dataBase/AdapterMongoDB";

export default class UserRepositoryMongoDB implements IUserRepository {
  constructor(private connection: AdapterMongoDB) {}

  save(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<void | User> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<void | User> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<void | User[]> {
    throw new Error("Method not implemented.");
  }
}
