const form = document.getElementById('newPassword');
const tokenRecoverPass = localStorage.getItem('tokenRecoverPass');

form.addEventListener('submit', async (e) => {

    e.preventDefault();
    let userinfo = Object.fromEntries(new FormData(form));

    try {
        const response = await fetch('/api/users/new_password', {
            method: 'PUT',
            body: JSON.stringify(userinfo),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${tokenRecoverPass}`
            },
        });

        const data = await response.json();
        console.log(data.error);

        if (data.error === 'TokenExpiredError: jwt expired') {
            window.location.replace('/whatemail')
        } else if (data.error && data.error !== 'TokenExpiredError: jwt expired') {
            console.log(data);
        } else {
            Swal.fire(
                'Contraseña Actualizada!',
                'success'
            );
            setTimeout(() => {
                window.location.replace('/')
            }, 1000);
        };

    } catch (error) {
        console.log('Error:', error);
    };
});