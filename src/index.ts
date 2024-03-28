import * as http from "http";
import app from "./App";
import { appEnv } from "./config/env";

const server = http.createServer(app);

const PORT = appEnv.general.PORT || 3000;

server.listen(PORT, (): void => {
  console.log(`Connected successfully on port ${PORT}`);
});
