import * as fs from 'fs';
import sharp from 'sharp';
import path from 'path';

const __dirname = path.resolve();
const imageBasePath = path.join(__dirname, '/../images')
const resultBasePath = './result';
const componentsBasePath = imageBasePath + '/components';

const templateString = fs.readFileSync(path.join(__dirname, './templates/v1.svg')).toString();

const excludeImageMap = {
    'eyesAndNose1': ['faceAccessory2', 'faceAccessory3'],
    'eyesAndNose4': ['faceAccessory2', 'faceAccessory3'],
    'eyesAndNose7': ['faceAccessory2', 'faceAccessory3'],
    'hair2': ['faceAccessory1', 'faceAccessory3', 'eyebrow4'],
    'hair7': ['faceAccessory2'],
    'faceAccessory2': ['mouth4', 'mouth5', 'mouth7', 'mouth8', 'mouth9', 'facePaint1', 'facePaint2', 'facePaint3', 'facePaint4',],
    'faceAccessory3': ['mouth4', 'mouth5', 'mouth7', 'mouth8', 'mouth9',],
    'facePaint4': ['clothes3'],
}

async function getImages(dir) {
    const imagePaths = fs.readdirSync(dir);

    const result = [];
    for (const imgPath of imagePaths) {
        const image = await sharp(fs.readFileSync(`${dir}/${imgPath}`)).png().toBuffer();
        result.push({
            name: imgPath.replace('.png', ''),
            image: image,
        });
    }

    return result;
}


function convertImageToBase64(image) {
    return `data:image/png;base64,${image.toString('base64')}`;
}

function pickImage(images) {
    return images[Math.floor(Math.random() * images.length)];
}

const eyebrows = await getImages(path.join(componentsBasePath, 'eyebrow'));
const eyesAndNoses = await getImages(path.join(componentsBasePath, 'eyesAndNose'));
const hairs = await getImages(path.join(componentsBasePath, 'hair'));
const necklaces = await getImages(path.join(componentsBasePath, 'necklace'));
const weapons = await getImages(path.join(componentsBasePath, 'weapon'));
const headAccessories = await getImages(path.join(componentsBasePath, 'headAccessory'));
const clothesList = await getImages(path.join(componentsBasePath, 'clothing'));
const mouths = await getImages(path.join(componentsBasePath, 'mouth'));
const facePaints = await getImages(path.join(componentsBasePath, 'facePaint'));

const emptyImage = await sharp({
    create: {
        width: 1050,
        height: 1050,
        channels: 4,
        background: {r: 0, g: 0, b: 0, alpha: 0.0}
    }
}).png().toBuffer();
facePaints.push({name: '페인팅없음', image: emptyImage});
necklaces.push({name: '목장식없음', image: emptyImage});
headAccessories.push({name: '얼굴장식없음', image: emptyImage});

const hand = await sharp(fs.readFileSync(`${componentsBasePath}/hand.png`)).png().toBuffer();
const body = await sharp(fs.readFileSync(`${componentsBasePath}/body.png`)).png().toBuffer();
const head = await sharp(fs.readFileSync(`${componentsBasePath}/head.png`)).png().toBuffer();

const baseTemplate = templateString
    .replace(/{body}/g, convertImageToBase64(body))
    .replace(/{hand}/g, convertImageToBase64(hand))
    .replace(/{head}/g, convertImageToBase64(head));

const TOTAL_IMAGE_COUNT = 500;
for (let imageCount = 0; imageCount < TOTAL_IMAGE_COUNT; imageCount++) {
    const weapon = pickImage(weapons);
    const mouth = pickImage(mouths);
    const eyebrow = pickImage(eyebrows);
    const eyesAndNose = pickImage(eyesAndNoses);
    const hair = pickImage(hairs);
    const necklace = pickImage(necklaces);
    const clothes = pickImage(clothesList);
    const headAccessory = pickImage(headAccessories);
    const facePaint = pickImage(facePaints);

    const combination = [
        weapon.name,
        eyebrow.name,
        eyesAndNose.name,
        hair.name,
        mouth.name,
        necklace.name,
        clothes.name,
        headAccessory.name,
        facePaint.name,
    ];

    let needSkip = false;
    for (const component of combination) {
        const excludeComponents = excludeImageMap[component];
        for (const c of combination) {
            if (excludeComponents?.includes(c)) {
                needSkip = true;
            }
        }
    }
    if (needSkip) {
        imageCount--;
        console.log("skipped");
        continue;
    }
    const tpl = baseTemplate
        .replace(/{weapon}/g, convertImageToBase64(weapon.image))
        .replace(/{eyebrow}/g, convertImageToBase64(eyebrow.image))
        .replace(/{eyesAndNose}/g, convertImageToBase64(eyesAndNose.image))
        .replace(/{hair}/g, convertImageToBase64(hair.image))
        .replace(/{mouth}/g, convertImageToBase64(mouth.image))
        .replace(/{necklace}/g, convertImageToBase64(necklace.image))
        .replace(/{clothes}/g, convertImageToBase64(clothes.image))
        .replace(/{headAccessory}/g, convertImageToBase64(headAccessory.image))
        .replace(/{facePaint}/g, convertImageToBase64(facePaint.image))
    sharp(Buffer.from(tpl)).png().toFile(path.join(resultBasePath, `result${imageCount}.png`));
    console.log(`\rGenerated ${imageCount + 1} images! (${Math.floor((imageCount + 1) / TOTAL_IMAGE_COUNT * 100)}%)`);
}
