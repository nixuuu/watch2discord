import { DiscordGuard } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { MessageReaction } from 'discord.js';
import { IS_YOUTUBE_LINK } from '../../helpers/youtube';

@Injectable()
export class YoutubeMessageGuard implements DiscordGuard {
  public canActive(
    event: string,
    [reaction]: [MessageReaction],
  ): boolean | Promise<boolean> {
    return IS_YOUTUBE_LINK(reaction.message.content);
  }
}
