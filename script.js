const imageTypes = ["clothing", "mouth", "eyesAndNose", "facePaint", "weapon", "eyebrow", "hair", "necklace", "headAccessory"];
const imageList = {
    clothing: ["/images/components/clothing/clothing1.png", "/images/components/clothing/clothing2.png", "/images/components/clothing/clothing3.png"],
    mouth: ["/images/components/mouth/mouth1.png", "/images/components/mouth/mouth2.png", "/images/components/mouth/mouth3.png"],
    eyesAndNose: ["/images/components/eyesAndNose/eyesAndNose1.png", "/images/components/eyesAndNose/eyesAndNose2.png", "/images/components/eyesAndNose/eyesAndNose3.png"],
    facePaint: ["/images/components/facePaint/facePaint1.png", "/images/components/facePaint/facePaint2.png", "/images/components/facePaint/facePaint3.png"],
    weapon: ["/images/components/weapon/weapon1.png", "/images/components/weapon/weapon2.png", "/images/components/weapon/weapon3.png"],
    eyebrow: ["/images/components/eyebrow/eyebrow1.png", "/images/components/eyebrow/eyebrow2.png", "/images/components/eyebrow/eyebrow3.png"],
    hair: ["/images/components/hair/hair1.png", "/images/components/hair/hair2.png", "/images/components/hair/hair3.png"],
    necklace: ["/images/components/necklace/necklace1.png", "/images/components/necklace/necklace2.png", "/images/components/necklace/necklace3.png"],
    headAccessory: ["/images/components/headAccessory/headAccessory1.png", "/images/components/headAccessory/headAccessory2.png", "/images/components/headAccessory/headAccessory3.png"]
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

initializeImageList();
