import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const alreadyExist = this.usersRepository.findByEmail(email);

    if (alreadyExist) {
      throw new Error("Mensagem do erro");
    }

    const userExist = this.usersRepository.create({ email, name });

    return userExist;
  }
}

export { CreateUserUseCase };
