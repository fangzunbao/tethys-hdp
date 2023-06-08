import { ApiProperty } from '@nestjs/swagger';

export class QueryUserDto {

  @ApiProperty({ description: '当前用户Id' })
  id: string;

  @ApiProperty({ description: '登录名/姓名' })
  keyword: string;

  @ApiProperty({ description: '状态' })
  status: number;

  @ApiProperty({ description: '权限' })
  role: number;

  @ApiProperty({ description: '开始时间' })
  startTime: string;

  @ApiProperty({ description: '结束时间' })
  endTime: string;
}
