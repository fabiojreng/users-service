import { ObjectId } from "mongodb";
import IUserRepository from "../../aplication/repository/UserRepository";
import User from "../../domain/entities/User";
import AdapterMongoDB from "../dataBase/AdapterMongoDB";

export default class UserRepositoryMongoDB implements IUserRepository {
  constructor(private mongo: AdapterMongoDB) {}

  async save(user: User): Promise<void> {
    try {
      console.log("aqui");
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
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Unexpected error DB");
    } finally {
      await this.mongo.close();
    }
  }

  async findByEmail(email: string): Promise<void | User> {
    try {
      await this.mongo.connect();
      const query = await this.mongo.query();
      console.log(email);
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
        console.log(user);
        return user;
      }
    } catch (error) {
      throw new Error(`User not found for email: ${email}`);
    }
  }

  async findById(id: string): Promise<void | User> {
    try {
      await this.mongo.connect();
      const query = await this.mongo.query();
      console.log(id);

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
        console.log(user);
        return user;
      }
      throw new Error(`User not found for id: ${id} DB`);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Unexpected error DB");
    } finally {
      await this.mongo.close();
    }
  }

  async findAll(): Promise<void | User[]> {
    try {
      await this.mongo.connect();
      const query = await this.mongo.query();
      const users = await query.collection<User>("users").find({}).toArray();
      return users.map(({ _id, ...rest }) => ({
        ...rest,
        id: _id.toHexString(),
      }));
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Unexpected error DB");
    } finally {
      await this.mongo.close();
    }
  }
}
