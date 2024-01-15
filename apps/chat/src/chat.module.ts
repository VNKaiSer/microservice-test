import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { CommonModule, PrismaModule } from '@app/common';
import { ChatRepository } from './chat.repository';

@Module({
  imports: [CommonModule, PrismaModule],
  controllers: [ChatController],
  providers: [ChatService, ChatRepository],
})
export class ChatModule {}
