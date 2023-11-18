import { ObjectId } from "mongodb";
import IUserRepository from "../../aplication/repository/UserRepository";
import User from "../../domain/entities/User";
import AdapterMongoDB from "../dataBase/AdapterMongoDB";

export default class UserRepositoryMongoDB implements IUserRepository {
  constructor(private mongo: AdapterMongoDB) {}

  async save(user: User): Promise<void> {
    await this.mongo.connect();
    const query = await this.mongo.query();
    await query.collection("users").insertOne(user);
    await this.mongo.close();
  }

  async findByEmail(email: string): Promise<void | User> {
    await this.mongo.connect();
    const query = await this.mongo.query();
    const user = await query
      .collection<User>("users")
      .findOne({ typeUserEmail: email });

    return user;
  }

  async findById(id: string): Promise<void | User> {
    await this.mongo.connect();
    const query = await this.mongo.query();
    console.log(id);

    const user = await query
      .collection<User>("users")
      .findOne({ _id: new ObjectId(id) });

    console.log(user);

    return user;
  }

  async findAll(): Promise<void | User[]> {
    await this.mongo.connect();
    const query = await this.mongo.query();
    const users = await query.collection<User>("users").find({}).toArray();
    return users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
    await this.mongo.close();
  }
}
