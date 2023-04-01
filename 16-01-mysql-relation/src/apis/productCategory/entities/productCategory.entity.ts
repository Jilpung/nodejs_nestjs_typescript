import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductCateory {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;
}
