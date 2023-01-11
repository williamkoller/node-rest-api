import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountRepository } from './repositories/account.repository';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}
  create(createAccountDto: CreateAccountDto) {
    const account = this.accountRepository.find();

    const accountExists = account.find(
      (a) => a.email === createAccountDto.email,
    );

    if (accountExists) {
      throw new ConflictException(
        'There is already an account with that email.',
      );
    }

    return this.accountRepository.create(createAccountDto);
  }

  findAll() {
    const accounts = this.accountRepository.find();

    if (!accounts) {
      throw new NotFoundException('No record found.');
    }

    return accounts;
  }

  findOne(id: string) {
    const account = this.accountRepository.findOneById(id);

    if (!account) {
      throw new NotFoundException('Account not found.');
    }

    return account;
  }

  updateOne(id: string, data: UpdateAccountDto) {
    const account = this.findOne(id);
    return this.accountRepository.update(account.id, data);
  }

  deleteOne(id: string) {
    const account = this.findOne(id);
    this.accountRepository.delete(account.id);
  }
}
