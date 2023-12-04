async function renderProduct(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const res = await fetch("js/out.json");
    const  data = await res.json();
    
    document.querySelector(".product-autor").innerText = data.tablesRef["livros"][id].autor
    document.querySelector(".product-description").innerText = data.tablesRef["livros"][id].descprition
    document.querySelector(".product-img").src = data.tablesRef["livros"][id].src
    document.querySelector(".product-sale").innerText = data.tablesRef["livros"][id].sale
}
renderProduct()