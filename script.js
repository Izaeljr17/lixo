let score = 0;
const trashItems = document.querySelectorAll('.trash');
const totalTrash = trashItems.length;
const bins = document.querySelectorAll('.bin');
const scoreDisplay = document.getElementById('score');

// Embaralhar e posicionar o lixo aleatoriamente
function shuffleAndPlaceTrash() {
    const container = document.querySelector('.trash-area');
    const maxX = 700;
    const maxY = 250;



    const trashArray = Array.from(trashItems);
    trashArray.sort(() => 0.5 - Math.random());

    trashArray.forEach(item => {
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
    });
}

shuffleAndPlaceTrash();

// Função principal de arrastar e soltar
trashItems.forEach(item => {
    item.addEventListener('dragstart', e => {
        e.dataTransfer.setData('type', item.dataset.type);
        e.target.classList.add('dragging');
    });

    item.addEventListener('dragend', e => {
        e.target.classList.remove('dragging');
    });
});

bins.forEach(bin => {
    bin.addEventListener('dragover', e => e.preventDefault());

    bin.addEventListener('drop', e => {
        const trashType = e.dataTransfer.getData('type');
        const binType = bin.dataset.accept;
        const draggingItem = document.querySelector('.trash.dragging');

        if (trashType === binType) {
            score++;
            draggingItem.remove();
            scoreDisplay.textContent = `Pontuação: ${score}`;
            if (score === totalTrash) {
                showCongratulations();
            } else {
                alert('Boa! Lixo reciclado corretamente!');
            }
        } else {
            alert('Ops! Essa lixeira está errada para esse tipo de lixo.');
        }
    });
});

function showCongratulations() {
    const congrats = document.createElement('div');
    congrats.className = 'congrats-message';
    congrats.innerHTML = `
        <h2>🎉 Parabéns! 🎉</h2>
        <p>Você reciclou todo o lixo corretamente! 🌎✅</p>
    `;
    document.body.appendChild(congrats);
}
