import User from "../../domain/entities/User";
import IUserRepository from "../repository/UserRepository";
import ICreateUserUseCase, {
  ICreateUserParams,
} from "../useCases/CreateUserUseCase";

export default class CreateUserService implements ICreateUserUseCase {
  constructor(private createUserRepository: IUserRepository) {}
  async execute(params: ICreateUserParams): Promise<User> {
    try {
      const verifyEmail = await this.createUserRepository.findByEmail(
        params.email
      );
      if (verifyEmail) throw new Error("Email already exists");
      const user = User.create(
        params.name,
        params.email,
        params.password,
        params.registerCode,
        params.course,
        params.typeUser
      );
      await this.createUserRepository.save(user);
      console.log(user);
      return user;
    } catch (error) {
      throw new Error("User not created");
    }
  }
}
