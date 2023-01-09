import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountRepository } from './repositories/account.repository';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}
  create(createAccountDto: CreateAccountDto) {
    return this.accountRepository.create(createAccountDto);
  }

  findAll() {
    return this.accountRepository.find();
  }

  findOne(id: string) {
    return this.accountRepository.findOneById(id);
  }

  updateOne(id: string, data: UpdateAccountDto) {
    return this.accountRepository.update(id, data);
  }

  deleteOne(id: string) {
    this.accountRepository.delete(id);
  }
}
