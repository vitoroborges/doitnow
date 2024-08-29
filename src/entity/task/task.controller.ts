import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  async findAll() {
    return await this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.taskService.findOne(id);
  }

  @Get(':category')
  async findByCategory(@Param('category') categoryId: string) {
    return await this.taskService.findByCategory(categoryId);
  }

  @Get(':status')
  async findByStatus(@Param('status') status: string) {
    return await this.taskService.findByStatus(status);
  }

  @Get('/dateasc')
  async findByDateASC() {
    return await this.taskService.findByDatetimeASC();
  }

  @Get('/datedesc')
  async findByDateDESC() {
    return this.taskService.findByDatetimeDESC();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
