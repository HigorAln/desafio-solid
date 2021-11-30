import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id: id } = request.headers;

    const user_id = id[0];

    const results = this.listAllUsersUseCase.execute({ user_id });

    return response.json(results);
  }
}

export { ListAllUsersController };
