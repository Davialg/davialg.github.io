function renderProduct(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    document.querySelector(".product-autor").innerText = livros[id].autor
    document.querySelector(".product-description").innerText = livros[id].descprition
    document.querySelector(".product-img").src = livros[id].src
    document.querySelector(".product-sale").innerText = livros[id].sale
}
renderProduct()