const app = {
    books: null
}

function Public_Book(book){
    app.books.appendChild(book)
    
}


function CreateBookElement(src, description, autor, sale, linkdoproduto){
    const book = document.createElement('div')
    const book_div = document.createElement('div')
    const book_img = document.createElement('img')
    const book_description = document.createElement('div')
    const book_autor = document.createElement('div')
    const book_sale = document.createElement('div')

    book_autor.className = 'autor'
    book_autor.innerText = autor
    
    book_description.className = 'description'
    book_description.innerText = description

    book_img.src = src
    book_img.onload = (e) =>{
        const rgb = CorPredominante(e.target)
        book.querySelector(".div-info").style = "background:" + rgb
        book.dataset.color = rgb
    }
    
    book_sale.className = "sale"
    book_sale.innerText = sale

    book_div.appendChild(book_autor)
    book_div.appendChild(book_description)
    book_div.appendChild(book_sale)
    book.appendChild(book_div)
    book.style = "background-image: url('" + src + "')"
    
    
    book_div.className = 'div-info'
    book.className = 'book'
    

    book.onclick = () =>{
        window.open("./produto.html?id=" + linkdoproduto +"&color=" + book.dataset.color);
    }

    return book
}

async function RenderData2(breaks = ""){
    const res = await fetch("js/out.json");
    const data = await res.json();
    let i = 0
    if(breaks != ""){
        for(const livroN in data.tablesRef["livros"])
        {
            if(data.tablesRef["livros"][livroN].name.toUpperCase().search(breaks.toUpperCase()) === 0){
                Public_Book(CreateBookElement(data.tablesRef["livros"][livroN].src,data.tablesRef["livros"][livroN].descprition,data.tablesRef["livros"][livroN].autor,data.tablesRef["livros"][livroN].sale, livroN))
            }
            i+=1      
        }
        return
    }


    for(const livroN in data.tablesRef["livros"])
    {
        
        Public_Book(CreateBookElement(data.tablesRef["livros"][livroN].src,data.tablesRef["livros"][livroN].descprition,data.tablesRef["livros"][livroN].autor,data.tablesRef["livros"][livroN].sale, livroN))
        i+=1      
    }
}


function GetLivros() {
    app.books = document.querySelector(".books-section")
    const params = new URLSearchParams(window.location.search);
    const id = params.get('search');
    RenderData2(id != null?id:"")
}
GetLivros()

document.querySelector(".sear-input input").addEventListener("keyup", (e)=>{
    if(e.key == "Enter")
    {
        window.location = window.location.origin + window.location.pathname + "?search=" + e.target.value
    }
})