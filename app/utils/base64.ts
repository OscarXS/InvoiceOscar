import fs from 'fs';

export const toBase64 = (filePath: string) => {
  const file = fs.readFileSync(filePath);
  return `data:image/png;base64,${file.toString('base64')}`;
};