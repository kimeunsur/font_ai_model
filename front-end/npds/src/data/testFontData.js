const testFontData = Array.from({ length: 3 }, (_, i) => ({
  id: (i + 1).toString(),
  userId: `user${i + 1}`,
  fontName: `FontName_${i + 1}`,
  createdAt: new Date(
    2025,
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28) + 1
  ).toISOString(),
}));

export default testFontData;
