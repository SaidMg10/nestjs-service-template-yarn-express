/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(Logger) private readonly logger: Logger,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.usersRepository.create(createUserDto);
      return await this.usersRepository.save(newUser);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const users = await this.usersRepository.find();
    if (users.length === 0) throw new NotFoundException('No users found');
    return users;
  }

  async findOne(id: string) {
    let user: User;
    if (isUUID(id)) user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`Product with ${id} not found`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const toUpdate = updateUserDto;
    const user = await this.usersRepository.preload({
      id,
      ...toUpdate,
    });
    if (!user) throw new NotFoundException(`User with id: ${id} not found`);
    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
    return `User with id ${id} has been deleted`;
  }

  async softRemove(id: string) {
    const user = await this.findOne(id);
    user.isActive = false;
    const updatedUser = await this.usersRepository.save(user);
    return updatedUser;
  }

  //TODO: Search for user by email
  async findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      this.logger.error('User already exists', error.detail);
      throw new BadRequestException('User already exists');
    }

    this.logger.error(error);
    this.logger.log(error.code);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
