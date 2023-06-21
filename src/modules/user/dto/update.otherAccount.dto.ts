import { PartialType } from '@nestjs/swagger';
import { CreateUserOtherAccountDto } from './create.otherAccount.dto';

export class UpdateUserOtherAccountDto extends PartialType(
  CreateUserOtherAccountDto,
) {}
