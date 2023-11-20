import User from "../../domain/entities/User";
import IUserRepository from "../repository/UserRepository";

export default class GetAllUsersUseCase {
  constructor(private getAllUsersRepository: IUserRepository) {}
  async execute(): Promise<User[]> {
    try {
      const users = await this.getAllUsersRepository.findAll();

      if (!users) throw new Error();
      return users;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Unexpected error");
    }
  }
}
