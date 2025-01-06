import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: "thoughtsfly auth users",
  issuerBaseURL: "https://dev-2jw4zujxnfrfeb4x.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

export {jwtCheck};
