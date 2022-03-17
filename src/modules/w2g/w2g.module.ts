import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { W2gService } from './w2g.service';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [W2gService],
  exports: [W2gService],
})
export class W2gModule {}
