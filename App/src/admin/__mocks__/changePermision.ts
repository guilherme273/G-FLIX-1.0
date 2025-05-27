import { userEntityMock } from '../../user/__mocks__/UserEntityMock';
import { ChangePermissionDto } from '../dto/update-admin.dto';

export const changePermisionDtoMock: ChangePermissionDto = {
  id_user: 1,
  type: '1',
};

export const UserEntytyWithEmailSuperAdmin = userEntityMock({
  email: process.env.ADMIN_EMAIL,
});
