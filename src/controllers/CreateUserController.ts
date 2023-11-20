import CreateUserUseCase, {
  ICreateUserParams,
} from "../aplication/useCases/CreateUserUseCase";
import {
  HttpRequest,
  HttpResponse,
  IController,
} from "./HttpAdapterController";

export default class CreateUserController implements IController {
  constructor(private createUser: CreateUserUseCase) {}
  async start(
    httpRequest: HttpRequest<ICreateUserParams>
  ): Promise<HttpResponse<unknown>> {
    try {
      await this.createUser.execute(httpRequest.body!);
      return { statusCode: 201, body: "User created" };
    } catch (error) {
      if (error instanceof Error)
        return { statusCode: 400, body: error.message };
      return { statusCode: 400, body: "Unexpected error" };
    }
  }
}
