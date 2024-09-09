import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCategory1725910648247 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'category',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
            isPrimary: true,
          },
          {
              name: 'name',
              type: 'varchar(250)',
              isNullable: false,
              isUnique: true,
          },
          {
              name: 'created_at',
              type: 'timestampz',
              default: 'now()'
          },
          {
              name: 'updated_at',
              type: 'timestampz',
              default: 'now()',
              onUpdate: 'CURRENT_TIMESTAMP'
          }
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('category');
  }
}
