import express from "express";
import CreateUserDB from "./infra/CreateUserDB";
import CreateUserService from "./aplication/services/CreateUserService";
import CreateUserController from "./controllers/CreateUserController";
import GetUsersService from "./aplication/services/GetUsersService";
import GetUserController from "./controllers/GetUsersController";

const app = express();

app.use(express.json());

const dbfake = new CreateUserDB();

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

/*
{
    "name": "Fábio da Silva Eloi",
    "email":"fabio@gmail",
    "password":"123456",
    "registerCode":"20221ENG",
    "course":"Engenharia",
    "typeUser":"Aluno"
}
*/
