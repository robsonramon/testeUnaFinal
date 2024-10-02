import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const newMessage = this.messagesRepository.create({
      ...createMessageDto,
      createdAt: new Date(),
    });
    return await this.messagesRepository.save(newMessage);
  }

  async findAll(): Promise<Message[]> {
    return await this.messagesRepository.find();
  }

  async findOne(id: number): Promise<Message> {
    return await this.messagesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateMessageDto: UpdateMessageDto): Promise<Message> {
    await this.messagesRepository.update(id, updateMessageDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Message> {
    const message = await this.findOne(id);
    if (message) {
      await this.messagesRepository.delete(id);
      return message;
    }
    return null;
  }
}
