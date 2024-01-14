export const truncate = (content: string, maxLength: number) => {
  return content.length > maxLength
    ? `${content.slice(0, maxLength - 1)}...`
    : content;
};
