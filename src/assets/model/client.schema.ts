import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 256 })
  name: string;

  @Column('varchar', { length: 256, nullable: true })
  surname: string;

  @Column('varchar', { length: 256, nullable: true })
  passport: string;

  @Column({nullable: true})
  passportDate: number;

  @Column('varchar', { length: 256, nullable: true })
  citizenship: string;
}
