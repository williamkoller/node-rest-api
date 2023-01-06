import { CreateAccountDto } from '../dto/create-account.dto';
import { Account } from '../entities/account.entity';
import { accounts } from './fixtures/account';

export class AccountRepository {
  private accounts = accounts;

  create(id: string, data: CreateAccountDto): void {
    const { name, surname, age, email, password } = data;
    const newAccount = new Account(id, name, surname, age, email, password);
    this.accounts.push(newAccount);
  }

  find(): Account[] {
    return this.accounts;
  }
}
