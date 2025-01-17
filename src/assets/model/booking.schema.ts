import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Client} from './client.schema';
import {Room} from './room.schema';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client)
  @JoinColumn()
  client: Client;

  @ManyToOne(() => Room)
  @JoinColumn()
  room: Room;

  @Column()
  arrivalDate: number;

  @Column({nullable: true})
  departureDate: number;

  @Column('varchar', { length: 20, nullable: true })
  lessor: string;

  @Column('varchar', { length: 100, nullable: true })
  portal: string;

  // bill
}
