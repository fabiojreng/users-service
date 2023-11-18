import GetAllUsersService from "../aplication/services/GetAllUsersService";
import { HttpResponse, IController } from "./HttpAdapterController";

export default class GetAllUsersController implements IController {
  constructor(private getAllUsersService: GetAllUsersService) {}
  async start(): Promise<HttpResponse<unknown>> {
    try {
      const users = await this.getAllUsersService.execute();

      return { statusCode: 200, body: users };
    } catch (error) {
      if (error instanceof Error)
        return { statusCode: 400, body: error.message };
      return { statusCode: 500, body: error };
    }
  }
}
