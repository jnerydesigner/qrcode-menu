import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '@application/services/auth.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '@application/dtos/auth/login.dto';
import { RegisterDto } from '@application/dtos/auth/register.dto';
import { ForgotPasswordDto } from '@application/dtos/auth/forgot-password.dto';
import { ResetPasswordDto } from '@application/dtos/auth/reset-password.dto';
import { JwtAuthGuard } from '@infra/guard/jwt-auth.guard';
import { User } from '@infra/decorators/user.decorator';
import { IsPublic } from '@infra/decorators/is-public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('login')
    @IsPublic()
    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: 200, description: 'User logged in successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async login(@Body() data: LoginDto) {
        console.log(data)
        return this.authService.login(data.email, data.password);
    }

    @Post('register')
    @ApiOperation({ summary: 'Register new user' })
    @ApiResponse({ status: 201, description: 'User registered successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async register(@Body() data: RegisterDto) {
        return this.authService.validateUser(data.email, data.password);
    }

    @Get('profile')
    @ApiOperation({ summary: 'Get user profile' })
    @ApiResponse({ status: 200, description: 'User profile retrieved successfully.' })
    @UseGuards(JwtAuthGuard)
    async profile(@User() user) {
        return user;
    }

    @Post('logout')
    @ApiOperation({ summary: 'Logout user' })
    @ApiResponse({ status: 200, description: 'User logged out successfully.' })
    async logout() {
        return 'logout';
    }

    @Post('refresh')
    @ApiOperation({ summary: 'Refresh token' })
    @ApiResponse({ status: 200, description: 'Token refreshed successfully.' })
    async refresh() {
        return 'refresh';
    }

    @Post('forgot')
    @ApiOperation({ summary: 'Forgot password' })
    @ApiResponse({ status: 200, description: 'Password reset email sent.' })
    async forgot(@Body() data: ForgotPasswordDto) {
        return 'forgot';
    }

    @Post('reset')
    @ApiOperation({ summary: 'Reset password' })
    @ApiResponse({ status: 200, description: 'Password reset successfully.' })
    async reset(@Body() data: ResetPasswordDto) {
        return 'reset';
    }
}
