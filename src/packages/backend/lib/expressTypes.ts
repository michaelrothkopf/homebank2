import { Request as _Request, Response as _Response } from "express";

export interface Request extends _Request {
    body?: any,
    cookies?: any,
}

export interface Response extends _Response {}