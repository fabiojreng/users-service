import User from "../../domain/entities/User";
import IGetAllUsersUseCase from "../../domain/useCases/GetAllUserUseCase";
import IUserRepository from "../repository/UserRepository";

export default class GetAllUsersService implements IGetAllUsersUseCase {
  constructor(private getAllUsersRepository: IUserRepository) {}
  async execute(): Promise<User[]> {
    try {
      const users = await this.getAllUsersRepository.findAll();

      if (!users) throw new Error("Users not found");
      return users;
    } catch (error) {
      throw new Error(`messege: ${error}`);
    }
  }
}
