import http from "k6/http";
import { sleep } from "k6";
import { check } from "k6";

export let options = {
  vus: 1000,          // users
  duration: "30s",   // total test duration
};

export default function () {
  const url = `http://localhost:8001/api/v1/post/create`;

  // Body: only `content` required
  const payload = JSON.stringify({
    content: `Load test post at ${new Date().toISOString()}`,
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer <jwt token here>`, // must be a valid Auth0 JWT
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    "status is 201": (r) => r.status === 201,
    "response has post": (r) => r.json("data.post") !== undefined,
  });

  sleep(1); // wait to simulate user pacing
}
