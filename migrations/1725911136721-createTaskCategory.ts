import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTaskCategory1725911136721 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'task_category',
        columns: [
          {
            name: 'task_id',
            type: 'uuid',
          },
          {
            name: 'category_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ['task_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'task',
            onDelete: 'SET NULL',
          }),
          new TableForeignKey({
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'category',
            onDelete: 'SET NULL',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('task_category');
  }
}
