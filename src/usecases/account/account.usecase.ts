import { AccountRepositoryInterface } from '@app/data/protocols/db/account/account-repository.interface';
import { Account } from '@app/domain/entities/account/account.entity';
import {
  AccountInput,
  AccountOutput,
} from '@app/shared/types/account/account.type';
import { hashSync } from 'bcrypt';

export class AccountUseCase {
  constructor(private readonly accountRepo: AccountRepositoryInterface) {}

  async add(input: AccountInput): Promise<AccountOutput> {
    const account = Account.create({
      ...input,
      password: hashSync(input.password, 12),
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

    updateAccount.updatePassword(updateAccount, hashSync(input.password, 12));

    return {
      id: updateAccount.id,
      fullName: updateAccount.fullName,
      age: updateAccount.age,
      email: updateAccount.email,
      password: updateAccount.password,
    };
  }

  async deleteOne(id: string): Promise<void> {
    this.accountRepo.delete(id);
  }
}
