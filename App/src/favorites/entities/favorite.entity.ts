import { MovieEntity } from '../../movie/entities/movie.entity';
import { UserEntity } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('favorites')
export class FavoritesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_user: number;

  @Column()
  id_movie: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @ManyToOne(() => MovieEntity, (movie) => movie.favorites, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_movie' })
  movie: MovieEntity;

  @ManyToOne(() => UserEntity, (user) => user.favorites, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_user' })
  user: UserEntity;
}
