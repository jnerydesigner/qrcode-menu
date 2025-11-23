import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
    @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
    email: string;
}
