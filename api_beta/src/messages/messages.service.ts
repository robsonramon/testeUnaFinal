import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  private messages: Message[] = [];

  create(createMessageDto: CreateMessageDto): Message {
    const newMessage: Message = {
      id: this.messages.length + 1,
      ...createMessageDto,
      createdAt: new Date(),
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  findAll(): Message[] {
    return this.messages;
  }

  findOne(id: number): Message {
    return this.messages.find((message) => message.id === id);
  }

  update(id: number, updateMessageDto: UpdateMessageDto): Message {
    const messageIndex = this.messages.findIndex((message) => message.id === id);
    if (messageIndex > -1) {
      this.messages[messageIndex] = { 
        ...this.messages[messageIndex], 
        ...updateMessageDto,
      };
      return this.messages[messageIndex];
    }
    return null;
  }

  remove(id: number): void {
    this.messages = this.messages.filter((message) => message.id !== id);
  }
}
