import { google } from "googleapis";
import yargs from "yargs/yargs";
const { hideBin } = require("yargs/helpers");

export async function getArgs() {
  const argv = await Promise.resolve(yargs(hideBin(process.argv)).argv);

  const clientId = argv['clientId'];
  const clientSecret = argv['clientSecret'];

  const code = argv.code;
  const refreshToken = argv.refreshToken;
  const test = argv.test
  
  if (!clientId) throw new Error('No clientId ');
  console.log('We have a clientId');
  
  if (!clientSecret) throw new Error('No clientSecret');
  console.log('We have a clientSecret');
  
  if (code) console.log('We have a code');
  if (refreshToken) console.log('We have a refreshToken');

  return { code, clientId, clientSecret, refreshToken, test };
}

export function makeOAuth2Client({
  clientId,
  clientSecret,
}) {
  return new google.auth.OAuth2(
    /* YOUR_CLIENT_ID */ clientId,
    /* YOUR_CLIENT_SECRET */ clientSecret,
    /* YOUR_REDIRECT_URL */ "urn:ietf:wg:oauth:2.0:oob"
  );
}