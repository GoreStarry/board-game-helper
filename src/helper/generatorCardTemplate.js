const fs = require("fs");
const path = require("path");
const testFolder = path.join(
  __dirname,
  "../../public/data/games/PATHFINDER/images/BLESSINGS"
);

let images = [];

fs.readdirSync(testFolder).forEach(file => {
  images.push(file.replace(/.jpg/, ""));
});

function generatorCardTemplate(cardNames = []) {
  const list = cardNames.map(name => {
    return {
      name: name,
      desc: [""],
      image: true,
    };
  });

  console.log(JSON.stringify(list));
}

generatorCardTemplate(images);
