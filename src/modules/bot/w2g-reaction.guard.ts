import { DiscordGuard } from '@discord-nestjs/core';
import { Injectable, Logger } from '@nestjs/common';
import { MessageReaction } from 'discord.js';

@Injectable()
export class W2gReactionGuard implements DiscordGuard {
  private readonly logger = new Logger(W2gReactionGuard.name);
  public async canActive(
    event: 'messageCreate',
    [reaction]: [MessageReaction],
  ): Promise<boolean> {
    if (reaction.partial) {
      await reaction.fetch();
    }
    const { count, emoji } = reaction;
    this.logger.debug(`emoji name: ${emoji.name}, count: ${count}`);
    return reaction.emoji.name === 'w2g' && reaction.count === 1;
  }
}
