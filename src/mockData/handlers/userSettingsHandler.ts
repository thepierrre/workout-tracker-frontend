import { rest } from "msw";

export const userSettings = {
  id: "ed8af7bb-5ad2-46d1-a67d-d1c954c76405",
  username: "testUser",
  changeThreshold: 1.0,
  weightUnit: "kgs",
};

export const getUserSettingsHandler = [
  rest.get("http://localhost:8080/api/users/user-settings", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(userSettings));
  }),
];
