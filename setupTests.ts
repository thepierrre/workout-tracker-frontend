import "@testing-library/jest-dom";
import "cross-fetch/polyfill";
import { TextEncoder } from "util";
import { server } from "./src/mockData/node";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Object.assign(global, { TextDecoder, TextEncoder });

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
