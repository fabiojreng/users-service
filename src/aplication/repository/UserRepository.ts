import User from "../../domain/entities/User";

export interface paramsUpdate {
  name?: string;
  email?: string;
  password?: string;
  //registerCode: string;
  //course: string;
}

export default interface IUserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: string): Promise<void | User>;
  findById(id: string): Promise<void | User>;
  findAll(): Promise<void | User[]>;
  delete(id: string): Promise<void>;
  update(id: string, params: paramsUpdate): Promise<void>;
}
