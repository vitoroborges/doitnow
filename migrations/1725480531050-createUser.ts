import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUser1725480531050 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'username',
            type: 'varchar(200)',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar(200)',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar(72)',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestampz',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestampz',
            default: 'now()',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestampz',
            default: 'null',
            isNullable: true
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
