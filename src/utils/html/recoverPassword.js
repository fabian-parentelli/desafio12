async function recoverPassword_HTML(email) {
    const emailRecoverPassword = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Recuperar Contraseña</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }

                .container {
                    text-align: center;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Recuperar Contraseña</h1>
                <p>Entra a este <a href=${email}>enlace</a> para recuperar tu contraseña.</p>
                </div>
        </body>
        </html>

    `;
    return emailRecoverPassword; 
}

export { recoverPassword_HTML };