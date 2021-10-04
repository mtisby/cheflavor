import { google } from "googleapis";
import { DotenvConfigOptions } from "dotenv";

const credentials = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;