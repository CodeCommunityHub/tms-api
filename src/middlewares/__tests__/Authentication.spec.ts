import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomRequest, jwtMiddleware } from "../Authentication";

// Mocking JWT module
jest.mock("jsonwebtoken");

describe("jwtMiddleware", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any as Response;
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 if no token provided", () => {
    req.headers = {};
    jwtMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "No token provided",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if token is invalid", () => {
    req.headers = { "x-access-token": "invalidToken" };
    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(new Error("Invalid token"));
    });

    jwtMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid token",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next if token is valid", () => {
    const decodedToken = { userId: 123 };
    req.headers = { "x-access-token": "validToken" };
    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(null, decodedToken);
    });

    jwtMiddleware(req, res, next);

    expect((req as CustomRequest).decoded).toEqual(decodedToken);
    expect(next).toHaveBeenCalled();
  });
});
