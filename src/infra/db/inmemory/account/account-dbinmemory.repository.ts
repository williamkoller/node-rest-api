import { AccountRepositoryInterface } from '@app/data/protocols/db/account/account-repository.interface';
import { Account } from '@app/domain/entities/account/account.entity';

export class AccountDbInMemoryRepository implements AccountRepositoryInterface {
  accounts: Account[] = [];

  async insert(input: Account): Promise<void> {
    this.accounts.push(input);
  }

  async find(): Promise<Account[]> {
    return this.accounts;
  }

  async findById(id: string): Promise<Account> {
    return this.accounts.find((account) => account.id === id);
  }
}
