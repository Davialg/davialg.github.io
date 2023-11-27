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


function RenderData() {
    let i = 0
    for(const livro of livros)
    {
        
        Public_Book(CreateBookElement(livro.src,livro.descprition,livro.autor,livro.sale, i))
        i+=1
    }
}


function GetLivros() {
    app.books = document.querySelector(".books-section")
    RenderData()
}
GetLivros()