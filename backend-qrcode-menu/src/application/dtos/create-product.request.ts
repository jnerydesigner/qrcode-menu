import { ApiProperty } from '@nestjs/swagger';

export class CreateProductRequest {
  @ApiProperty({ example: 'Hambúrguer Artesanal' })
  name: string;

  @ApiProperty({ example: 'Pão brioche, carne 150g, queijo cheddar' })
  description: string;

  @ApiProperty({ example: 29.9 })
  price: number;

  @ApiProperty({
    example: 'https://meu-site/imagens/hamburguer.png',
    required: false,
  })
  image?: string;

  @ApiProperty({ example: '67970c156993b64dba0d626c' })
  categoryId: string;

  @ApiProperty({ example: '67970c156993b64dba0d626c' })
  company: string;
}
