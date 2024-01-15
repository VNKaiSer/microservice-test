/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import slugify from 'slugify';
import { UserService } from './user.service';
import { CustomValidationPipe, Token, UpdateUserDto } from '@app/common';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UsePipes(new CustomValidationPipe())
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const sanitizedFilename = slugify(file.originalname, {
            lower: true, // convert to lower case, defaults to `false`
            strict: true, // strip special characters except replacement, defaults to `false`
          });
          callback(null, sanitizedFilename);
        },
      }),
    }),
  )
  async createUsers(@Body() userCreateDto: any): Promise<any> {
    // const fileUpload: FileCreateDto = {
    //   ...file,
    //   path: file.path.replace('\\', '/'),
    // };
    return this.userService.create({
      ...userCreateDto,
      // avatar: fileUpload.path,
    });
  }

  @Post('login')
  @UsePipes(new CustomValidationPipe())
  async login(
    @Body() userLoginDto: any,
    // @Req() request: Request,
  ): Promise<any> {
    const user = await this.userService.findOne(userLoginDto);

    return {
      success: true,
      message: 'Login success',
      errors: null,
      data: user,
    };
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<any> {
    const data = await this.userService.findOne(id);
    return {
      success: true,
      message: 'Get user success',
      errors: null,
      data: data,
    };
  }
  @Get()
  async getAllUser(): Promise<any> {
    const data = await this.userService.findAll();

    return {
      success: true,
      message: 'Get all user success',
      errors: null,
      data: data,
    };
    // return data;
  }

  // @UseGuards(AuthGuard)
  @Put('update')
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization: Token jwt.token.here',
  })
  @UsePipes(new CustomValidationPipe())
  async updateCurrentUser(
    @Headers('Authorization') auth: Token,
    @Body('user') userUpdateDto: UpdateUserDto,
  ): Promise<any> {
    return this.userService.update(auth, userUpdateDto);
  }
}
