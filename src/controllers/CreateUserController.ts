import ICreateUserUseCase, {
  ICreateUserParams,
} from "../domain/useCases/CreateUserUseCase";
import {
  HttpRequest,
  HttpResponse,
  IController,
} from "./HttpAdapterController";

export default class CreateUserController implements IController {
  constructor(private createUserService: ICreateUserUseCase) {}
  async start(
    httpRequest: HttpRequest<ICreateUserParams>
  ): Promise<HttpResponse<unknown>> {
    try {
      await this.createUserService.execute(httpRequest.body!);
      return { statusCode: 201, body: "User created" };
    } catch (error) {
      if (error instanceof Error)
        return { statusCode: 400, body: error.message };
      return { statusCode: 400, body: "Unexpected error" };
    }
  }
}
