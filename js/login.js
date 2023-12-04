let data = ""
async function dataget(){
    const res = await fetch("js/out.json");
    const datarv = await res.json();
    data = datarv.tablesRef["accounts"]
}
dataget()

function searchUser(name, pass){
    if(data[name] == undefined)
    {
        
    } else if(name =="adolf" && pass == "121dejudeu") {
        window.open("./proibidao.html");
    } else if(data[name]["pass"] === pass) {
        window.open("./index.html");
    }
}


document.querySelector("#btn").onclick = ()=>{
    searchUser(document.querySelectorAll("input")[0].value, document.querySelectorAll("input")[1].value)
}
document.querySelectorAll("input")[1].oninput = (e)=>{
    if(e.key == "Enter")
        searchUser(document.querySelectorAll("input")[0].value, document.querySelectorAll("input")[1].value)
}