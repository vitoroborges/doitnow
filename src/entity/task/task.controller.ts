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

  @Get('category/:category')
  async findByCategory(@Param('category') categoryId: string) {
    return await this.taskService.findByCategory(categoryId);
  }

  @Get('status/:status')
  async findByStatus(@Param('status') status: string) {
    return await this.taskService.findByStatus(status);
  }

  @Get('sort/asc')
  async findByDateASC() {
    return await this.taskService.findByDatetimeASC();
  }

  @Get('sort/desc')
  async findByDateDESC() {
    return await this.taskService.findByDatetimeDESC();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.taskService.remove(id);
  }
}
