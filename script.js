const drumKitData = [
    { key: 65, sound: "clap", label: "A" },
    { key: 83, sound: "hihat", label: "S" },
    { key: 68, sound: "kick", label: "D" },
    { key: 70, sound: "openhat", label: "F" },
    { key: 71, sound: "boom", label: "G" },
    { key: 72, sound: "ride", label: "H" },
    { key: 74, sound: "snare", label: "J" },
    { key: 75, sound: "tom", label: "K" },
    { key: 76, sound: "tink", label: "L" },
]

const boxesContainer = document.querySelector('.boxes');

drumKitData.forEach((item) => {
    const box = document.createElement("div");
    box.classList.add("box");
    box.setAttribute("data-key", item.key);
    box.innerHTML = `
    <kbd>${item.label}</kbd>
    <span class="sound">${item.sound}</span>
    `;
    boxesContainer.appendChild(box);

    const audio = document.createElement("audio");
    audio.setAttribute("data-key", item.key);
    audio.setAttribute("src", `sounds/${item.sound}.wav`)
    document.body.appendChild(audio);
 })


function playSound(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    const box = document.querySelector(`.box[data-key="${e.keyCode}"]`)
    if(!audio) return; //aqui impede de a função ficar rodando
    audio.currentTime = 0; //para voltar ao início. Sem ele, o som não funciona toda vez que apertamos a tecla
    audio.play();
    box.classList.add('whilePlaying'); //ele vê a lista de classes que temos e adiciona a que queremos
}

function removeTransition(e){
    if(e.propertyName !== 'transform') return; //vai parar se não for transoform
    this.classList.remove('whilePlaying'); //o this nesse caso vai ser o box
}

const boxes = document.querySelectorAll('.box');
boxes.forEach(box => box.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);