import { AccountRepositoryInterface } from '@app/data/protocols/db/account/account-repository.interface';
import { AccountDbInMemoryRepository } from '@app/infra/db/inmemory/account/account-dbinmemory.repository';
import { AddAccountDto } from '@app/presentation/dtos/account/add-account.dto';
import { AccountUseCase } from '@app/usecases/account/account.usecase';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';

describe('AccountController', () => {
  let controller: AccountController;
  let accountUseCase: AccountUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        AccountDbInMemoryRepository,
        {
          provide: AccountUseCase,
          useFactory(accountRepo: AccountRepositoryInterface) {
            return new AccountUseCase(accountRepo);
          },
          inject: [AccountDbInMemoryRepository],
        },
      ],
    }).compile();

    controller = module.get<AccountController>(AccountController);
    accountUseCase = module.get<AccountUseCase>(AccountUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be called AccountUseCase in create account', async () => {
    const addAccountDto = new AddAccountDto();

    addAccountDto.fullName = 'any_full_name';
    addAccountDto.age = 30;
    addAccountDto.email = 'mail@email.com';

    const accountOutput = {
      id: '77ef712d-6755-4845-b72b-ac38018af6f8',
      fullName: 'Will Koll',
      age: 33,
      email: 'williamkoll@mail.com',
      password: '$2b$12$X69qgHUWQxkG7XO5tErecesZJM7OhRK9OcxfG1Qf1/O4khHP1huQu',
    };

    jest.spyOn(accountUseCase, 'add').mockResolvedValue(accountOutput);

    const responseController = await controller.add(addAccountDto);
    expect(responseController).toBe(accountOutput);
    expect(responseController).toBeDefined();
  });
});
