import ExpressAdapter from "./infra/http/ExpressAdapter";
import MainController from "./infra/controller/MainController";
import CreateUserUseCase from "./aplication/useCases/CreateUserUseCase";
import GetAllUsersUseCase from "./aplication/useCases/GetAllUserUseCase";
import GetUserUseCase from "./aplication/useCases/GetUserUseCase";
import DeleteUserUseCase from "./aplication/useCases/DeleteUserUseCase";
import AdapterMongoDB from "./infra/dataBase/AdapterMongoDB";
import UserRepositoryMongoDB from "./infra/repository/UserRepositoryMogoDB";

const server = new ExpressAdapter();
const connection = new AdapterMongoDB();
const mongoDB = new UserRepositoryMongoDB(connection);
const createUser = new CreateUserUseCase(mongoDB);
const getUser = new GetUserUseCase(mongoDB);
const getAllUsers = new GetAllUsersUseCase(mongoDB);
const deleteUser = new DeleteUserUseCase(mongoDB);
new MainController(createUser, getUser, getAllUsers, deleteUser, server);
server.listen(3333);
