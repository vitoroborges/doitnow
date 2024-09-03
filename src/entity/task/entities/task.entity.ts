import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/entity/user/entities/user.entity';
import { Category } from 'src/entity/category/entities/category.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @CreateDateColumn({ type: 'timestamptz', precision: 3 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 3 })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', precision: 3 })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @ManyToMany(() => Category, (category) => category.tasks)
  @JoinTable()
  categories: Category[];
}
