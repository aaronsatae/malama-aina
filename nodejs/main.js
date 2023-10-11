import * as fs from 'fs';
import sharp from 'sharp';
import path from 'path';

const __dirname = path.resolve();
const imageBasePath = path.join(__dirname, '/../images/components')

const templateString = fs.readFileSync(path.join(__dirname, '/../templates/v1.svg')).toString();

console.log(templateString);

const excludeImageMap = {
    '눈코1': new Set('얼굴장식2', '얼굴장식3'),
    '눈코4': new Set('얼굴장식2', '얼굴장식3'),
    '눈코7': new Set('얼굴장식2', '얼굴장식3'),
    '머리카락2': new Set('얼굴장식1', '얼굴장식3', '눈썹4'),
    '머리카락7': new Set('얼굴장식2'),
    '얼굴장식2': new Set('입4', '입5', '입7', '입8', '입9', '페인팅1', '페인팅2', '페인팅3', '페인팅4',),
    '얼굴장식3': new Set('입4', '입5', '입7', '입8', '입9',),
    '페인팅43': new Set('옷3'),
};

function convertImageToBase64(image) {
    return `data:image/png;base64,${image.toString('base64')}`;
}

async function getImages(dir) {
    const imagePaths = fs.readdirSync(dir);

    const result = [];
    for (const imgPath of imagePaths) {
        const image = await sharp(fs.readFileSync(`${dir}/${imgPath}`)).png().toBuffer();
        result.push({
            imgName: imgPath.replace('.png', ''),
            image: image,
        });
    }

    return result;
}

const eyebrows = await getImages(path.join(imageBasePath, '눈썹'));
const eyesAndNoses = await getImages(path.join(imageBasePath, '눈코'));
const hairs = await getImages(path.join(imageBasePath, '머리카락'));
const necklaces = await getImages(path.join(imageBasePath, '목장식'));
const weapons = await getImages(path.join(imageBasePath, '무기'));
const headAccessories = await getImages(path.join(imageBasePath, '얼굴장식'));
const clothesList = await getImages(path.join(imageBasePath, '옷'));
const mouths = await getImages(path.join(imageBasePath, '입'));
const facePaints = await getImages(path.join(imageBasePath, '페인팅'));

const hand = await sharp(fs.readFileSync(`${imageBasePath}/손.png`)).png().toBuffer();
const body = await sharp(fs.readFileSync(`${imageBasePath}/몸통.png`)).png().toBuffer();
const head = await sharp(fs.readFileSync(`${imageBasePath}/머리.png`)).png().toBuffer();

const baseTemplate = templateString
    .replace(/{body}/g, convertImageToBase64(body))
    .replace(/{hand}/g, convertImageToBase64(hand))
    .replace(/{head}/g, convertImageToBase64(head));

let imageCount = 0;
for (const weapon of weapons) {
    for (const mouth of mouths) {
        for (const eyebrow of eyebrows) {
            for (const eyesAndNose of eyesAndNoses) {
                for (const hair of hairs) {
                    for (const necklace of necklaces) {
                        for (const clothes of clothesList) {
                            for (const headAccessory of headAccessories) {
                                for (const facePaint of facePaints) {
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
                                    ]

                                    let needSkip = false;
                                    for (const component of combination) {
                                        excludeImageMap[component]?.forEach((excludeComponent) => {
                                            if (combination.includes(excludeComponent)) {
                                                needSkip = true;
                                                break;
                                            }
                                        })
                                    }
                                    if (needSkip) {
                                        continue;
                                    }

                                    imageCount += 1;
                                    let tpl = baseTemplate
                                        .replace(/{weapon}/g, convertImageToBase64(weapon.image))
                                        .replace(/{eyebrow}/g, convertImageToBase64(eyebrow.image))
                                        .replace(/{eyesAndNose}/g, convertImageToBase64(eyesAndNose.image))
                                        .replace(/{hair}/g, convertImageToBase64(hair.image))
                                        .replace(/{mouth}/g, convertImageToBase64(mouth.image))
                                        .replace(/{necklace}/g, convertImageToBase64(necklace.image))
                                        .replace(/{clothes}/g, convertImageToBase64(clothes.image))
                                        .replace(/{headAccessory}/g, convertImageToBase64(headAccessory.image))
                                        .replace(/{facePaint}/g, convertImageToBase64(facePaint.image))
                                    await sharp(Buffer.from(tpl)).png().toFile(path.join(imageBasePath, `result/result${imageCount}.png`));
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
