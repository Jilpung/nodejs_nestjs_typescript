import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductSaleslocation } from '../productsSaleslocation/entities/productSaleslocation.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,
  ) {}

  async findAll() {
    return await this.productRepository.find({
      relations: ['productSaleslocation'],
    });
  }

  async findOne({ productId }) {
    return await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation'],
    });
  }

  async create({ createProductInput }) {
    //1. 상품만 등록하는 경우
    // const result = await this.productRepository.save({
    //   ...createProductInput,

    // 하나하나 직접 나열하는 방식
    // name: createProductInput.name,
    // description: createProductInput.description,
    // price: createProductInput.price,
    // });

    //2. 상품과 상품거래위치를 같이 등록하는 경우
    const { productSaleslocation, ...product } = createProductInput;

    const result = await this.productSaleslocationRepository.save({
      ...productSaleslocation,
    });

    const result2 = await this.productRepository.save({
      ...product,
      //상품 아이디만 연결할 경우
      // productSaleslocation: {
      //   id: result.id,
      // },

      // 상품 상세정보들을 다 보내줄 경우
      productSaleslocation: result,
    });

    return result2;
  }

  async update({ productId, updateProductInput }) {
    const myproduct = await this.productRepository.findOne({
      where: { id: productId },
    });
    const newProduct = {
      ...myproduct,
      id: productId,
      ...updateProductInput,
    };
    return this.productRepository.save(newProduct);
  }

  async checkSoldout({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매 완료된 상품');

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }

  async delete({ productId }) {
    //  1. 실제 삭제
    // const result = await this.productRepository.delete({ id: productId });
    // return result.affected ? true : false;

    //  2. 소프트 삭제(직접 구현) - isDelete
    // this.productRepository.update({ id: productId }, { isDeleted: true });

    //  3. 소프트 삭제(직접 구현) - deletedAt
    // this.productRepository.update({ id: productId }, { deletedAt: new Date() });

    //  4. 소프트삭제(typeorm 제공) - softRemove
    // this.productRepository.softRemove({ id: productId }); // id로만 삭제가능

    //  5 . 소프트삭제(typeorm 제공) - softDelete
    const result = await this.productRepository.softDelete({ id: productId }); // 다른 조건으로도 삭제가능
    return result.affected ? true : false;
  }
}
