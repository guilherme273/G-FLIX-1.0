import { ViewService } from '../view.service';
import { viewEntityMock } from './viewEntityMock';

export const ViewServiceMock = {
  provide: ViewService,
  useValue: { create: jest.fn().mockResolvedValue({}) },
};
