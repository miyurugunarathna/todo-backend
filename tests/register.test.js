import { register } from "../controllers/User.controller.js";
import User from "../models/User.model.js";

const mockRequest = (body) => ({
  body,
})

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe("Test register tast", () => {
  test("01. User must successfully registered when given email does not exist on the system.", async () => {
    const mockCreateSuccess = {
      _id: "627f8298eacbbf6956a92509",
      name: "Miyuru",
      email: "yakek@gmail.com",
      password: "$2b$10$0/ADN.uLWyWUKdcOm7j.Vur46vGjUHyRUdKErE90V8M1WwsFZq2T6"
    }

    jest.spyOn(User, "findOne").mockReturnValue(Promise.resolve(null));
    jest.spyOn(User, "create").mockReturnValue(Promise.resolve(mockCreateSuccess));

    const req = mockRequest({
      name: "Miyuru",
      email: "yakek@gmail.com",
      password: "12345"
    })
    const res = mockResponse();
    await register(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(mockCreateSuccess);
  });

  test("02. User must get error massage called 'User already exists' when given email already exist on the system.", async () => {
    const existUser = {
      _id: "627f8298eacbbf6956a92509",
      name: "Miyuru",
      email: "miyuru@gmail.com",
      password: "$2b$10$0/ADN.uLWyWUKdcOm7j.Vur46vGjUHyRUdKErE90V8M1WwsFZq2T6"
    }

    jest.spyOn(User, "findOne").mockReturnValue(Promise.resolve(existUser));

    const req = mockRequest({
      name: "Miyuru",
      email: "miyuru@gmail.com",
      password: "12345"
    })
    const res = mockResponse();
    await register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("User already exists");
  });

  test("03. User must get error massage called 'Internal server error' when something happens on dependent server.", async () => {
    const error = new Error("Internal server error");

    jest.spyOn(User, "findOne").mockImplementation(() => {
      throw error;
    });

    const req = mockRequest({
      name: "Miyuru",
      email: "hello@gmail.com",
      password: "12345"
    })
    const res = mockResponse();
    await register(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(error);
  });
})