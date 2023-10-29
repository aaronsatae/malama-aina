const imageTypes = [
    "clothing", "mouth", "eyesAndNose", "facePaint", "weapon", "eyebrow", "hair", "necklace", "headAccessory"
];

const imageBasePath = "images/components"

const imageList = {
    clothing: [
        `${imageBasePath}/clothing/clothing3.png`,
        `${imageBasePath}/clothing/clothing1.png`,
        `${imageBasePath}/clothing/clothing2.png`,
    ],
    mouth: [
        `${imageBasePath}/mouth/mouth6.png`,
        `${imageBasePath}/mouth/mouth1.png`,
        `${imageBasePath}/mouth/mouth2.png`,
        `${imageBasePath}/mouth/mouth3.png`,
        `${imageBasePath}/mouth/mouth4.png`,
        `${imageBasePath}/mouth/mouth5.png`,
        `${imageBasePath}/mouth/mouth7.png`,
        `${imageBasePath}/mouth/mouth8.png`,
        `${imageBasePath}/mouth/mouth9.png`,
        `${imageBasePath}/mouth/mouth10.png`,
    ],
    eyesAndNose: [
        `${imageBasePath}/eyesAndNose/eyesAndNose2.png`,
        `${imageBasePath}/eyesAndNose/eyesAndNose1.png`,
        `${imageBasePath}/eyesAndNose/eyesAndNose3.png`,
        `${imageBasePath}/eyesAndNose/eyesAndNose4.png`,
        `${imageBasePath}/eyesAndNose/eyesAndNose5.png`,
        `${imageBasePath}/eyesAndNose/eyesAndNose6.png`,
        `${imageBasePath}/eyesAndNose/eyesAndNose7.png`,
    ],
    facePaint: [
        `${imageBasePath}/blank.png`,
        `${imageBasePath}/facePaint/facePaint1.png`,
        `${imageBasePath}/facePaint/facePaint2.png`,
        `${imageBasePath}/facePaint/facePaint3.png`,
        `${imageBasePath}/facePaint/facePaint4.png`,
    ],
    weapon: [
        `${imageBasePath}/weapon/weapon1.png`,
        `${imageBasePath}/weapon/weapon2.png`,
        `${imageBasePath}/weapon/weapon3.png`,
        `${imageBasePath}/weapon/weapon4.png`,
    ],
    eyebrow: [
        `${imageBasePath}/eyebrow/eyebrow1.png`,
        `${imageBasePath}/eyebrow/eyebrow2.png`,
        `${imageBasePath}/eyebrow/eyebrow3.png`,
        `${imageBasePath}/eyebrow/eyebrow4.png`,
        `${imageBasePath}/eyebrow/eyebrow5.png`,
        `${imageBasePath}/eyebrow/eyebrow6.png`,
        `${imageBasePath}/blank.png`,
    ],
    hair: [
        `${imageBasePath}/blank.png`,
        `${imageBasePath}/hair/hair1.png`,
        `${imageBasePath}/hair/hair2.png`,
        `${imageBasePath}/hair/hair3.png`,
        `${imageBasePath}/hair/hair4.png`,
        `${imageBasePath}/hair/hair5.png`,
        `${imageBasePath}/hair/hair6.png`,
        `${imageBasePath}/hair/hair7.png`,
    ],
    necklace: [
        `${imageBasePath}/blank.png`,
        `${imageBasePath}/necklace/necklace1.png`,
        `${imageBasePath}/necklace/necklace2.png`,
    ],
    headAccessory: [
        `${imageBasePath}/blank.png`,
        `${imageBasePath}/headAccessory/headAccessory1.png`,
        `${imageBasePath}/headAccessory/headAccessory2.png`,
        `${imageBasePath}/headAccessory/headAccessory3.png`,
    ]
};

function initializeImageList() {
    const imageListContainer = document.getElementById("image-list");
    imageListContainer.innerHTML = "";

    for (const type of imageTypes) {
        const button = document.getElementById(`${type}-button`);
        button.addEventListener("click", () => {
            displayImages(type);
        });
    }
    displayImages("eyesAndNose");
}

function displayImages(type) {
    const imageListContainer = document.getElementById("image-list");
    imageListContainer.innerHTML = "";

    for (const image of imageList[type]) {
        const imgElement = document.createElement("img");
        imgElement.src = image;
        imgElement.addEventListener("click", () => {
            const element = document.getElementById(`${type}`);
            const s = `url(${image})`;
            const style = element.style;
            style.backgroundImage = s;
        });

        imageListContainer.appendChild(imgElement);
    }
}

function loadImages() {
    const imageLoader = document.createElement("div");
    document.body.appendChild(imageLoader);
    for (const type of imageTypes) {
        for (const image of imageList[type]) {
            const img = document.createElement("img");
            img.src = image;
            img.style.display = "none";
            imageLoader.appendChild(img);
        }
    }
    imageLoader.remove();
}

initializeImageList();
loadImages();
