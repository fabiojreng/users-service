import dotenv from "dotenv";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import MainController from "./infra/controller/MainController";
import CreateUserUseCase from "./aplication/useCases/CreateUserUseCase";
import GetAllUsersUseCase from "./aplication/useCases/GetAllUserUseCase";
import GetUserUseCase from "./aplication/useCases/GetUserUseCase";
import AdapterMongoDB from "./infra/dataBase/AdapterMongoDB";
import UserRepositoryMongoDB from "./infra/repository/UserRepositoryMogoDB";
import LoginUserUseCase from "./aplication/useCases/LoginUserUseCase";
import VerifyTokenUseCase from "./aplication/useCases/VerifyTokenUseCase";
import LoginAdmUseCase from "./aplication/useCases/LoginAdmUseCase";
import ResetPassword from "./aplication/useCases/ResetPasswordUseCase";

dotenv.config();

const server = new ExpressAdapter();
const connection = new AdapterMongoDB();
const mongoDB = new UserRepositoryMongoDB(connection);
const createUser = new CreateUserUseCase(mongoDB);
const getUser = new GetUserUseCase(mongoDB);
const getAllUsers = new GetAllUsersUseCase(mongoDB);
const verifyTokenUseCase = new VerifyTokenUseCase();
const loginUser = new LoginUserUseCase(mongoDB);
const loginAdm = new LoginAdmUseCase(mongoDB);
const resetPassord = new ResetPassword(mongoDB);

new MainController(
  server,
  createUser,
  getUser,
  getAllUsers,
  loginUser,
  loginAdm,
  resetPassord,
  verifyTokenUseCase
);
server.listen(3005);
