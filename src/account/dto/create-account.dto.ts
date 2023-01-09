import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({
    description: 'Account name',
    example: 'Will',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Account surname',
    example: 'Koller',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  surname: string;

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
