import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import {
  UsersServiceController,
  CreateUserDto,
  UpdateUserDto,
  UsersServiceControllerMethods,
  FindOneUserDto,
  PaginationDto,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@UsersServiceControllerMethods()
export class UserController implements UsersServiceController {
  constructor(private readonly usersService: UserService) {}

  createUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  findAllUsers() {
    return this.usersService.findAll();
  }

  findOneUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.findOne(findOneUserDto.id);
  }

  updateUser(updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  removeUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.remove(findOneUserDto.id);
  }

  queryUsers(paginationDtoStream: Observable<PaginationDto>) {
    return this.usersService.queryUsers(paginationDtoStream);
  }
}
