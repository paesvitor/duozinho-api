import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Photo } from "./Photo";
import { Summoner } from "./Summoner";

@Entity()
export class User {
  @CreateDateColumn()
  @UpdateDateColumn()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: true,
  })
  passwordResetToken: string;

  @Column({
    nullable: true,
  })
  passwordResetExpires: string;

  @Column({
    nullable: true,
  })
  description: string;

  @JoinColumn({
    name: "mainPhoto",
  })
  @OneToOne((type) => Photo)
  mainPhoto: Photo;

  @OneToMany((type) => Photo, (photo) => photo.user)
  photos: Photo[];
}
