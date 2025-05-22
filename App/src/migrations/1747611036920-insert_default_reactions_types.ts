import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDefaultReactionsTypes1747611036920
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO reactions_types (name)
      VALUES 
        ('like'),
        ('dislike'),
        ('heart'),
        ('smile'),
        ('angry');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM reactions_types 
      WHERE name IN ('like', 'dislike', 'heart', 'smile', 'angry');
    `);
  }
}
