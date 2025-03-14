function startTypingChat() {
    fetch('/chat_messages') // Получаем данные с сервера
        .then(response => response.json())
        .then(chatMessages => {
            let messageIndex = 0;
            let charIndex = 0;
            const chat = document.getElementById('chat');

            if (!chat) {
                console.error('Element with id "chat" not found.');
                return;
            }

            chat.innerHTML = '';

            if (!chatMessages || Object.keys(chatMessages).length === 0) { // Проверяем, что словарь не пустой
                console.warn('Chat messages are empty.');
                return;
            }

            const keys = Object.keys(chatMessages);
            console.log(keys)

            function typeNextMessage() {
                const keys = Object.keys(chatMessages); // Получаем ключи каждый раз, чтобы избежать проблем с асинхронностью
                if (chatMessages[keys[messageIndex]]) { // Проверяем, существует ли сообщение с текущим ключом
                    const message = chatMessages[keys[messageIndex]];
                    console.log(message);
                    if (charIndex < message.length) {
                        chat.innerHTML += message.charAt(charIndex);
                        charIndex++;
                        setTimeout(typeNextMessage, 100);
                    } else {
                        chat.innerHTML += '<br>';
                        messageIndex++;
                        charIndex = 0;
                        setTimeout(typeNextMessage, 1500);
                    }
                }
            }
            typeNextMessage();
        })
        .catch(error => {
            console.error('Error fetching chat messages:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(startTypingChat, 60);
});