import { UpdateAccountDto } from './update-account.dto';

describe('UpdateAccountDto', () => {
  it('should be update account dto with correct params', () => {
    const updateAccountDto = new UpdateAccountDto();
    updateAccountDto.fullName = 'any_full_name';
    updateAccountDto.age = 30;
    updateAccountDto.email = 'mail@email.com';
    updateAccountDto.password = '!1q2w3dssd';
    expect(updateAccountDto.fullName).toBe('any_full_name');
    expect(updateAccountDto.age).toBe(30);
    expect(updateAccountDto.email).toBe('mail@email.com');
    expect(updateAccountDto.password).toBe('!1q2w3dssd');
  });
});
