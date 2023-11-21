import IUserRepository from "../repository/UserRepository";

export interface Output {
  id: string;
  name: string;
  email: string;
  password: string;
  registerCode: string;
  course: string;
  typeUser: string;
  createdAt: Date;
}

export default class GetUserUseCase {
  constructor(private getUserRepository: IUserRepository) {}
  async execute(id: string): Promise<Output> {
    try {
      const user = await this.getUserRepository.findById(id);

      if (!user) throw new Error(`User not found for id ${id}`);
      return {
        id: user.id,
        name: user.name.getValue(),
        email: user.email.getValue(),
        password: user.password.getValue(),
        registerCode: user.registerCode,
        course: user.course,
        typeUser: user.typeUser.getValue(),
        createdAt: user.createdAt,
      };
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Unexpected error");
    }
  }
}
