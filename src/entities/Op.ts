import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Index,
} from "typeorm";
import { User } from "./User";

@Entity()
@Index("LK_ID", ["liked", "user"], { unique: true })
export class Op {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User)
  @JoinColumn()
  user: User;

  @ManyToOne((type) => User)
  @JoinColumn()
  liked: User;

  @Column({
    default: null,
  })
  status: "match" | "reject";
}
