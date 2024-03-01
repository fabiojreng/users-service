import {
  noContent,
  serverError,
  success,
} from "../../domain/Helpers/HttpHelper";
import HttpResponse from "../../domain/Protocols/HttpResponse";
import IUserRepository from "../repository/UserRepository";
import UseCase from "./UseCase";

export default class GetAllUsersUseCase implements UseCase {
  constructor(private getAllUsersRepository: IUserRepository) {}
  async execute(): Promise<HttpResponse> {
    try {
      const users = await this.getAllUsersRepository.findAll();
      if (!users) return noContent();
      return success({ message: "Users", data: users });
    } catch (error) {
      if (error instanceof Error) return serverError(error);
      return serverError(new Error("Unexpected Error"));
    }
  }
}
