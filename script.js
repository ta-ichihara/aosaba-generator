const colors = [
    "青",
    "黒",
    "銀",
    "透け",
    "錆び",
    "濁り"
];

const animals = [
    "鯖",
    "モグラ",
    "コアラ",
    "すっぽん",
    "ハト",
    "サメ"
];

const places = [
    "が空に浮いたような",
    "を地面に置いたような",
    "をひっくり返したような",
    "の漬けパスタみたいな",
    "を一昨日から煮しめたような",
    "が遠くで燃えているような",
    "をずいぶんとふやかしたような",
    "が一夜漬けしたような",
    "が半分溶けたような"

];

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
            await animateSlot("slot1", colors, 1500);

        animal =
            await animateSlot("slot2", animals, 2500);

        place =
            await animateSlot("slot3", places, 3500);
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


function closeSpecialEffect(){

    document
        .getElementById("special-effect")
        .classList.add("hidden");
}

document
    .getElementById("close-popup")
    .addEventListener("click", closeSpecialEffect);

function closeSpecialEffect(){

    document
        .getElementById("special-effect")
        .classList.add("hidden");

    document.body.style.overflow = "";
}