
document.addEventListener("DOMContentLoaded", function () {
    const refreshBtn = document.querySelector(".refresh-btn");
    const cardsContainer = document.querySelector(".cards");
    const cards = Array.from(document.querySelectorAll(".card"));
    const flipsCount = document.querySelector(".flips-count");
    const timerElement = document.querySelector(".count-down");

    let isFlipped = false;
    let firstCard, secondCard;
    let flips = 0;
    let matches = 0;
    let timer;
    let timeLeft = 60;

    function shuffleCards() {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            cardsContainer.appendChild(cards[j]);
        }
    }

    function flipCard() {
        if (this === firstCard) return;

        this.classList.add("flip");

        if (!isFlipped) {
            isFlipped = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.querySelector(".back-view img").src === secondCard.querySelector(".back-view img").src;

        if (isMatch) {
            disableCards();
            matches++;
            if (matches === 8) {
                endGame();
            }
        } else {
            unflipCards();
        }

        flips++;
        flipsCount.textContent = "Бали: " + flips;
    }

    function disableCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);

        resetBoard();
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");

            resetBoard();
        }, 400);
    }

    function resetBoard() {
        [isFlipped, firstCard, secondCard] = [false, null, null];
    }

    function startTimer() {
        timer = setInterval(() => {
            
            timeLeft--;
            timerElement.textContent = "Час: " + timeLeft + "c";

            if (timeLeft === 0) {
                clearInterval(timer);
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        clearInterval(timer);
        timerElement.textContent = "Час: 0c";
        alert("Гра закінчена! Ваш результат: " + flips + " балів.");
        //refreshBtn.style.display = "block";
    }

    function restartGame() {
        shuffleCards(); // Перетасовка карт перед початком гри
        cards.forEach((card) => {
            card.classList.remove("flip");
            card.addEventListener("click", flipCard);
        });

        flips = 0;
        matches = 0;
        flipsCount.textContent = "Бали: 0";
        timeLeft = 60;
        timerElement.textContent = "Час: 60c";
        startTimer();
    }

    refreshBtn.addEventListener("click", restartGame);

    restartGame();
});