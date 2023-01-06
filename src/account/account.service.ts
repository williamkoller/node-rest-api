import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountRepository } from './repositories/account.repository';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}
  create(createAccountDto: CreateAccountDto) {
    const id = randomUUID();
    return this.accountRepository.create(id, createAccountDto);
  }

  findAll() {
    return this.accountRepository.find();
  }
}
