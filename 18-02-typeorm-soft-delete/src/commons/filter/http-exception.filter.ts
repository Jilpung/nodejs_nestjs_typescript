import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceiptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const status = exception.getStatus();
    const message = exception.message;
    console.log('=================');
    console.log('에러가 발생했어요!');
    console.log('에러내용:', message);
    console.log('예외코드:', status);
    console.log('=================');
  }
}
