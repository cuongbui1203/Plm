const infoEncode = (string) => {
  return new TextEncoder().encode(string);
};

const infoDecode = (arr) => {
  return JSON.parse(new TextDecoder().decode(Uint8Array.from(arr)));
};

export { infoDecode, infoEncode };
