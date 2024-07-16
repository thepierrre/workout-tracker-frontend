import "@testing-library/jest-dom";
import "cross-fetch/polyfill";
import { TextEncoder, TextDecoder } from "util";
import { server } from "./src/mockData/node";

// @ts-ignore
global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
