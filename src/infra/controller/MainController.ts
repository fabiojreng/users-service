import CreateUserUseCase from "../../aplication/useCases/CreateUserUseCase";
import DeleteUserUseCase from "../../aplication/useCases/DeleteUserUseCase";
import GetAllUsersUseCase from "../../aplication/useCases/GetAllUserUseCase";
import GetUserUseCase from "../../aplication/useCases/GetUserUseCase";
import UpdateUserUseCase from "../../aplication/useCases/UpdateUserUseCase";
import HttpServer from "../http/HttpServer";

export default class MainController {
  constructor(
    private createUser: CreateUserUseCase,
    private getUser: GetUserUseCase,
    private getAllUsers: GetAllUsersUseCase,
    private deleteUser: DeleteUserUseCase,
    private updateUser: UpdateUserUseCase,
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
    httpServer.register("delete", "/user/:id", async function (params: any) {
      await deleteUser.execute(params.id);
      return { statusCode: 200, body: "User deleted successfully" };
    });
    httpServer.register(
      "patch",
      "/user/:id",
      async function (params: any, body: any) {
        await updateUser.start(params.id, body);
        return { statusCode: 200, body: "User updated successfully" };
      }
    );
  }
}
