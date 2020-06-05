import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config();

const MONGO_URL = env.DATABASE;

const client = new MongoClient();

client.connectWithUri(MONGO_URL);

const db = client.database("notes");

export default db;
