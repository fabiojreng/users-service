import User from "../entities/User";

export default interface IUserRepository {
  save(user: User): Promise<string>;
  findByEmail(email: string): Promise<void | User>;
  findById(id: string): Promise<void | User>;
  findAll(): Promise<void | User[]>;
  updatePassword(id: string, newPassword: string): Promise<void>;
}
