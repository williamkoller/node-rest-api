import { AccountRepositoryInterface } from '@app/data/protocols/db/account/account-repository.interface';
import { Account } from '@app/domain/entities/account/account.entity';
import {
  AccountInput,
  AccountOutput,
} from '@app/shared/types/account/account.type';
import { pbkdf2Sync, randomBytes } from 'crypto';

export class AccountUseCase {
  private interations = 1000;
  private length = 64;
  constructor(private readonly accountRepo: AccountRepositoryInterface) {}

  async add(input: AccountInput): Promise<AccountOutput> {
    const salt = randomBytes(16).toString('hex');
    const account = Account.create({
      ...input,
      password: pbkdf2Sync(
        input.password,
        salt,
        this.interations,
        this.length,
        'sha512',
      ).toString('hex'),
    });
    await this.accountRepo.insert(account);
    return account.toJSON();
  }

  async find(): Promise<AccountOutput[]> {
    return await this.accountRepo.find();
  }

  async findOne(id: string): Promise<AccountOutput> {
    return await this.accountRepo.findById(id);
  }
}
