import sharp from 'sharp';
import path from 'path';
import * as fs from 'fs';

const __dirname = path.resolve();

function parseEyesAndNose(image) {
    const left = 253;
    const top = 395;
    const width = 322;
    const height = 169;
    return sharp(image).extract({left, top, width, height}).png().toBuffer();
}

function parseMouth(image) {
    const left = 309;
    const top = 564;
    const width = 222;
    const height = 168;
    return sharp(image).extract({left, top, width, height}).png().toBuffer();
}

function parseHair(image) {
    const left = 103;
    const top = 67;
    const width = 908;
    const height = 850;
    return sharp(image).extract({left, top, width, height}).png().toBuffer();
}

function parseWeapon(image) {
    const left = 50;
    const top = 55;
    const width = 349;
    const height = 995;
    return sharp(image).extract({left, top, width, height}).png().toBuffer();
}

function parseEyebrow(image) {
    const left = 256;
    const top = 307;
    const width = 315;
    const height = 124;
    return sharp(image).extract({left, top, width, height}).png().toBuffer();
}

const nonParsedImageBasePath = path.join(__dirname, '/../images/non-parsed')
const parsedImageBasePath = path.join(__dirname, '/../images')

const imagePaths = fs.readdirSync(nonParsedImageBasePath);


for (const imagePath of imagePaths) {
    console.log(imagePath);
    const nonParsedPath = `${nonParsedImageBasePath}/${imagePath}`;
    const nonParsedImage = fs.readFileSync(nonParsedPath);
    let parsedImagePath;
    let parsedImage;
    if (imagePath.includes('eyes')) {
        parsedImage = await parseEyesAndNose(nonParsedImage);
        parsedImagePath = `${parsedImageBasePath}/eyesAndNose/${imagePath}`;
    } else if (imagePath.includes('eyebrow')) {
        parsedImage = await parseEyebrow(nonParsedImage);
        parsedImagePath = `${parsedImageBasePath}/eyebrow/${imagePath}`;
    } else if (imagePath.includes('hair')) {
        parsedImage = await parseHair(nonParsedImage);
        parsedImagePath = `${parsedImageBasePath}/hair/${imagePath}`;
    } else if (imagePath.includes('mouth')) {
        parsedImage = await parseMouth(nonParsedImage);
        parsedImagePath = `${parsedImageBasePath}/mouth/${imagePath}`
    } else if (imagePath.includes('weapon')) {
        parsedImage = await parseWeapon(nonParsedImage);
        parsedImagePath = `${parsedImageBasePath}/weapon/${imagePath}`
    }

    fs.writeFileSync(parsedImagePath, parsedImage);
}
