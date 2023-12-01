const Escolia_OnlineDataBese = {
    tables:{},
    tablesRef:{}
}
function getTolkens(text) {
    const TextTolkien = []
    let state = "default"
    let cc_text = "" 
    for(const letter of text)
    {
        if(state === "default")
        {
            if(letter === '"'){
                state = "string"
            } else if((letter === " " || letter === "\n" || letter === "\r") && cc_text.length > 1)
            {
                TextTolkien.push({
                    text: cc_text,
                    type: "tolkien"
                })
                cc_text = ""
            } else if(letter === " " || letter === "\n" || letter === "\r"){
                cc_text = ""
            } else {
                cc_text+=letter
            }

        } else if(state === "string")
        {
            if(letter === '"'){
                state = "default"
                TextTolkien.push({
                    text: cc_text,
                    type: "string"
                })
                cc_text = ""
            } else if(letter !== '"'){
                cc_text += letter
            }


        } else if(state === "tolkien")
        {

        }
    }
    return TextTolkien
}
function Input_esc(text) {

    

    const Tokens = getTolkens(text + " ")


    function CreateTable(name, values = {}){
        Escolia_OnlineDataBese.tables[name] = {}
        Escolia_OnlineDataBese.tablesRef[name] = {}
        for(const n in values){
            Escolia_OnlineDataBese.tables[name][n] = values[n]
            
        }
    }

    function DeleteTable(name){
        delete Escolia_OnlineDataBese.tables[name]
    }



    function Add(name, nma, value){
        Escolia_OnlineDataBese.tablesRef[name][nma] = value
    }
    function Delete(name, n_value){
        delete Escolia_OnlineDataBese.tablesRef[name][n_value]
    }

    function Get(name, n_value){
        return Escolia_OnlineDataBese.tables[name][n_value]
    }
    const tolkiens = {
        "create":{},
        "table":{},
        "add":{},
        "delete":{},
        "get":{}
    }
    let status = ""
    let create_this = "create"
    let dataTable = ["", {}]
    let data_name = "s"
    let data = false

    let adder_value = false
    let adder_name = false


    let date = new Date()
    const start = date.getMilliseconds()
    for(const n of Tokens){
        if(n.type === "tolkien" && data=== false){
            tolkiens[n.text] != undefined?status = n.text:null
        }

        // CREATE Token
        if(status === "create"){
            status = "create_what"
            data = true
            console.log("\nCREATE")

        } else if(status === "create_what"){
            if(tolkiens[n.text] != undefined)
            {
                status = "data_make"
                create_this = tolkiens[n.text]
                data_name = true
                console.log(n.text)
                console.clear()

            } else {
                console.log("Error: tolkien is not defined ")
                break
            }
        } else if(status === "data_make" && data_name === true) {
            dataTable[0] = n.text
            data_name = false 
            console.log(n.text)

        } else if(status === "data_make") {
            if(n.text === "end" && n.type === "tolkien"){
                status = ""
                data = false
                CreateTable(dataTable[0], dataTable[1])
                dataTable[0] = ""
                dataTable[1] = {}
            } else {
                dataTable[1][n.text] = {}
                console.log(n.text)
                console.clear()
            }
        }
        // ADD Token
        else if(status === "add"){
            status = "add_what"
            adder_name = true
        } else if(status === "add_what" && adder_name === true) {
            dataTable[0] = n.text
            adder_name = false
            adder_value= true
        } else if(status === "add_what" && adder_value === true){
            if(n.text === "end" && n.type === "tolkien")
            {
                status = ""
                Add(dataTable[0], dataTable[1]["nameRef"], dataTable[1])
                dataTable = ["", {}]
            } else {
                dataBefore = n.text
                dataTable[1][n.text] = null
                adder_value = false
            }
        } else if(status === "add_what" && adder_value === false){

            dataTable[1][dataBefore] = n.text
            adder_value = true
        }
    }   
    date = new Date()
    const end = date.getMilliseconds()

    console.log("Table has renderized in ", end - start, "ms Run Time")
}





const fs = require('fs')
fs.readFile('./in.db', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  Input_esc(data)
})

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});



function Dtb(){  
    readline.question('DB>> ', line => {
        if(line == "ex"){
            readline.close();
        } else {
            Input_esc(line)
            const content = JSON.stringify(Escolia_OnlineDataBese, false, 4)
            fs.writeFile('./out.json', content, err => {
            if (err) {
                console.error(err)
                return
            }
            })
            Dtb()
        }
    })
}


Dtb()