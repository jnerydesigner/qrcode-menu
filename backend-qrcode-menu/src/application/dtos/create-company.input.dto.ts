import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyInputDto {
  @ApiProperty({ example: 'Minha Empresa' })
  name: string;

  @ApiProperty({ example: '00.000.000/0000-00' })
  cnpj: string;
}
