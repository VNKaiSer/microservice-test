import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import {
  Chat,
  ChatCreateDto,
  ChatServiceController,
  ChatServiceControllerMethods,
  Chats,
  Empty,
  FindOneChatDto,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller('chat')
@ChatServiceControllerMethods()
export class ChatController implements ChatServiceController {
  constructor(private readonly chatService: ChatService) {}
  createChat(request: ChatCreateDto): Chat | Observable<Chat> | Promise<Chat> {
    return this.chatService.createChat(
      request,
      request.receiveId,
      request.senderId,
    );
  }
  getAllChats(request: Empty): Chats | Observable<Chats> | Promise<Chats> {
    return this.chatService.getAllChat();
  }
  getChatById(
    request: FindOneChatDto,
  ): Chat | Observable<Chat> | Promise<Chat> {
    return this.chatService.getChatById(request.chatId);
  }
}
