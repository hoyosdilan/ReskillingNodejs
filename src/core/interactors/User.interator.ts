import { User } from "../entities/User.interface";

export const getAllUsers = async (database: Database) => {
    const users: User[] = await database.getAllUsers();
    return users;
}
