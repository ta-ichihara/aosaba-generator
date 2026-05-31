const DEBUG = false;

const colors = [
    "青"
//    "赤",
//    "黒",
//    "白",
//    "銀",
//    "透明",
//    "錆びた",
//    "濁った"
];

const animals = [
    "鯖"
//    "猫",
//    "犬",
//    "狐",
//    "鳥",
//    "蛙",
//    "魚"
];

const places = [
    "が空に浮いた",
    "が地下に沈んだ"
//    "が雨に濡れた",
//    "が壊れかけた",
//    "が遠くで燃えている"
];

function animateSlot(id, words, duration){

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

    const specialEffect =
        document.getElementById("special-effect");

    specialEffect.classList.add("hidden");

    document.getElementById("result").innerText = "";

    let color;
    let animal;
    let place;

    if(DEBUG){

        await animateSlot("slot1", colors, 1500);
        await animateSlot("slot2", animals, 2500);
        await animateSlot("slot3", places, 3500);

        color = "青";
        animal = "鯖";
        place = "が空に浮いた";

    }else{

        color =
            await animateSlot("slot1", colors, 1500);

        animal =
            await animateSlot("slot2", animals, 2500);

        place =
            await animateSlot("slot3", places, 3500);
    }

    const finalText =
        color + animal + place;

    document.getElementById("result").innerText =
        "「" + finalText + "ような顔」";

    if(
        color === "青" &&
        animal === "鯖" &&
        place === "が空に浮いた"
    ){

        document.getElementById("special-result").innerText =
        "青鯖が空に浮いたような顔";
        specialEffect.classList.remove("hidden");
        document.body.style.overflow = "hidden";
        launchConfetti();
    }
}

function launchConfetti(){

    for(let i = 0; i < 100; i++){

        const confetti =
            document.createElement("div");

        const icons = [
            "🎉",
            "🎊",
            "✨",
            "⭐"
        ];

        confetti.innerText =
            icons[Math.floor(Math.random() * icons.length)];

        confetti.style.position = "fixed";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.top = "-50px";

        confetti.style.fontSize =
            (20 + Math.random() * 40) + "px";

        confetti.style.zIndex = 9999;

        confetti.style.transition =
            "transform 3s linear, top 3s linear";

        document.body.appendChild(confetti);

        setTimeout(() => {

            confetti.style.top = "110vh";

            confetti.style.transform =
                `rotate(${Math.random() * 1080}deg)`;

        }, 10);

        setTimeout(() => {

            confetti.remove();

        }, 3000);

    }
}

document
    .getElementById("special-effect")
    .addEventListener("click", closeSpecialEffect);

document
    .getElementById("special-effect")
    .addEventListener("touchstart", closeSpecialEffect);

function closeSpecialEffect(){

    document
        .getElementById("special-effect")
        .classList.add("hidden");
}