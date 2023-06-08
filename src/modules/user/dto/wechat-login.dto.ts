import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class WechatLoginDTO {
  @ApiProperty({ description: 'iv' })
  readonly iv: string;

  @ApiProperty({ description: 'encryptedData' })
  readonly encryptedData: string;

  @ApiProperty({ description: 'code' })
  @IsNotEmpty({ message: 'code不能为空' })
  readonly code: string;
}

