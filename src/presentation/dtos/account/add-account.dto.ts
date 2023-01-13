import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddAccountDto {
  @ApiProperty({
    description: 'Account fullName',
    example: 'Will Koller',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'Account age',
    example: 33,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty({
    description: 'Account email',
    example: 'mail@email.com',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Account password',
    example: 'YourPassword',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
