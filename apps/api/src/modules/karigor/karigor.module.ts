import { Module } from '@nestjs/common';
import { KarigorService } from './karigor.service';
import { KarigorController } from './karigor.controller';

@Module({
  controllers: [KarigorController],
  providers: [KarigorService],
  exports: [KarigorService],
})
export class KarigorModule {}
