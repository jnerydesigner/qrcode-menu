import { UsersService } from '@application/services/users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '@presenters/controllers/users/users.controller';


describe('UsersController', () => {
  let controller: UsersController;
  let usersService: jest.Mocked<UsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const user = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password',
      role: 'user',
    };

    usersService.create.mockResolvedValue(user);

    const result = await controller.create(user);

    expect(result).toEqual(user);
    expect(usersService.create).toHaveBeenCalledWith(user);
  });
});
