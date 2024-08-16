import { HttpResponse, http } from "msw";

export const userSettings = {
  id: "ed8af7bb-5ad2-46d1-a67d-d1c954c76405",
  username: "testUser",
  changeThreshold: 1.0,
  weightUnit: "kgs",
};

export const userSettingsHandler = [
  http.get("http://localhost:8080/api/users/user-settings", () => {
    return HttpResponse.json(userSettings);
  }),
];
