import IUserRepository from "../repository/UserRepository";

export default class DeleteUserUseCase {
  constructor(private deleteUserRepository: IUserRepository) {}
  async execute(id: string) {
    try {
      const user = await this.deleteUserRepository.findById(id);
      if (!user) throw new Error(`User not found for id ${id}`);
      await this.deleteUserRepository.delete(id);
      return user;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Unexpected error");
    }
  }
}
