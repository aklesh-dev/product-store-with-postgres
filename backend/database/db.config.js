import "dotenv/config";
import { neon } from "@neondatabase/serverless";

const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD } = process.env;

// ?Creates a SQL connection using our env variables
const connectionString = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`;
//// console.log("DB connection string:",connectionString);
export const sql = neon(connectionString);

// *This sql function we exports is used as a tagged template literal, which allows us to write SQL queries safely.