import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 256 })
  name: string;

  @Column('real')
  price: number;
}
