import { Body, Controller, Post, UsePipes, Get, Param } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { ChatServiceClient, CustomValidationPipe } from '@app/common';
import { ChatCreateDto } from 'apps/chat/src/dto/ChatCreate.dto';

@ApiTags('chats')
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatServiceClient) {}

  @Post()
  @ApiBody({ type: ChatCreateDto })
  @UsePipes(new CustomValidationPipe())
  async createChat(
    @Body('chat') chat: ChatCreateDto,
    @Body('senderId') senderId: string,
    @Body('receiveId') receiveId: string,
  ) {
    return this.chatService.createChat({
      chatId: null,
      senderId,
      receiveId,
    });
  }

  @Get()
  async getAllChat() {
    return await this.chatService.getAllChats({});
  }

  @Get(':chatId')
  async getChatById(@Param('chatId') chatId: string) {
    const chat = await this.chatService.getChatById({ chatId });
    return {
      success: true,
      message: 'Get chat success',
      errors: null,
      data: chat,
    };
  }
}
