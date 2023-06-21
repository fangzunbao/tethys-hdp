import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserOtherAccountDto {
  @ApiProperty({ description: '主键Id' })
  id: string;

  @ApiProperty({ description: '账号名' })
  @IsNotEmpty({ message: '账号名必填' })
  readonly label: string;

  @ApiProperty({ description: '账号地址' })
  @IsNotEmpty({ message: '账号地址必填' })
  readonly value: string;

  

}
