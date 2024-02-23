import { ObjectId } from "mongodb";
import IUserRepository from "../../aplication/repository/UserRepository";
import User from "../../domain/entities/User";
import AdapterMongoDB from "../dataBase/AdapterMongoDB";

export default class UserRepositoryMongoDB implements IUserRepository {
  constructor(private mongo: AdapterMongoDB) {}

  async save(user: User): Promise<void> {
    await this.mongo.connect();
    const query = await this.mongo.query();
    await query.collection("users").insertOne({
      name: user.name.getValue(),
      email: user.email.getValue(),
      password: user.password.getValue(),
      registerCode: user.registerCode,
      course: user.course,
      typeUser: user.typeUser.getValue(),
      createdAt: user.createdAt,
    });
    await this.mongo.close();
  }

  async findByEmail(email: string): Promise<void | User> {
    await this.mongo.connect();
    const query = await this.mongo.query();
    const userDB = await query.collection("users").findOne({ email: email });
    if (userDB) {
      const user = User.restore(
        userDB._id.toString(),
        userDB.name,
        userDB.email,
        userDB.password,
        userDB.registerCode,
        userDB.course,
        userDB.typeUser,
        userDB.createdAt
      );
      await this.mongo.close();
      return user;
    }
  }

  async findById(id: string): Promise<void | User> {
    await this.mongo.connect();
    const query = await this.mongo.query();
    const userDB = await query
      .collection("users")
      .findOne({ _id: new ObjectId(id) });
    if (userDB) {
      const user = User.restore(
        userDB._id.toString(),
        userDB.name,
        userDB.email,
        userDB.password,
        userDB.registerCode,
        userDB.course,
        userDB.typeUser,
        userDB.createdAt
      );
      await this.mongo.close();
      return user;
    }
  }

  async findAll(): Promise<void | User[]> {
    await this.mongo.connect();
    const query = await this.mongo.query();
    const users = await query.collection<User>("users").find({}).toArray();
    await this.mongo.close();
    return users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
