function importAllImages() {
  const context = require.context("../images", true, /\.(png|jpe?g|svg)$/);
  let imageArray = {};

  context.keys().forEach(function (filePath) {
    const fileName = filePath.replace("./", "");
    imageArray[fileName] = context(filePath);
  });

  return imageArray;
}

/* ----------------------------- */

export const importedImages = importAllImages();
