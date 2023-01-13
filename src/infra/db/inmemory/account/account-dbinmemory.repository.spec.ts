import { Account } from '@app/domain/entities/account/account.entity';
import { AccountProps } from '@app/shared/types/account/account-props.type';
import { AccountDbInMemoryRepository } from './account-dbinmemory.repository';

describe('AccountInMemoryRepository Test', () => {
  it('should be insert a new account', async () => {
    const repository = new AccountDbInMemoryRepository();
    let accountProps: AccountProps = {
      fullName: 'any_name',
      age: 20,
      email: 'any_email@mail.com',
      password: 'any_password',
    };
    const account = Account.create(accountProps);
    await repository.insert(account);
    expect(repository.accounts).toHaveLength(1);
    expect(repository.accounts).toStrictEqual([account]);
  });

  it('should be find all accounts', async () => {
    const repository = new AccountDbInMemoryRepository();
    let accountProps: AccountProps = {
      fullName: 'any_name',
      age: 20,
      email: 'any_email@mail.com',
      password: 'any_password',
    };
    const account = Account.create(accountProps);
    await repository.insert(account);
    await repository.find();
    expect(repository.accounts).toHaveLength(1);
    expect(repository.accounts).toStrictEqual([account]);
  });
});
