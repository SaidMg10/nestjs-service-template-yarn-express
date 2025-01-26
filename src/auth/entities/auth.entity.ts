import { AuthProvider } from 'src/common/enums';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: true })
  password: string;

  @Column('text', { nullable: true })
  googleId: string;

  @Column('int')
  provider: AuthProvider;

  @ManyToOne(() => User, (user) => user.auth, { onDelete: 'CASCADE' })
  user: User;
}
