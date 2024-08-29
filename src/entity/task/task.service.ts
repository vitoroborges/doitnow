import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
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

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id: id });
    if (!task) {
      throw new NotFoundException('Task Not Found');
    } else {
      return task;
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
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

  async remove(id: string): Promise<Task> {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException('Task Not Found');
    } else {
      return await this.taskRepository.remove(task);
    }
  }

  async findByCategory(id: string): Promise<Task[]> {
    const tasks = await this.taskRepository.find({
      where: {
        categories: {
          id: id,
        },
      },
      order: {
        categories: {
          name: 'ASC',
        },
      },
    });
    if (!tasks) throw new NotFoundException('Category Not Found');

    return tasks;
  }

  async findByStatus(status: string): Promise<Task[]> {
    const tasks = await this.taskRepository.find({
      where: {
        status: status,
      },
      order: {
        status: 'ASC',
      },
    });

    if (!tasks) throw new NotFoundException('Status Not Found');

    return tasks;
  }

  async findByDatetimeASC(): Promise<Task[]> {
    const today = new Date();
    const tasks = await this.taskRepository.find({
      where: {
        createdAt: LessThan(today),
      },
      order: {
        createdAt: 'ASC',
      },
    });

    if (!tasks) throw new NotFoundException('Tasks Not Found');

    return tasks;
  }

  async findByDatetimeDESC(): Promise<Task[]> {
    const today = new Date();
    const tasks = await this.taskRepository.find({
      where: {
        createdAt: LessThan(today),
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (!tasks) throw new NotFoundException('Tasks Not Found');

    return tasks;
  }
}
