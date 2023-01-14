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
  private salt = randomBytes(16).toString('hex');
  constructor(private readonly accountRepo: AccountRepositoryInterface) {}

  async add(input: AccountInput): Promise<AccountOutput> {
    const account = Account.create({
      ...input,
      password: pbkdf2Sync(
        input.password,
        this.salt,
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

  async updateOne(id: string, input: AccountInput): Promise<AccountOutput> {
    const account = await this.accountRepo.findById(id);
    const updateAccount = Account.create(account);
    updateAccount.updateFullName(updateAccount, input.fullName);
    updateAccount.updateAge(updateAccount, input.age);
    updateAccount.updateEmail(updateAccount, input.email);

    updateAccount.updatePassword(
      updateAccount,
      pbkdf2Sync(
        input.password,
        this.salt,
        this.interations,
        this.length,
        'sha512',
      ).toString('hex'),
    );

    return {
      id: account.id,
      fullName: updateAccount.fullName,
      age: updateAccount.age,
      email: updateAccount.email,
      password: updateAccount.password,
    };
  }

  async deleteOne(id: string): Promise<void> {
    await this.accountRepo.delete(id);
  }
}
