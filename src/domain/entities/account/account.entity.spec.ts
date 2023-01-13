import { Account } from '@app/domain/entities/account/account.entity';
import { AccountProps } from '@app/shared/types/account/account-props.type';

describe('Account Test', () => {
  it('should be constructor()', () => {
    let accountProps: AccountProps = {
      fullName: 'any_name',
      age: 20,
      email: 'any_email@mail.com',
      password: 'any_password',
    };
    let account = Account.create(accountProps);
    expect(account.props).toStrictEqual({
      ...accountProps,
    });

    accountProps = {
      fullName: 'any_name',
      age: 20,
      email: 'any_email@mail.com',
      password: 'any_password',
    };
    expect(account.id).toBeDefined();
    account = Account.create(accountProps);
    expect(account.props).toStrictEqual({
      ...accountProps,
    });
  });

  it('should be updateName method', () => {
    let accountProps: AccountProps = {
      fullName: 'any_name',
      age: 20,
      email: 'any_email@mail.com',
      password: 'any_password',
    };
    let account = Account.create(accountProps);
    account.updateFullName('any_is_name');
    expect(account.fullName).toBe('any_is_name');
  });

  it('should be updateSurname method', () => {
    let accountProps: AccountProps = {
      fullName: 'any_name',
      age: 20,
      email: 'any_email@mail.com',
      password: 'any_password',
    };
    let account = Account.create(accountProps);
    account.updateAge(22);
    expect(account.age).toBe(22);
  });

  it('should be updateEmail method', () => {
    let accountProps: AccountProps = {
      fullName: 'any_name',
      age: 20,
      email: 'any_email@mail.com',
      password: 'any_password',
    };
    let account = Account.create(accountProps);
    account.updateEmail('any_email_updated@mail.com');
    expect(account.email).toBe('any_email_updated@mail.com');
  });

  it('should be updatePassword method', () => {
    let accountProps: AccountProps = {
      fullName: 'any_name',
      age: 20,
      email: 'any_email@mail.com',
      password: 'any_password',
    };
    let account = Account.create(accountProps);
    account.updatePassword('any_password_updated');
    expect(account.password).toBe('any_password_updated');
  });

  it('should be toJSON()', () => {
    let accountProps: AccountProps = {
      fullName: 'any_name',
      age: 20,
      email: 'any_email@mail.com',
      password: 'any_password',
    };
    let account = Account.create(accountProps);
    account.toJSON();
    expect(account.toJSON()).toStrictEqual({
      id: account.id,
      fullName: 'any_name',
      age: 20,
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });
});
