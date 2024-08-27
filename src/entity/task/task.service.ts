import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create({ ...createTaskDto });
    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.taskRepository.find();
    return tasks;
  }

  async findOne(id: string) {
    const task = await this.taskRepository.findOneBy({ id: id });
    if (!task) {
      throw new NotFoundException('Task Not Found');
    } else {
      return task;
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException('Task Not Found');
    } else {
      const updatedTask = await this.taskRepository.preload({
        id: id,
        ...updateTaskDto,
      });
      return await this.taskRepository.save(updatedTask);
    }
  }

  async remove(id: string) {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException('Task Not Found');
    } else {
      return await this.taskRepository.remove(task);
    }
  }
}
