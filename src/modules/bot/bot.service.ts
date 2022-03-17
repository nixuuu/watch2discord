import { InjectDiscordClient, On, Once, UseGuards } from '@discord-nestjs/core';
import { Injectable, Logger } from '@nestjs/common';
import { Client, MessageReaction } from 'discord.js';
import { W2gService } from '../w2g/w2g.service';
import { ChadReactionGuard } from './chad-reaction-guard.service';
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
  @UseGuards(ChadReactionGuard)
  @UseGuards(YoutubeMessageGuard)
  onReaction(reaction: MessageReaction) {
    const { message } = reaction;
    const ytRegex =
      /^((?:https?:)?\/\/)?((?:www|m)\.)?(youtube(-nocookie)?\.com|youtu.be)(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/.exec(
        message.content,
      );
    const ytId = ytRegex[6];
    const youtubeVideoLink = `https://youtube.com/watch?v=${ytId}`;
    this.w2g.createRoom(youtubeVideoLink).subscribe((link) =>
      message.reply({
        content: link,
      }),
    );
  }
}
