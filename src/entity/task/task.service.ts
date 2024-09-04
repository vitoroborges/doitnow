import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThan, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    if (createTaskDto.description.length > 10) {
      const categories = await this.categoryRepository.find({
        where: {
          id: In(createTaskDto.category),
        },
      });
      const task = this.taskRepository.create({
        ...createTaskDto,
        categories: categories,
      });
      return this.taskRepository.save(task);
    } else {
      throw new ForbiddenException(
        'Description Have To Be More Than 10 Caracters',
      );
    }
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.taskRepository.find({
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        user: {
          id: true,
        },
        categories: {
          id: true,
          name: true,
        },
      },
      relations: ['categories', 'user'],
    });
    return tasks;
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        createdAt: true,
        user: {
          id: true,
          username: true,
        },
        categories: {
          id: true,
          name: true,
        },
      },
      where: {
        id: id,
      },
      relations: ['categories', 'user'],
    });
    if (!task) {
      throw new NotFoundException('Task Not Found');
    } else {
      return task;
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    if (updateTaskDto.description.length > 10) {
      const categories = await this.categoryRepository.find({
        where: {
          id: In(updateTaskDto.category),
        },
      });
      const task = await this.findOne(id);
      if (!task) {
        throw new NotFoundException('Task Not Found');
      } else {
        const updatedTask = await this.taskRepository.preload({
          id: id,
          ...updateTaskDto,
          categories: categories,
        });
        return await this.taskRepository.save(updatedTask);
      }
    } else {
      throw new ForbiddenException(
        'Description Have To Be More Than 10 Caracters',
      );
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
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        user: {
          id: true,
        },
        categories: {
          id: true,
          name: true,
        },
      },
      where: {
        categories: {
          id: id,
        },
      },
      relations: ['categories', 'user'],
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
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        user: {
          id: true,
        },
        categories: {
          id: true,
          name: true,
        },
      },
      where: {
        status: status,
      },
      relations: ['categories', 'user'],
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
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        createdAt: true,
        user: {
          id: true,
        },
        categories: {
          id: true,
          name: true,
        },
      },
      where: {
        createdAt: LessThan(today),
      },
      relations: ['categories', 'user'],
    });

    if (!tasks) throw new NotFoundException('Tasks Not Found');

    return tasks;
  }

  async findByDatetimeDESC(): Promise<Task[]> {
    const today = new Date();
    const tasks = await this.taskRepository.find({
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        createdAt: true,
        user: {
          id: true,
        },
        categories: {
          id: true,
          name: true,
        },
      },
      where: {
        createdAt: LessThan(today),
      },
      relations: ['categories', 'user'],
      order: {
        createdAt: 'DESC',
      },
    });

    if (!tasks) throw new NotFoundException('Tasks Not Found');

    return tasks;
  }
}
