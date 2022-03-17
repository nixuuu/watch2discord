export const YOUTUBE_REGEX = () =>
  /((?:https?:)?\/\/)?((?:www|m)\.)?(?:youtube(-nocookie)?\.com|youtu.be)(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?/;

export const IS_YOUTUBE_LINK = (link: string) => YOUTUBE_REGEX().test(link);

export const YOUTUBE_ID = (link: string) => {
  return YOUTUBE_REGEX().exec(link)?.[5];
};
