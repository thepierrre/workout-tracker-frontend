import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";
import { server } from "./src/mocks/node.ts";

// @ts-ignore
global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
