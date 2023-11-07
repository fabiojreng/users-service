import User from "../entities/User";

export default interface IGetAllUsersUseCase {
  execute(): Promise<User[]>;
}
