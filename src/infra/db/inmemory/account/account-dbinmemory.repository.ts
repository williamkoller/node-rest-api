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

  async update(id: string, input: Account): Promise<Account> {
    this.accounts = this.accounts.filter((account) => id !== account.id);
    this.accounts.push(input);
    return this.accounts.find((account) => account.id === id);
  }

  async delete(id: string): Promise<void> {
    this.accounts = this.accounts.filter((account) => id !== account.id);
  }
}
