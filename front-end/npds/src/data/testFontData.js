const testFontData = Array.from({ length: 30 }, (_, i) => ({
  id: (i + 1).toString(),
  userId: `user${i + 1}`,
  fontName: `FontName_${i + 1}`,
}));

export default testFontData;
