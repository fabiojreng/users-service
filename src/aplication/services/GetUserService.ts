import IUserRepository from "../repository/UserRepository";
import IGetUsersUseCase, { Output } from "../../domain/useCases/GetUserUseCase";

export default class GetUsersService implements IGetUsersUseCase {
  constructor(private getUserRepository: IUserRepository) {}
  async execute(id: string): Promise<Output> {
    try {
      const user = await this.getUserRepository.findById(id);

      if (!user) throw new Error("User not found");
      return {
        id: user.id,
        name: user.name.getName(),
        email: user.email.getEmail(),
        registerCode: user.registerCode,
        course: user.course,
        typeUser: user.typeUser.getType(),
        createdAt: user.createdAt,
      };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
