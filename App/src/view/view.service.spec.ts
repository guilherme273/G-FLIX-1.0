// import { Test, TestingModule } from '@nestjs/testing';
// import { ViewService } from './view.service';
// import { Repository } from 'typeorm';
// import { ViewEntity } from './entities/view.entity';
// import { getRepositoryToken } from '@nestjs/typeorm';

// describe('ViewService', () => {
//   let service: ViewService;
//   let viewRepository: Repository<ViewEntity>;
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         ViewService,
//         { provide: getRepositoryToken(ViewEntity), viewValue: {} },
//       ],
//     }).compile();

//     service = module.get<ViewService>(ViewService);
//     viewRepository = module.get<Repository<ViewEntity>>(
//       getRepositoryToken(ViewEntity),
//     );
//   });
//   it('should be running', () => {
//     expect(true).toBe(true);
//   });
// });
