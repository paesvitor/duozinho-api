import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Photo {
  @CreateDateColumn()
  @UpdateDateColumn()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  @JoinColumn({
    name: "user",
  })
  @ManyToOne((type) => User)
  user: User;

  @Column({
    nullable: false,
  })
  url: string;
}
