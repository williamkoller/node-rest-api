import { Account } from '@app/domain/entities/account/account.entity';
import { AccountDbInMemoryRepository } from '@app/infra/db/inmemory/account/account-dbinmemory.repository';
import { AccountProps } from '@app/shared/types/account/account-props.type';
import { hashSync } from 'bcrypt';
import { AccountUseCase } from './account.usecase';

describe('AccountUseCase Test', () => {
  it('should be create a new account', async () => {
    const repository = new AccountDbInMemoryRepository();
    const accountUseCase = new AccountUseCase(repository);
    const output = await accountUseCase.add({
      fullName: 'any_name',
      age: 33,
      email: 'any_email@mail.com',
      password: hashSync('q1w2e3r4t5', 12),
    });
    expect(repository.accounts).toHaveLength(1);
    expect(output).toStrictEqual({
      id: repository.accounts[0].id,
      fullName: 'any_name',
      age: 33,
      email: 'any_email@mail.com',
      password: output.password,
    });
  });

  it('should be find all accounts', async () => {
    const repository = new AccountDbInMemoryRepository();
    const accountUseCase = new AccountUseCase(repository);
    const output = await accountUseCase.find();
    expect(repository.accounts).toHaveLength(0);
    expect(output).toBeDefined();
  });

  it('should be findOne an account', async () => {
    const repository = new AccountDbInMemoryRepository();
    const accountUseCase = new AccountUseCase(repository);

    await repository.findById('ac37fac8-65e8-45a0-9923-cd9985e9148b');

    await accountUseCase.findOne('ac37fac8-65e8-45a0-9923-cd9985e9148b');
    expect(repository.accounts).toHaveLength(0);
    expect(repository.findById).toHaveLength(1);
    expect(accountUseCase.findOne).toHaveLength(1);
  });

  it('should be update an account', async () => {
    const repository = new AccountDbInMemoryRepository();
    const accountUseCase = new AccountUseCase(repository);

    await repository.findById('ac37fac8-65e8-45a0-9923-cd9985e9148b');

    let accountProps: AccountProps = {
      fullName: 'any_name',
      age: 20,
      email: 'any_email@mail.com',
      password: hashSync('q1w2e3r4t5', 12),
    };
    const account = Account.create({
      ...accountProps,
      password: accountProps.password,
    });

    const responseUpdate = await accountUseCase.updateOne(
      'ac37fac8-65e8-45a0-9923-cd9985e9148b',
      account,
    );

    expect(repository.update).toHaveLength(2);
    expect(accountUseCase.updateOne).toHaveLength(2);
    expect(repository.accounts).toHaveLength(0);
    expect(responseUpdate).toEqual({
      id: responseUpdate.id,
      fullName: 'any_name',
      age: 20,
      email: 'any_email@mail.com',
      password: responseUpdate.password,
    });
  });

  it('should be delete an account', async () => {
    const repository = new AccountDbInMemoryRepository();
    const accountUseCase = new AccountUseCase(repository);

    await repository.delete('ac37fac8-65e8-45a0-9923-cd9985e9148b');

    await accountUseCase.deleteOne('ac37fac8-65e8-45a0-9923-cd9985e9148b');
    expect(repository.accounts).toHaveLength(0);
    expect(repository.delete).toHaveLength(1);
    expect(accountUseCase.deleteOne).toHaveLength(1);
  });
});
