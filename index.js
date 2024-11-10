const minNumber: number = 1;
const maxNumber: number = 100;
let randomNumber: number;
let attempts: number;
let isGameActive: boolean;
let guessHistory: number[] = [];
let playerScore: number = 0;
let bestScore: number = Infinity;

const generateRandomNumber = (min: number, max: number): number => 
    Math.floor(Math.random() * (max - min + 1)) + min;

const resetGame = (): void => {
    randomNumber = generateRandomNumber(minNumber, maxNumber);
    attempts = 0;
    isGameActive = true;
    guessHistory = [];
    console.log(`Гра почалася! Вгадайте число від ${minNumber} до ${maxNumber}.`);
};

const updateScore = (): void => {
    playerScore += Math.max(10 - attempts, 1);
    console.log(`Ваш рейтинг: ${playerScore}`);
};

const giveHint = (userGuess: number): void => {
    if (Math.abs(userGuess - randomNumber) <= 5) {
        console.log("Гаряче! Ви близько.");
    } else if (Math.abs(userGuess - randomNumber) <= 15) {
        console.log("Тепло. Ви не так далеко.");
    } else {
        console.log("Холодно. Ви далеко від числа.");
    }
};

const makeGuess = (userGuess: number): void => {
    if (!isGameActive) {
        console.log("Гра закінчена! Почніть знову.");
        return;
    }
    attempts++;
    guessHistory.push(userGuess);
    giveHint(userGuess);
    if (userGuess === randomNumber) {
        console.log(`Вітаємо! Ви вгадали число ${randomNumber} за ${attempts} спроб.`);
        updateScore();
        if (attempts < bestScore) {
            bestScore = attempts;
            console.log(`Нова рекордна кількість спроб: ${bestScore}`);
        } else {
            console.log(`Ваш рекорд: ${bestScore} спроб.`);
        }
        isGameActive = false;
    } else if (userGuess < randomNumber) {
        console.log("Загадане число більше.");
    } else {
        console.log("Загадане число менше.");
    }
};

const startNewGame = (): void => resetGame();

const endGame = (): void => {
    console.log(`Дякуємо за гру! Загадане число було: ${randomNumber}.`);
    console.log("Історія ваших спроб:", guessHistory.join(", "));
    console.log(`Ваш рекорд: ${bestScore} спроб.`);
    isGameActive = false;
};

const delayedStart = (difficulty: string): Promise<void> => {
    return new Promise((resolve) => {
        const delay: number = difficulty === 'easy' ? 1000 : difficulty === 'medium' ? 3000 : 5000;
        console.log(`Починаємо гру через ${delay / 1000} секунд...`);
        setTimeout(() => {
            console.log("Починаємо!");
            resolve();
        }, delay);
    });
};

const userPlayGame = async (): Promise<void> => {
    resetGame();
    const readline = require('readline').promises.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const askQuestion = async (): Promise<void> => {
        const input: string = await readline.question('Введіть ваше припущення: ');
        const userGuess: number = Number(input);
        if (isNaN(userGuess) || userGuess < minNumber || userGuess > maxNumber) {
            console.log("Введіть допустиме число.");
        } else {
            makeGuess(userGuess);
        }
        if (isGameActive) {
            await askQuestion();
        } else {
            readline.close();
        }
    };
    await askQuestion();
};

const autoPlayGame = (): void => {
    resetGame();
    let low: number = minNumber;
    let high: number = maxNumber;
    while (isGameActive) {
        const guess: number = Math.floor((low + high) / 2);
        makeGuess(guess);
        if (guess < randomNumber) {
            low = guess + 1;
        } else if (guess > randomNumber) {
            high = guess - 1;
        }
    }
};

const simulateGames = (numberOfGames: number): void => {
    let totalAttempts: number = 0;
    for (let i = 0; i < numberOfGames; i++) {
        resetGame();
        let low: number = minNumber;
        let high: number = maxNumber;
        let attemptsInGame: number = 0;
        while (isGameActive) {
            const guess: number = Math.floor((low + high) / 2);
            attemptsInGame++;
            if (guess === randomNumber) {
                totalAttempts += attemptsInGame;
                isGameActive = false;
            } else if (guess < randomNumber) {
                low = guess + 1;
            } else {
                high = guess - 1;
            }
        }
    }
    console.log(`Середня кількість спроб для ${numberOfGames} ігор: ${(totalAttempts / numberOfGames).toFixed(2)}`);
};

const main = async (): Promise<void> => {
    console.log("Ласкаво просимо до гри 'Вгадай число'!");
    console.log("1. Грати вручну");
    console.log("2. Автоматична гра");
    console.log("3. Симуляція кількох ігор");
    console.log("4. Вибір рівня складності");
    console.log("5. Вихід");

    const readline = require('readline').promises.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const selectOption = async (): Promise<void> => {
        const input: string = await readline.question('Оберіть опцію: ');
        const option: number = Number(input);
        switch (option) {
            case 1:
                await userPlayGame();
                break;
            case 2:
                autoPlayGame();
                readline.close();
                break;
            case 3:
                const numGames: string = await readline.question('Введіть кількість ігор для симуляції: ');
                const numberOfGames: number = Number(numGames);
                if (!isNaN(numberOfGames) && numberOfGames > 0) {
                    simulateGames(numberOfGames);
                } else {
                    console.log("Введіть коректну кількість ігор.");
                }
                readline.close();
                break;
            case 4:
                const difficulty: string = await readline.question('Виберіть рівень складності (easy, medium, hard): ');
                if (['easy', 'medium', 'hard'].includes(difficulty)) {
                    await delayedStart(difficulty);
                    await userPlayGame();
                } else {
                    console.log("Невірний вибір рівня складності.");
                    await selectOption();
                }
                readline.close();
                break;
            case 5:
                console.log("Вихід з гри.");
                readline.close();
                break;
            default:
                console.log("Неправильний вибір.");
                await selectOption();
        }
    };
    await selectOption();
};

main();