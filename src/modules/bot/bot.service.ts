import { InjectDiscordClient, On, Once, UseGuards } from '@discord-nestjs/core';
import { Injectable, Logger } from '@nestjs/common';
import { Client, MessageReaction } from 'discord.js';
import { YOUTUBE_REGEX } from '../../helpers/youtube';
import { W2gService } from '../w2g/w2g.service';
import { W2gReactionGuard } from './w2g-reaction.guard';
import { YoutubeMessageGuard } from './youtube-message.guard';

@Injectable()
export class BotService {
  private readonly logger = new Logger(BotService.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
    private readonly w2g: W2gService,
  ) {}

  @Once('ready')
  onReady() {
    this.logger.log(`Bot ${this.client.user.tag} was started!`);
  }

  @On('messageReactionAdd')
  @UseGuards(W2gReactionGuard)
  @UseGuards(YoutubeMessageGuard)
  async onReaction(reaction: MessageReaction) {
    if (reaction.partial) {
      await reaction.fetch();
    }
    const { message } = reaction;
    const ytRegex = YOUTUBE_REGEX().exec(message.content);
    const ytId = ytRegex[5];
    const youtubeVideoLink = `https://youtube.com/watch?v=${ytId}`;
    this.w2g.createRoom(youtubeVideoLink).subscribe((link) =>
      message.reply({
        content: link,
      }),
    );
  }
}
