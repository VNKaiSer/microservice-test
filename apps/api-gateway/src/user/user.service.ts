import {
  CreateUserDto,
  USERS_SERVICE_NAME,
  UpdateUserDto,
  UsersServiceClient,
} from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AUTH_SERVICE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: UsersServiceClient;
  constructor(@Inject(AUTH_SERVICE) private readonly client: ClientGrpc) {}
  onModuleInit() {
    this.userService =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }
  create(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  findAll() {
    return this.userService.findAllUsers({});
  }

  findOne(id: string) {
    return this.userService.findOneUser({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userService.updateUser({ id, ...updateUserDto });
  }

  remove(id: string) {
    return this.userService.removeUser({ id });
  }
}
