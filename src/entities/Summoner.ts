import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  OneToOne,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Summoner {
  @PrimaryColumn()
  id: string;

  @Column({
    nullable: false,
  })
  @JoinColumn({
    name: "user",
  })
  @OneToOne((type) => User)
  user: User;

  @Column({ nullable: false })
  accountId: string;

  @Column("int", { nullable: false })
  profileIconId: number;

  @Column({ nullable: false })
  revisionDate: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  puuid: string;

  @Column({ nullable: false })
  summonerLevel: number;

  @Column()
  verificationIcon: number;

  @Column("boolean", {
    default: false,
  })
  verified: boolean;
}
