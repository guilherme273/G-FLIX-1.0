import { CreateUserDto } from '../dto/create-user.dto';

export const createUser: CreateUserDto = {
  name: 'Joanildo',
  email: 'joanildopereiraariosvaldodasilva@gmail.com',
  password: 'senhaMediana',
};
export const createUserMock = {
  id: 2,
  name: 'Joanildo',
  email: 'joanildopereiraariosvaldodasilva@gmail.com',
  type: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  reactions: [],
  favorites: [],
  views: [],
};
