import IUserRepository, { paramsUpdate } from "../repository/UserRepository";

export default class UpdateUserUseCase {
  constructor(private updateUserRepository: IUserRepository) {}
  async start(id: string, params: paramsUpdate) {
    try {
      const user = await this.updateUserRepository.findById(id);
      if (!user) throw new Error(`User not found for id ${id}`);
      if (!params) throw new Error(`Params inserted invalid: ${params}`);
      await this.updateUserRepository.update(id, params);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Unexpected error");
    }
  }
}
