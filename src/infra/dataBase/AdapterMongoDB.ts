import { MongoClient, Db } from "mongodb";
import IDatabaseConnection from "./Connection";

export default class AdapterMongoDB implements IDatabaseConnection {
  private client: MongoClient;
  private db: Db;
  private url =
    process.env.MONGODB_URL || "mongodb+srv://cluster0.r6jwwdl.mongodb.net";
  private username = process.env.MONGODB_USERNAME;   
  private password = process.env.MONGODB_PASSWORD;

  constructor() {
    this.client = new MongoClient(this.url, {
      auth: { username: this.username, password: this.password },
    });
    this.db = this.client.db("microservice-users");
  }

  async connect(): Promise<void> {
    await this.client.connect();
    console.log("conectado");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async query(statement?: string, params?: any): Promise<Db> {
    return this.db;
  }

  async close(): Promise<void> {
    await this.client.close();
    console.log("fechando conexão");
  }
}
