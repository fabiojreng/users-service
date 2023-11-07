import express from "express";
import CreateUserDB from "./infra/repository/UserRepositoryMemory";
import CreateUserService from "./aplication/services/CreateUserService";
import CreateUserController from "./controllers/CreateUserController";
import GetUsersService from "./aplication/services/GetUserService";
import GetUserController from "./controllers/GetUserController";
import GetAllUsersController from "./controllers/GetAllUsersController";
import GetAllUsersService from "./aplication/services/GetAllUsersService";

const app = express();

app.use(express.json());

const dbfake = new CreateUserDB();

app.get("/users", (req, res) => {
  const getAllUsersService = new GetAllUsersService(dbfake);
  const getAllUsersController = new GetAllUsersController(getAllUsersService);
  getAllUsersController.start(req, res);
});

app.get("/user/:id", async (req, res) => {
  const getUserService = new GetUsersService(dbfake);
  const getUserController = new GetUserController(getUserService);

  await getUserController.start(req, res);
});

app.post("/user", async (req, res) => {
  const createUserService = new CreateUserService(dbfake);
  const createUserControler = new CreateUserController(createUserService);
  await createUserControler.start(req, res);
});

app.listen(3333, () => {
  console.log("Server running");
});
