export type AccountOutput = {
  id: string;
  fullName: string;
  age: number;
  email: string;
  password: string;
};

export type AccountInput = Omit<AccountOutput, 'id'>;
