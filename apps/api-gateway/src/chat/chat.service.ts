import {
  CHAT_SERVICE_NAME,
  Chat,
  ChatCreateDto,
  ChatServiceClient,
  FindOneChatDto,
} from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CHAT_SERVICE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class ChatService implements OnModuleInit {
  private userService: ChatServiceClient;
  constructor(@Inject(CHAT_SERVICE) private readonly client: ClientGrpc) {}
  onModuleInit() {
    this.userService =
      this.client.getService<ChatServiceClient>(CHAT_SERVICE_NAME);
  }

  async createChat(chatCreateDto: ChatCreateDto): Promise<Chat | any> {
    return this.userService.createChat(chatCreateDto);
  }

  async getChatById(chatId: FindOneChatDto): Promise<Chat | any> {
    return this.userService.getChatById(chatId);
  }

  async getAllChat(): Promise<Chat[] | any> {
    return this.userService.getAllChats({});
  }
}
