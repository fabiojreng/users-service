import { MongoClient, Db } from "mongodb";
import IDatabaseConnection from "./Connection";
// import User from "../../domain/entities/User";

export default class AdapterMongoDB implements IDatabaseConnection {
  private client: MongoClient;
  private db: Db;
  private url: string =
    process.env.MONGODB_URL || "mongodb+srv://cluster0.r6jwwdl.mongodb.net";
  private username: string = process.env.MONGODB_USERNAME || "root";
  private password: string = process.env.MONGODB_PASSWORD || "PblsfQCyHhJdIvbr";

  constructor() {
    console.log(this.username, this.password);
    this.client = new MongoClient(this.url, {
      auth: { username: this.username, password: this.password },
    });
    this.db = this.client.db("microservice-users");
  }

  async connect(): Promise<void> {
    await this.client.connect();
    console.log("conectado");
  }

  async query(statement?: string, params?: any): Promise<Db> {
    return this.db;
  }

  async close(): Promise<void> {
    await this.client.close();
  }
}
