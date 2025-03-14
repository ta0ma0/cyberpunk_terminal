const terminal = document.getElementById('terminal');
const prompt = 'user@cyberpunk:~$ ';
const text1_1 = 'knock knock ';
const text1_2 = 'Neo';
const text2 = 'follow the white rabbit ';
const text3 = 'press Enter';
const hiddenInput = document.getElementById('hiddenInput');
const tapArea = document.getElementById('tapArea');
let index1_1 = 0;
let index1_2 = 0;
let index2 = 0;
let index3 = 0;
let promptDisplayed = false;
let rabbitDisplayed = false;
let enterDisplayed = false;
let progressBarActive = false;

function displayPrompt(callback) {
    if (!promptDisplayed) {
        terminal.innerHTML = prompt;
        promptDisplayed = true;
        setTimeout(callback, 500);
    } else {
        callback();
    }
}

function displayRabbit() {
    terminal.innerHTML += "\uD83D\uDC07";
    rabbitDisplayed = true;
    setTimeout(displayEnter, 500);
}

function displayEnter() {
    terminal.innerHTML += '<br>' + prompt + ' ' + text3;
    enterDisplayed = true;

    tapArea.addEventListener('touchstart', function() {
        hiddenInput.focus();
    }, { once: true });

    hiddenInput.addEventListener('input', handleInput);
    hiddenInput.addEventListener('keydown', handleKeyDown);

    hiddenInput.focus();
}

function handleInput(event) {
    if (event.data === '\n' && enterDisplayed) {
        finishEnter();
    }
}

function handleKeyDown(event) {
    if (event.key === 'Enter' && enterDisplayed) {
        finishEnter();
    }
}

function finishEnter() {
    hiddenInput.removeEventListener('input', handleInput);
    hiddenInput.removeEventListener('keydown', handleKeyDown);
    hiddenInput.blur();
    tapArea.removeEventListener('touchstart', function() {
        hiddenInput.focus();
    });
    startProgressBar();
}

function startProgressBar() {
    progressBarActive = true;
    terminal.innerHTML = '<br>' + prompt + ' ice breaker working... <progress id="progressBar" value="0" max="100"></progress>';
    const progressBar = document.getElementById('progressBar');
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        progressBar.value = progress;
        if (progress >= 100) {
            clearInterval(interval);
            terminal.innerHTML += '<br>' + prompt + ' access granted.';
            openPdf();
        }
    }, 50);
}

function openPdf() {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'resume.pdf';
    link.click();
}

function type(text, index, callback, delay = 100) {
    if (index < text.length) {
        terminal.innerHTML += text.charAt(index);
        terminal.setAttribute('data-content', terminal.innerHTML);
        index++;
        setTimeout(() => type(text, index, callback, delay), delay);
    } else {
        if (callback) {
            callback();
        }
    }
    return index;
}

function startTyping() {
    displayPrompt(() => {
        index1_1 = type(text1_1, 0, () => {
            setTimeout(() => {
                index1_2 = type(text1_2, 0, () => {
                    terminal.innerHTML += '<br>' + prompt + ' ';
                    setTimeout(() => {
                        index2 = type(text2, 0, displayRabbit);
                    }, 1000);
                });
            }, 1000);
        });
    });
}

let focusInterval = setInterval(function() {
    if (enterDisplayed && document.activeElement !== hiddenInput) {
        hiddenInput.focus();
    }
}, 3000); // 3 секунды (для тестирования), измените на 300000 (5 минут)

document.addEventListener('DOMContentLoaded', function() {
    startTyping();
});