import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './createProduct.input';

@InputType()
export class UpdateProdcutInput extends PartialType(CreateProductInput) {}
//이 부분만 해주세요.
// PickType(CreateProductInput, ['name', 'price']);
//이 부분을 삭제해주세요.
// OmitType(CreateProductInput, ['description']);
