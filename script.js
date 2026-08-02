const photos = Array.from(document.querySelectorAll(".photo"));
const photoFloor = document.querySelector(".photo-floor");

function scatterPhotos() {
    if (window.innerWidth <= 800) {
        photos.forEach((photo, index) => {
            photo.style.left = "";
            photo.style.top = "";
            photo.style.width = "";
            photo.style.removeProperty("--rotation");
            photo.style.zIndex = String(20 + index);
        });

        photoFloor.style.height = "";
        photoFloor.style.minHeight = "";

        return;
    }

    const floorWidth = photoFloor.clientWidth;
    const floorHeight = Math.max(
        600,
        window.innerHeight - photoFloor.getBoundingClientRect().top
    );

    photoFloor.style.height = `${floorHeight}px`;
    photoFloor.style.minHeight = "0";

    /*
        Each pair represents a basic position:
        [horizontal percentage, vertical percentage]
    */
    const positions = [
    { x: 4, y: 8 }, // 1
    { x: 23, y: 5 }, // 2
    { x: 43, y: 10 }, // 3
    { x: 64, y: 6 }, // 4
    { x: 82, y: 12 }, // 5

    { x: 10, y: 30 }, // 6
    { x: 31, y: 26 }, // 7
    { x: 53, y: 34 }, // 8
    { x: 74, y: 28 }, // 9

    { x: 6, y: 56 }, // 10
    { x: 25, y: 63 }, // 11
    { x: 47, y: 58 }, // 12
    { x: 68, y: 64 }, // 13
    { x: 84, y: 55 }, // 14

    { x: 38, y: 78 } // 15
];

    const rotations = [
        -25,
        18,
        -12,
        30,
        -15,
        8,
        20
    ];

    photos.forEach((photo, index) => {
        const position = positions[index % positions.length];

        const randomX = Math.random() * 50 - 25;
        const randomY = Math.random() * 50 - 25;
        const randomRotation = Math.random() * 10 - 5;

        const left =
            position[0] * floorWidth + randomX;

        const top =
            position[1] * floorHeight + randomY;

        photo.style.left = `${left}px`;
        photo.style.top = `${top}px`;

        photo.style.setProperty(
            "--rotation",
            `${rotations[index % rotations.length] + randomRotation}deg`
        );

        photo.style.zIndex = index + 1;
    });
}

scatterPhotos();

window.addEventListener("resize", scatterPhotos);
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeButton = document.getElementById("lightbox-close");
const previousButton = document.getElementById("lightbox-previous");
const nextButton = document.getElementById("lightbox-next");

let currentPhotoIndex = 0;

function showPhoto(index) {
    if (index < 0) {
        index = photos.length - 1;
    }

    if (index >= photos.length) {
        index = 0;
    }

    currentPhotoIndex = index;

    const photo = photos[currentPhotoIndex];

    lightboxImage.src = photo.dataset.full || photo.src;
    lightboxImage.alt = photo.alt;
}

function openLightbox(index) {
    showPhoto(index);

    lightbox.classList.add("is-open");
    document.body.classList.add("lightbox-open");
}

function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("lightbox-open");

    lightboxImage.src = "";
    lightboxImage.alt = "";
}

function showPreviousPhoto() {
    showPhoto(currentPhotoIndex - 1);
}

function showNextPhoto() {
    showPhoto(currentPhotoIndex + 1);
}

photos.forEach((photo, index) => {
    photo.addEventListener("click", () => {
        openLightbox(index);
    });
});

closeButton.addEventListener("click", closeLightbox);
previousButton.addEventListener("click", showPreviousPhoto);
nextButton.addEventListener("click", showNextPhoto);

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowLeft") {
        showPreviousPhoto();
    }

    if (event.key === "ArrowRight") {
        showNextPhoto();
    }
});