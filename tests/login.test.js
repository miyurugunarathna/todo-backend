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

import { login } from "../controllers/User.controller.js";
import { connect, disconnect } from "../utils/dbConnect.js";

describe("Post authentivation task", () => {

    jest.setTimeout(30000);
    beforeAll(() => {
        connect();
    });
    afterAll((done) => {
        disconnect(done);
    });

    test("01. User must successfully logged when given username and password are correct", async () => {
        const req = mockRequest({
            email: "miyurupriyawadan@gmail.com",
            password: "12345"
        });
        const res = mockResponse();
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send.mock.calls[0][0].token).not.toBeNull();
    });

    test("02. User must get error massage called 'Incorrect password' when given password is incorrect", async () => {
        const req = mockRequest({
            email: "miyurupriyawadan@gmail.com",
            password: "iamwrong"
        });
        const res = mockResponse();
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send.mock.calls[0]).toContain('Incorrect password');
    });

    test("03. User get error massage called 'User does not exist' when given username is incorrect", async () => {
        const req = mockRequest({
            email: "yayek@gmail.com",
            password: "12345"
        });
        const res = mockResponse();
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send.mock.calls[0]).toContain('User does not exist');
    });
    
    test("04. User should get 500 respone status code when username and password are not given", async () => {
        const req = mockRequest();
        const res = mockResponse();
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
    });
});