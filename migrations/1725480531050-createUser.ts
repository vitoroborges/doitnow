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
          },
          {
            name: 'email',
            type: 'varchar(200)',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar(72)',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
