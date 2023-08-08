const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let userinfo = Object.fromEntries(new FormData(form));
    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify(userinfo),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    const data = await response.json();
    localStorage.setItem('token', data.data.accesToken);
});