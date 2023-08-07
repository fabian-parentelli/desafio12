const products = document.querySelector('.products');
const token = localStorage.getItem('token');

// window.addEventListener('DOMContentLoaded', async () => {

//     const result = await fetch('/api/users/current', {
//         method: 'GET',
//         headers: {
//             "Authorization": `Bearer ${token}`
//         }
//     })
//     user = await result.json();
//     if (user.error || user.data.role !== 'user') {
//         window.location.href = 'http://localhost:8080/login';
//     };
    
// });

products.addEventListener('click', addToCart);

async function addToCart(e) {
    if (e.target.classList.contains('btn')) {
        const btn = e.target.parentElement;
        const pid = btn.querySelector("button").getAttribute("data-id");
        const title = btn.querySelector('h2').textContent;

        const result = await fetch(`/api/carts/64ad963156a448d3603ee6a8/products/${pid}`, { 
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const message = await result.json();

        if (message) {
            Swal.fire({
                text: `The product ${title} was added to the cart`,
                toast: true,
                position: "top-right",
            });
        };
    };
};