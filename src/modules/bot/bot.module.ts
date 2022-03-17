import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Intents } from 'discord.js';
import { W2gModule } from '../w2g/w2g.module';
import { BotService } from './bot.service';
import { W2gReactionGuard } from './w2g-reaction.guard';

@Module({
  imports: [
    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get('DISCORD_TOKEN'),
        discordClientOptions: {
          intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
          ],
          partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
        },
      }),
    }),
    W2gModule,
  ],
  providers: [BotService, W2gReactionGuard],
})
export class BotModule {}
