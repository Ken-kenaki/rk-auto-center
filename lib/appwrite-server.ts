import { Client, Databases, Storage, Users, Account } from "node-appwrite";

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://fra.cloud.appwrite.io/v1")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "")
    .setKey(process.env.APPWRITE_API_KEY || "");

export const serverDatabases = new Databases(client);
export const serverStorage = new Storage(client);
export const serverUsers = new Users(client);
export const serverAccount = new Account(client);
export { client as serverClient };
