import { PartialType } from '@nestjs/swagger';
import { AddAccountDto } from './add-account.dto';

export class UpdateAccountDto extends PartialType(AddAccountDto) {}
