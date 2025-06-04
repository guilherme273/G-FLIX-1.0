import { categorymock } from '../../category/__mocks__/categoryFindall';

export const createCategory = {
  categoryCreated: categorymock,
  msg: {
    type: 'success',
    content: `Categoria: ${categorymock.name} cadastrada com sucesso!`,
  },
};
