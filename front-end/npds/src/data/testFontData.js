const fontContext = require.context(
  "./more_font", // 폰트 파일 경로
  false, 
  /\.ttf$/
);

const testFontData = fontContext.keys().map((key, index) => ({
  id: (index + 1).toString(),
  userId: `user${index + 1}`,
  fontName: key.replace("./", "").replace(".ttf", ""), // 파일명에서 확장자 제거
  fontPath: fontContext(key), // 폰트 파일 경로
}));

export default testFontData;
