import { Task } from 'src/entity/task/entities/task.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamptz', precision: 3 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 3 })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', precision: 3 })
  deletedAt: Date;

  @ManyToMany(() => Task, (task) => task.categories)
  tasks: Task[];
}
