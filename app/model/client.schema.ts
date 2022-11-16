import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('varchar', { length: 100, nullable: true })
  surname: string;

  @Column('varchar', { length: 50, nullable: true })
  passport: string;

  @Column({nullable: true})
  passportDate: number;

  @Column('varchar', { length: 50, nullable: true })
  citizenship: string;
}
