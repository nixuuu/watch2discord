import { DiscordGuard } from '@discord-nestjs/core';
import { Injectable, Logger } from '@nestjs/common';
import { MessageReaction } from 'discord.js';
import { IS_YOUTUBE_LINK } from '../../helpers/youtube';

@Injectable()
export class YoutubeMessageGuard implements DiscordGuard {
  private readonly logger = new Logger(YoutubeMessageGuard.name);
  public async canActive(
    event: string,
    [reaction]: [MessageReaction],
  ): Promise<boolean> {
    if (reaction.partial) {
      await reaction.fetch();
    }
    this.logger.debug(`msg: ${reaction.message.content}`);
    return IS_YOUTUBE_LINK(reaction.message.content);
  }
}
