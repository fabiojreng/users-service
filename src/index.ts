import express from "express";
import CreateUserUseCase from "./aplication/useCases/CreateUserUseCase";
import GetAllUsersUseCase from "./aplication/useCases/GetAllUserUseCase";
import GetUserUseCase from "./aplication/useCases/GetUserUseCase";
import AdapterMongoDB from "./infra/dataBase/AdapterMongoDB";
import UserRepositoryMongoDB from "./infra/repository/UserRepositoryMogoDB";
import CreateUserController from "./controllers/CreateUserController";
import GetAllUsersController from "./controllers/GetAllUsersController";
import GetUserController from "./controllers/GetUserController";
import DeleteUserUseCase from "./aplication/useCases/DeleteUserUseCase";
import DeleteUserController from "./controllers/DeleteUserController";

const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
  const connection = new AdapterMongoDB();
  const mongoDB = new UserRepositoryMongoDB(connection);
  const getAllUsersUseCase = new GetAllUsersUseCase(mongoDB);
  const getAllUsersController = new GetAllUsersController(getAllUsersUseCase);
  const { statusCode, body } = await getAllUsersController.start();
  res.status(statusCode).send(body);
});

app.get("/user/:id", async (req, res) => {
  const connection = new AdapterMongoDB();
  const mongoDB = new UserRepositoryMongoDB(connection);
  const getUserUsecase = new GetUserUseCase(mongoDB);
  const getUserController = new GetUserController(getUserUsecase);
  const { statusCode, body } = await getUserController.start(req);
  res.status(statusCode).send(body);
});

app.post("/user", async (req, res) => {
  const connection = new AdapterMongoDB();
  const mongoDB = new UserRepositoryMongoDB(connection);
  const createUserUseCase = new CreateUserUseCase(mongoDB);
  const createUserControler = new CreateUserController(createUserUseCase);
  const { statusCode, body } = await createUserControler.start(req);
  res.status(statusCode).send(body);
});

app.delete("/user/:id", async (req, res) => {
  const connection = new AdapterMongoDB();
  const mongoDB = new UserRepositoryMongoDB(connection);
  const deleteUserUseCase = new DeleteUserUseCase(mongoDB);
  const deleteUserController = new DeleteUserController(deleteUserUseCase);
  const { statusCode, body } = await deleteUserController.start(req);
  res.status(statusCode).send(body);
});

app.listen(3333, () => {
  console.log("Server running");
});
