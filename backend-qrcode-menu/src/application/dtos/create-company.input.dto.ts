import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyInputDto {
  @ApiProperty({ example: 'Minha Empresa' })
  name: string;
}
