import { User } from "../core/entities/User.interface";
import { MongoClient } from "mongodb";

const URI = "mongodb+srv://dhoyos:dh446@cluster0.t69qvo7.mongodb.net/?retryWrites=true&w=majority";


class MongoConnection implements Database {
  private client: any;

  constructor () {
    this.client = new MongoClient(URI);
  }

  public async getAllUsers(): Promise<User[]> {
    const users = await this.getCollection({});
    if(!users) throw new Error('Getting users failed');
    console.log(users)
    return users;
  }

  private async getCollection(filter: any): Promise<any[] | undefined> {
    try {
      await this.client.connect();
  
      const database = this.client.db('Example');
      const users = database.collection('Users'); 
      const usersArr = await users.find(filter).toArray();

      return usersArr; 
    } catch (error) {
      console.log(error);

    } finally {
      // Ensures that the client will close when you finish/error
      await this.client.close();
    }
  }

  // public async getAllUsers(): Promise<User[]> {
  //   try {
  //     await this.client.connect();
  
  //     const database = this.client.db('Example');
  //     const users = database.collection('Users'); 

  //     const usersArr = await users.find({});
  //     await usersArr.forEach(console.dir);
  //     return usersArr;
  //   } finally {
  //     // Ensures that the client will close when you finish/error
  //     await this.client.close();
  //   }
  // }
}

export const mongoConnection = new MongoConnection();