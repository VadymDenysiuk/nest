import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { jwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('API')
  @ApiResponse({ status: 201, type: CreateUserDTO })
  @Post('register')
  register(@Body() dto: CreateUserDTO): Promise<AuthUserResponse> {
    return this.authService.registerUsers(dto);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200, type: UserLoginDTO })
  @Post('login')
  login(@Body() dto: UserLoginDTO): Promise<UserLoginDTO> {
    return this.authService.loginUser(dto);
  }

  @UseGuards(jwtAuthGuard)
  @Post('test')
  test(): boolean {
    return true;
  }
}
