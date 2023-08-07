const token = localStorage.getItem('token');

let user

window.addEventListener('DOMContentLoaded', async () => {
    const result = await fetch('/api/users/current', {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    user = await result.json();
    if (user.error || user.data.role !== 'user') {
        window.location.href = 'http://localhost:8080/login';
    };
});

const socket = io();
const chatBox = document.getElementById('chatBox');
const messageLogs = document.getElementById('messageLogs');

chatBox.addEventListener("keyup", async (e) => {
    if (e.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            await fetch("/api/chats", {
                method: "POST",
                body: JSON.stringify({
                    user: user.data.first_name,
                    message: chatBox.value,
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            chatBox.value = "";
        };
    };
});

socket.on('messageLogs', data => {
    let log = document.getElementById('messageLogs');
    let messages = "";
    data.forEach(message => {
        messages += `${message.user} dice: ${message.message}<br/>`;
    });
    log.innerHTML = messages;
});

socket.on('newUserConnected', data => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: `${data} se ha unido al chat`,
        icon: 'succes'
    });
});