import { Response } from "express";
import { HttpCode } from "../types/http.enum";

export class HttpResponse {
  Ok(res: Response, data: any): Response {
    return res.status(HttpCode.OK).json({
      status: HttpCode.OK,
      message: "Success",
      data,
    });
  }

  Created(res: Response, data: any): Response {
    return res.status(HttpCode.CREATED).json({
      status: HttpCode.CREATED,
      message: "Created",
      data,
    });
  }

  BadRequest(res: Response, error: any): Response {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: HttpCode.BAD_REQUEST,
      message: "Bad Requst",
      error,
    });
  }
}
