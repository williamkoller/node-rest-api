import { randomUUID } from 'crypto';
import { AccountProps } from '@app/shared/types/account/account-props.type';

export class Account {
  public readonly id: string;
  public props: Required<AccountProps>;
  private constructor(props: AccountProps, id?: string) {
    this.id = id || randomUUID();
    this.props = {
      ...props,
    };
  }

  static create(props: AccountProps, id?: string): Account {
    return new Account(props, id);
  }

  updateFullName(fullName: string) {
    this.fullName = fullName;
  }

  get fullName() {
    return this.props.fullName;
  }

  private set fullName(value: string) {
    this.props.fullName = value;
  }

  updateAge(age: number) {
    this.age = age;
  }

  get age() {
    return this.props.age;
  }

  private set age(value: number) {
    this.props.age = value;
  }

  updateEmail(email: string) {
    this.email = email;
  }

  get email() {
    return this.props.email;
  }

  private set email(value: string) {
    this.props.email = value;
  }

  updatePassword(password: string) {
    this.password = password;
  }

  get password() {
    return this.props.password;
  }

  private set password(value: string) {
    this.props.password = value;
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
