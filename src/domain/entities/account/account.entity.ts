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

  updateFullName(props: AccountProps, fullName: string): Account {
    this.fullName = fullName;
    return new Account({ ...props, fullName: this.fullName });
  }

  get fullName() {
    return this.props.fullName;
  }

  private set fullName(value: string) {
    this.props.fullName = value;
  }

  updateAge(props: AccountProps, age: number): Account {
    this.age = age;
    return new Account({ ...props, age: this.age });
  }

  get age() {
    return this.props.age;
  }

  private set age(value: number) {
    this.props.age = value;
  }

  updateEmail(props: AccountProps, email: string): Account {
    this.email = email;
    return new Account({ ...props, email: this.email });
  }

  get email() {
    return this.props.email;
  }

  private set email(value: string) {
    this.props.email = value;
  }

  updatePassword(props: AccountProps, password: string): Account {
    this.password = password;
    return new Account({ ...props, password: this.password });
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
