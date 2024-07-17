import "cross-fetch/polyfill";
import { beforeAll, afterAll, afterEach } from "vitest";
import { TextEncoder } from "util";
import { server } from "./src/mockData/node";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());
