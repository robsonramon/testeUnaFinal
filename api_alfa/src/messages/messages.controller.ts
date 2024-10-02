import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaMessage } from '@nestjs/microservices/external/kafka.interface';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return await this.messagesService.create(createMessageDto);
  }

  @Get()
  async findAll() {
    const messages = await this.messagesService.findAll();

    const groupedMessages = messages.reduce((acc, message) => {
      let content;

      const regex = /(.*?) \| (\d+)/;
      const match = message.content.match(regex);
      if (match) {
        content = {
          name: match[1].trim(),
          age: match[2],
        };
      }
      

      if (content) {
        const existing = acc.find(item => item.name === content.name && item.age === content.age);
        
        if (existing) {
          existing.times += 1;
        } else {
          acc.push({ ...content, times: 1 });
        }
      }

      return acc;
    }, []);

    return groupedMessages;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.messagesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return await this.messagesService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.messagesService.remove(+id);
  }

  @MessagePattern('users')
  async consumer(@Payload() message: KafkaMessage): Promise<void> {
    if (message) {
      const messageData = JSON.stringify(message);
      const { name, age } = JSON.parse(messageData);
      const createMessageDto: CreateMessageDto = {
        content: `${name} | ${age}`
      };

      await this.messagesService.create(createMessageDto);
      console.log('Mensagem registrada com sucesso:', createMessageDto.content);
    } else {
      console.log('message.value is undefined');
    }
  }
}
