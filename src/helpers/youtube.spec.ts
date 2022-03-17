import { IS_YOUTUBE_LINK, YOUTUBE_ID } from './youtube';

describe('YouTube Helper', () => {
  const links = [
    'https://www.youtube.com/watch?v=DFYRQ_zQ-gk&feature=featured',
    'https://www.youtube.com/watch?v=DFYRQ_zQ-gk',
    'http://www.youtube.com/watch?v=DFYRQ_zQ-gk',
    '//www.youtube.com/watch?v=DFYRQ_zQ-gk',
    'www.youtube.com/watch?v=DFYRQ_zQ-gk',
    'https://youtube.com/watch?v=DFYRQ_zQ-gk',
    'http://youtube.com/watch?v=DFYRQ_zQ-gk',
    '//youtube.com/watch?v=DFYRQ_zQ-gk',
    'youtube.com/watch?v=DFYRQ_zQ-gk',
    'https://m.youtube.com/watch?v=DFYRQ_zQ-gk',
    'http://m.youtube.com/watch?v=DFYRQ_zQ-gk',
    '//m.youtube.com/watch?v=DFYRQ_zQ-gk',
    'm.youtube.com/watch?v=DFYRQ_zQ-gk',
    'https://www.youtube.com/v/DFYRQ_zQ-gk?fs=1&hl=en_US',
    'http://www.youtube.com/v/DFYRQ_zQ-gk?fs=1&hl=en_US',
    '//www.youtube.com/v/DFYRQ_zQ-gk?fs=1&hl=en_US',
    'www.youtube.com/v/DFYRQ_zQ-gk?fs=1&hl=en_US',
    'youtube.com/v/DFYRQ_zQ-gk?fs=1&hl=en_US',
    'https://www.youtube.com/embed/DFYRQ_zQ-gk?autoplay=1',
    'https://www.youtube.com/embed/DFYRQ_zQ-gk',
    'http://www.youtube.com/embed/DFYRQ_zQ-gk',
    '//www.youtube.com/embed/DFYRQ_zQ-gk',
    'www.youtube.com/embed/DFYRQ_zQ-gk',
    'https://youtube.com/embed/DFYRQ_zQ-gk',
    'http://youtube.com/embed/DFYRQ_zQ-gk',
    '//youtube.com/embed/DFYRQ_zQ-gk',
    'youtube.com/embed/DFYRQ_zQ-gk',
    'https://www.youtube-nocookie.com/embed/DFYRQ_zQ-gk?autoplay=1',
    'https://www.youtube-nocookie.com/embed/DFYRQ_zQ-gk',
    'http://www.youtube-nocookie.com/embed/DFYRQ_zQ-gk',
    '//www.youtube-nocookie.com/embed/DFYRQ_zQ-gk',
    'www.youtube-nocookie.com/embed/DFYRQ_zQ-gk',
    'https://youtube-nocookie.com/embed/DFYRQ_zQ-gk',
    'http://youtube-nocookie.com/embed/DFYRQ_zQ-gk',
    '//youtube-nocookie.com/embed/DFYRQ_zQ-gk',
    'youtube-nocookie.com/embed/DFYRQ_zQ-gk',
    'https://youtu.be/DFYRQ_zQ-gk?t=120',
    'https://youtu.be/DFYRQ_zQ-gk',
    'http://youtu.be/DFYRQ_zQ-gk',
    '//youtu.be/DFYRQ_zQ-gk',
    'youtu.be/DFYRQ_zQ-gk',
    'https://www.youtube.com/HamdiKickProduction?v=DFYRQ_zQ-gk',
    'test prefix string http://youtube.com/watch?v=DFYRQ_zQ-gk',
    'test prefix string http://youtube.com/watch?v=DFYRQ_zQ-gk test postfix string',
    'http://youtube.com/watch?v=DFYRQ_zQ-gk test postfix string',
  ];

  const messages = [
    'http://youtube.com/watch?v=DFYRQ_zQ-gk',
    'test prefix string http://youtube.com/watch?v=DFYRQ_zQ-gk',
    'test prefix string http://youtube.com/watch?v=DFYRQ_zQ-gk test postfix string',
    'http://youtube.com/watch?v=DFYRQ_zQ-gk test postfix string',
    'http://youtube.com/watch?v=DFYRQ_zQ-gk test postfix string\nnewline test',
  ];

  const messagesWithoutLink = ['test message string'];

  it('should get video id from all kind links', () => {
    for (const link of links) {
      const id = YOUTUBE_ID(link);
      expect(id).toBe('DFYRQ_zQ-gk');
    }
  });

  it('should test true for messages with youtube link', () => {
    messages.forEach((msg) => {
      expect(IS_YOUTUBE_LINK(msg)).toBe(true);
    });
  });

  it('should test false for non youtube content message', () => {
    for (const msg of messagesWithoutLink) {
      expect(IS_YOUTUBE_LINK(msg)).toBe(false);
    }
  });
});
