import {
  Body,
  Controller,
  Delete,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiTags('API')
  @ApiResponse({ status: 200, type: UpdateUserDTO })
  @UseGuards(JwtAuthGuard)
  @Patch('update')
  updateUser(
    @Body() updateDto: UpdateUserDTO,
    @Req() request,
  ): Promise<UpdateUserDTO> {
    const user = request.user;

    return this.userService.updateUser(user.email, updateDto);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200, type: UpdateUserDTO })
  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  deleteUser(@Req() request): Promise<boolean> {
    const user = request.user;

    return this.userService.deleteUser(user.email);
  }
}
