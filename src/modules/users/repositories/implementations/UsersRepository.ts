import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const newUser = new User();

    Object.assign(newUser, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(newUser);

    return newUser;
  }

  findById(id: string): User | undefined {
    const searchId = this.users.find((user) => user.id === id);
    return searchId;
  }

  findByEmail(email: string): User | undefined {
    const searchEmal = this.users.find((user) => user.email === email);
    return searchEmal;
  }

  turnAdmin(receivedUser: User): User {
    const takeUserInDb = this.users.find((user) => user.id === receivedUser.id);
    if (!takeUserInDb) {
      throw new Error("Messagem do erro");
    }
    takeUserInDb.admin = true;
    takeUserInDb.updated_at = new Date();

    return takeUserInDb;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
