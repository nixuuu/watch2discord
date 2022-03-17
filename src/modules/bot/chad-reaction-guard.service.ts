import { DiscordGuard } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { MessageReaction } from 'discord.js';

@Injectable()
export class ChadReactionGuard implements DiscordGuard {
  public canActive(
    event: 'messageCreate',
    [reaction]: [MessageReaction],
  ): boolean | Promise<boolean> {
    return reaction.emoji.name === 'w2g';
  }
}
