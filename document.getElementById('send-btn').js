document.getElementById('send-btn').addEventListener('click', function() {
    let userInput = document.getElementById('user-input').value;
    
    if (userInput.trim() !== "") {
        addMessageToChatbox('You', userInput);
        document.getElementById('user-input').value = ''; // Clear input

        // Send user input to Flask backend
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: userInput }),
        })
        .then(response => response.json())
        .then(data => {
            addMessageToChatbox('Bot', data.response);
        });
    }
});

function addMessageToChatbox(sender, message) {
    let chatContainer = document.getElementById('chat-container');
    let newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatContainer.appendChild(newMessage);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Auto scroll
}
