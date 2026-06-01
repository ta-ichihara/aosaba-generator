let colors = [];
let animals = [];
let places = [];

async function loadWords(){

    try{

        const response =
            await fetch("words.json");

        const data =
            await response.json();

        colors = data.colors;
        animals = data.animals;
        places = data.places;

        console.log("words loaded");

    }catch(error){

        console.error(
            "words.json の読み込み失敗",
            error
        );
    }
}

window.addEventListener(
    "load",
    loadWords
);

function animateSlot(id, words, duration, fixedWord = null){

    return new Promise(resolve => {

        const slot = document.getElementById(id);

        slot.innerHTML = "";

        slot.style.transition = "none";
        slot.style.top = "0px";

        void slot.offsetHeight;

        for(let i = 0; i < 30; i++){

            const div =
                document.createElement("div");

            div.className = "item";

            div.innerText =
                words[Math.floor(Math.random() * words.length)];

            slot.appendChild(div);
        }

        const items =
            slot.querySelectorAll(".item");

        const finalWord =
            fixedWord ??
            words[Math.floor(Math.random() * words.length)];

        items[items.length - 1].innerText =
            finalWord;

        const itemHeight =
            items[0].offsetHeight;

        const totalHeight =
            (items.length - 1) * itemHeight;

        slot.style.transition =
            `top ${duration}ms cubic-bezier(0.1,0.7,0.2,1)`;

        requestAnimationFrame(() => {

            slot.style.top =
                `-${totalHeight}px`;

        });

        setTimeout(() => {

            resolve(finalWord);

        }, duration);

    });

}

async function startSlot(){
    const startButton =
        document.getElementById("start-button");

    if(startButton.disabled){
        return;
    }

    startButton.disabled = true;

    if(
        colors.length === 0 ||
        animals.length === 0 ||
        places.length === 0
    ){

        alert("単語データ読み込み中です");

        return;
    }

    const sampleMode =
        document.getElementById("sample-mode").checked;

    const specialEffect =
        document.getElementById("special-effect");

    specialEffect.classList.add("hidden");

    document.getElementById("result").innerText = "";

    let color;
    let animal;
    let place;

    if(sampleMode){

        color =
            await animateSlot(
                "slot1",
                colors,
                1500,
                "青"
            );

        animal =
            await animateSlot(
                "slot2",
                animals,
                2500,
                "鯖"
            );

        place =
            await animateSlot(
                "slot3",
                places,
                3500,
                "が空に浮いたような"
            );

    }else{

        color =
            await animateSlot(
                "slot1",
                colors,
                1500
            );

        animal =
            await animateSlot(
                "slot2",
                animals,
                2500
            );

        place =
            await animateSlot(
                "slot3",
                places,
                3500
            );
    }

    const finalText =
        color + animal + place;

    document.getElementById("result").innerText =
        "「" + finalText + "顔」";

    if(
        color === "青" &&
        animal === "鯖" &&
        place === "が空に浮いたような"
    ){

        document.getElementById("special-result").innerText =
            "";

        specialEffect.classList.remove("hidden");

        document.body.style.overflow = "hidden";

        launchConfetti();
    }

    startButton.disabled = false;
}

function launchConfetti(){

    for(let i = 0; i < 8; i++){

        setTimeout(() => {

            createFirework();

        }, i * 500);
    }
}

function createFirework(){

    const firework =
        document.createElement("div");

    firework.className = "firework";

    const x =
        Math.random() * window.innerWidth;

    const y =
        150 + Math.random() * (
            window.innerHeight * 0.4
        );

    firework.style.left = x + "px";

    firework.style.top =
        window.innerHeight + "px";

    document.body.appendChild(firework);

    requestAnimationFrame(() => {

        firework.style.top = y + "px";

    });

    setTimeout(() => {

        explodeFirework(x, y);

        firework.remove();

    }, 900);
}

function explodeFirework(x, y){

    const fireworkColors = [
        "#ff4d4d",
        "#ffd24d",
        "#4dd2ff",
        "#ffffff",
        "#ff66ff"
    ];

    for(let i = 0; i < 24; i++){

        const particle =
            document.createElement("div");

        particle.className =
            "firework-particle";

        const angle =
            (Math.PI * 2 / 24) * i;

        const distance =
            80 + Math.random() * 60;

        const dx =
            Math.cos(angle) * distance;

        const dy =
            Math.sin(angle) * distance;

        particle.style.left =
            x + "px";

        particle.style.top =
            y + "px";

        particle.style.background =
            fireworkColors[
                Math.floor(
                    Math.random() * fireworkColors.length
                )
            ];

        document.body.appendChild(particle);

        requestAnimationFrame(() => {

            particle.style.transform =
                `translate(${dx}px, ${dy}px)`;

            particle.style.opacity =
                "0";
        });

        setTimeout(() => {

            particle.remove();

        }, 1200);
    }
}

document
    .getElementById("close-popup")
    .addEventListener(
        "click",
        closeSpecialEffect
    );

function closeSpecialEffect(){

    document
        .getElementById("special-effect")
        .classList.add("hidden");

    document.body.style.overflow = "";
}