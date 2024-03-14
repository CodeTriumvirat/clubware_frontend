import { Client, Account } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://api.jslab.dev/v1")
  .setProject("65f3150b725f23e537c8");

export const account = new Account(client);
export { ID } from "appwrite";
