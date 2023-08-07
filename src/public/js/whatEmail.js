const recoverPass = document.getElementById('recoverPass');

recoverPass.addEventListener('submit', async (e) => {
    e.preventDefault();
    let userinfo = Object.fromEntries(new FormData(recoverPass));
    try {
        const response = await fetch('/api/users/recover_password', {
            method: 'POST',
            body: JSON.stringify(userinfo),
            headers: { "Content-Type": "application/json; charset=UTF-8" },
        });
        const data = await response.json();
        localStorage.setItem('tokenRecoverPass', data.data);
    } catch (error) {
        console.error('Error:', error);
    };
});
