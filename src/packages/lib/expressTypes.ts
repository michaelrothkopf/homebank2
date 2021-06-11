import { Application as _Application, Request as _Request, Response as _Response } from "express";

export interface Application extends _Application {}

export interface Request extends _Request {
    body?: any,
    cookies?: any,
}

export interface Response extends _Response {}