import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './entity/user/user.module';
import { TaskModule } from './entity/task/task.module';
import { CategoryModule } from './entity/category/category.module';

@Module({
  imports: [UserModule, TaskModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
