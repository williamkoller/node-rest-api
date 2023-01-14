import { AddAccountDto } from './add-account.dto';

describe('AddAccountDto', () => {
  it('should be add account dto with correct params', () => {
    const addAccountDto = new AddAccountDto();
    addAccountDto.fullName = 'any_full_name';
    addAccountDto.age = 30;
    addAccountDto.email = 'mail@email.com';
    addAccountDto.password = '!1q2w3dssd';
    expect(addAccountDto.fullName).toBe('any_full_name');
    expect(addAccountDto.age).toBe(30);
    expect(addAccountDto.email).toBe('mail@email.com');
    expect(addAccountDto.password).toBe('!1q2w3dssd');
  });
});
