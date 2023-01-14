import { AddAccountDto } from '@app/presentation/dtos/account/add-account.dto';
import { AccountUseCase } from '@app/usecases/account/account.usecase';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('accounts')
@ApiTags('accounts')
export class AccountController {
  constructor(private readonly accountUseCase: AccountUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Create an account',
  })
  @ApiOperation({
    summary: 'Create an account.',
  })
  public async add(@Body() addAccountDto: AddAccountDto) {
    return await this.accountUseCase.add(addAccountDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Find all accounts.',
  })
  @ApiOperation({
    summary: 'Find all accounts.',
  })
  public async find() {
    return await this.accountUseCase.find();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Find an account by id.',
  })
  @ApiOperation({
    summary: 'Find an account by id.',
  })
  public async findOne(@Param('id') id: string) {
    return await this.accountUseCase.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Find an account by id and update.',
  })
  @ApiOperation({
    summary: 'Find an account by id and update.',
  })
  public async update(
    @Param('id') id: string,
    @Body() addAccountDto: AddAccountDto,
  ) {
    return await this.accountUseCase.updateOne(id, addAccountDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({
    description: 'Delete an account by id.',
  })
  @ApiOperation({
    summary: 'Delete an account by id.',
  })
  public async delete(@Param('id') id: string) {
    await this.accountUseCase.deleteOne(id);
  }
}
