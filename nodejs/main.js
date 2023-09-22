import * as fs from 'fs';
import sharp from 'sharp';
import path from 'path';

const __dirname = path.resolve();
const imageBasePath = path.join(__dirname, '/../images')

const templateString = fs.readFileSync(path.join(__dirname, '/../templates/v1.svg')).toString();

console.log(templateString);

async function getImages(p) {
    const imagePaths = fs.readdirSync(p);

    const result = [];
    for (const imgPath of imagePaths) {
        result.push(await sharp(fs.readFileSync(`${p}/${imgPath}`)).png().toBuffer());
    }

    return result;
}

const weapons = await getImages(path.join(imageBasePath, 'weapon'));
const mouths = await getImages(path.join(imageBasePath, 'mouth'));
const eyebrows = await getImages(path.join(imageBasePath, 'eyebrow'));
const eyesAndNoses = await getImages(path.join(imageBasePath, 'eyesAndNose'));
const hairs = await getImages(path.join(imageBasePath, 'hair'));

const rightHand = await sharp(fs.readFileSync(`${imageBasePath}/base/rightHand.png`)).png().toBuffer();
const body = await sharp(fs.readFileSync(`${imageBasePath}/base/body.png`)).png().toBuffer();
const head = await sharp(fs.readFileSync(`${imageBasePath}/base/head.png`)).png().toBuffer();


let imageCount = 0;
for (const weapon of weapons) {
    for (const mouth of mouths) {
        for (const eyebrow of eyebrows) {
            for (const eyesAndNose of eyesAndNoses) {
                for (const hair of hairs) {
                    imageCount += 1;
                    let tpl = templateString
                        .replace(/{body}/g, `data:image/png;base64,${body.toString('base64')}`)
                        .replace(/{weapon}/g, `data:image/png;base64,${weapon.toString('base64')}`)
                        .replace(/{head}/g, `data:image/png;base64,${head.toString('base64')}`)
                        .replace(/{eyebrow}/g, `data:image/png;base64,${eyebrow.toString('base64')}`)
                        .replace(/{eyesAndNose}/g, `data:image/png;base64,${eyesAndNose.toString('base64')}`)
                        .replace(/{hair}/g, `data:image/png;base64,${hair.toString('base64')}`)
                        .replace(/{mouth}/g, `data:image/png;base64,${mouth.toString('base64')}`)
                        .replace(/{rightHand}/g, `data:image/png;base64,${rightHand.toString('base64')}`);
                    await sharp(Buffer.from(tpl)).png().toFile(path.join(imageBasePath, `result/result${imageCount}.png`));
                }
            }
        }
    }
}

