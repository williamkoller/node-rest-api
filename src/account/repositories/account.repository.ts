import { ConflictException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { Account } from '../entities/account.entity';
import { accounts } from './fixtures/account';

export class AccountRepository {
  private accounts = accounts;

  create(data: CreateAccountDto): Account {
    const id = randomUUID();
    const { fullName, age, email, password } = data;
    const newAccount = new Account(id, fullName, age, email, password);
    const accountExists = this.accounts.find(
      (account) => email === account.email,
    );
    if (accountExists) {
      throw new ConflictException(
        'There is already an account with that email',
      );
    }
    this.accounts.push(newAccount);
    return newAccount;
  }

  find(): Account[] {
    return this.accounts;
  }

  findOneById(id: string): Account {
    const account = this.accounts.find((account) => account.id === id);

    if (!account) {
      throw new NotFoundException('Account not found.');
    }

    return account;
  }

  update(id: string, data: UpdateAccountDto): Account {
    const { fullName, age, email, password } = data;
    const updatedAccount = new Account(id, fullName, age, email, password);
    this.accounts = this.accounts.filter((account) => id !== account.id);
    this.accounts.push(updatedAccount);
    return updatedAccount;
  }

  delete(id: string): void {
    this.accounts = this.accounts.filter((account) => id !== account.id);
  }
}
