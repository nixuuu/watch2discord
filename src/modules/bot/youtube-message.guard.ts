import { DiscordGuard } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { MessageReaction } from 'discord.js';

@Injectable()
export class YoutubeMessageGuard implements DiscordGuard {
  public canActive(
    event: string,
    [reaction]: [MessageReaction],
  ): boolean | Promise<boolean> {
    return /youtube\.com\/watch\?v=/.test(reaction.message.content);
  }
}
