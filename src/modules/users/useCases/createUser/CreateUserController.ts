/* eslint-disable prettier/prettier */
import { Response, Request } from "express";

import { CreateUserUseCase, IRequest } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, email }: IRequest = request.body;

    try{
      const results = this.createUserUseCase.execute({ email, name });
      return response.status(201).json(results)
    }catch(err){
      return response.status(400).json({error: err.message});
    }
  }
}

export { CreateUserController };
