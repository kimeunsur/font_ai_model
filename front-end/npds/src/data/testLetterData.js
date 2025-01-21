const testLetterData = Array.from({ length: 10 }, (_, i) => ({
  id: (i + 1).toString(),
  userId: `user${i + 1}`,
  letterName: `LetterName_${i + 1}`,
  createdAt: new Date(
    2025,
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28) + 1
  ).toISOString(),
}));

export default testLetterData;
