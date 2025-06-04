import { userEntityMock } from '../../user/__mocks__/UserEntityMock';

export const getUsersMock = {
  users: [userEntityMock()],
  count: 1,
  userGrowthData: [
    {
      name: 'month',
      value: 1,
    },
  ],
  countAdmin: 1,
};
