import express from "express";
import CreateUserService from "./aplication/services/CreateUserService";
import CreateUserController from "./controllers/CreateUserController";
import GetUsersService from "./aplication/services/GetUserService";
import GetUserController from "./controllers/GetUserController";
import GetAllUsersController from "./controllers/GetAllUsersController";
import GetAllUsersService from "./aplication/services/GetAllUsersService";
import UserRepositoryDBMemory from "./infra/repository/UserRepositoryMemory";

const app = express();

app.use(express.json());

//const connection = new AdapterMongoDB();
//const mongoDB = new UserRepositoryMongoDB(connection);

const dbFake = new UserRepositoryDBMemory();

app.get("/users", async (req, res) => {
  const getAllUsersService = new GetAllUsersService(dbFake);
  const getAllUsersController = new GetAllUsersController(getAllUsersService);
  const { statusCode, body } = await getAllUsersController.start();
  res.status(statusCode).send(body);
});

app.get("/user/:id", async (req, res) => {
  const getUserService = new GetUsersService(dbFake);
  const getUserController = new GetUserController(getUserService);
  const { statusCode, body } = await getUserController.start(req);
  res.status(statusCode).send(body);
});

app.post("/user", async (req, res) => {
  const createUserService = new CreateUserService(dbFake);
  const createUserControler = new CreateUserController(createUserService);
  const { statusCode, body } = await createUserControler.start(req);
  res.status(statusCode).send(body);
});

app.listen(3333, () => {
  console.log("Server running");
});
