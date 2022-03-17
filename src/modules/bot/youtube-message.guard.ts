import { DiscordGuard } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { MessageReaction } from 'discord.js';
import { YOUTUBE_REGEX } from '../../helpers/youtube';

@Injectable()
export class YoutubeMessageGuard implements DiscordGuard {
  public canActive(
    event: string,
    [reaction]: [MessageReaction],
  ): boolean | Promise<boolean> {
    return YOUTUBE_REGEX().test(reaction.message.content);
  }
}
