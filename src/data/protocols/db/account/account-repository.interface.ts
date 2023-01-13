import { Account } from '@app/domain/entities/account/account.entity';

export interface AccountRepositoryInterface {
  insert(input: Account): Promise<void>;
  find(): Promise<Account[]>;
  findById(id: string): Promise<Account>;
}
