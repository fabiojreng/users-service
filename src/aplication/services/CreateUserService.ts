import User from "../../domain/entities/User";
import IUserRepository from "../repository/UserRepository";
import ICreateUserUseCase, {
  ICreateUserParams,
} from "../../domain/useCases/CreateUserUseCase";

export default class CreateUserService implements ICreateUserUseCase {
  constructor(private createUserRepository: IUserRepository) {}
  async execute(params: ICreateUserParams): Promise<User> {
    try {
      const verifyEmail = await this.createUserRepository.findByEmail(
        params.email
      );
      if (verifyEmail) throw new Error("Email already exists");
      //const password =
      const user = User.create(
        params.name,
        params.email,
        params.password,
        params.registerCode,
        params.course,
        params.typeUser
      );
      console.log(user);
      await this.createUserRepository.save(user);
      return user;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Unexpected error");
    }
  }
}
