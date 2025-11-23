import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
    @ApiProperty({ example: 'token123', description: 'The reset token' })
    token: string;

    @ApiProperty({ example: 'newPassword123', description: 'The new password' })
    newPassword: string;
}
