import { AccountRepositoryInterface } from '@app/data/protocols/db/account/account-repository.interface';
import { AccountController } from '@app/presentation/controllers/account/account.controller';
import { AccountUseCase } from '@app/usecases/account/account.usecase';
import { Module } from '@nestjs/common';
import { AccountDbInMemoryRepository } from '../db/inmemory/account/account-dbinmemory.repository';

@Module({
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
  controllers: [AccountController],
})
export class AccountModule {}
