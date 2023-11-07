import ICreateUserRepository from "../../aplication/repository/UserRepository";
import User from "../../domain/entities/User";

export default class UserRepositoryDBMemory implements ICreateUserRepository {
  users: User[] = [];

  async findAll(): Promise<void | User[]> {
    console.log(this.users);
    return this.users;
  }
  async save(user: User): Promise<void> {
    this.users.push(user);
  }
  async findByEmail(email: string): Promise<void | User> {
    const user = this.users.find((user) => user.email.getEmail() === email);
    return user;
  }
  async findById(id: string): Promise<void | User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
}
