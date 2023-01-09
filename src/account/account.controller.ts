import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('accounts')
@ApiTags('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Create an account',
  })
  @ApiConflictResponse({
    description: 'There is already an account with that email.',
  })
  @ApiOperation({
    summary: 'Create an account.',
  })
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Find all accounts.',
  })
  @ApiOperation({
    summary: 'Find all accounts.',
  })
  findAll() {
    return this.accountService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Find an account by id.',
  })
  @ApiOperation({
    summary: 'Find an account by id.',
  })
  findById(@Param('id') id: string) {
    return this.accountService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Update an account.',
  })
  @ApiOperation({
    summary: 'Update an account.',
  })
  update(@Param('id') id: string, @Body() data: UpdateAccountDto) {
    return this.accountService.updateOne(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Delete an account.',
  })
  @ApiOperation({
    summary: 'Delete an account.',
  })
  delete(@Param('id') id: string) {
    this.accountService.deleteOne(id);
  }
}
