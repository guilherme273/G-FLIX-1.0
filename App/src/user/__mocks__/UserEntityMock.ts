import { UserEntity } from '../entities/user.entity';

export const userEntityMock = (
  overrides?: Partial<UserEntity>,
): UserEntity => ({
  id: 1,
  name: 'Guilherme',
  email: 'guilherme@gmail.com',
  password: 'senha',
  type: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  reactions: [],
  favorites: [],
  views: [],
  ...overrides,
});
