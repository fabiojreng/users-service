import CreateUserUseCase from "../../aplication/useCases/CreateUserUseCase";
import GetAllUsersUseCase from "../../aplication/useCases/GetAllUserUseCase";
import GetUserUseCase from "../../aplication/useCases/GetUserUseCase";
import HttpServer from "../http/HttpServer";

export default class MainController {
  constructor(
    private createUser: CreateUserUseCase,
    private getUser: GetUserUseCase,
    private getAllUsers: GetAllUsersUseCase,
    private httpServer: HttpServer
  ) {
    httpServer.register(
      "post",
      "/user",
      async function (params: any, body: any) {
        await createUser.execute(body);
        return { statusCode: 201, body: "User created" };
      }
    );
    httpServer.register("get", "/user/:id", async function (params: any) {
      const user = await getUser.execute(params.id);
      return { statusCode: 200, body: user };
    });
    httpServer.register("get", "/users", async function () {
      const users = await getAllUsers.execute();
      return { statusCode: 200, body: users };
    });
  }
}
