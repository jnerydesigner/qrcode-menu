import { ApiProperty } from '@nestjs/swagger';

export class ingredientIdsRequest {
  @ApiProperty({
    example: '6910c8517042b03fc68ba390',
    description: 'ID do ingrediente a ser associado',
  })
  ingredientId: string;
}

export class UpdateProductIngredientRequest {
  @ApiProperty({ example: 'Hambúrguer Artesanal', required: false })
  name: string;

  @ApiProperty({
    example: 'Pão brioche, carne 150g, queijo cheddar',
    required: false,
  })
  description: string;

  @ApiProperty({ example: 29.9, required: false })
  price: number;

  @ApiProperty({
    example: 'https://meu-site/imagens/hamburguer.png',
    required: false,
  })
  image?: string;

  @ApiProperty({
    description: 'Lista de ingredientes do produto',
    type: [ingredientIdsRequest],
    example: [
      { ingredientId: '6910c8517042b03fc68ba390' },
      { ingredientId: '67970c156993b64dba0d626c' },
    ],
  })
  productIngredient: ingredientIdsRequest[];
}
