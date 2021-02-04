const seznam = new SeznamStevil()
seznam.mediane = []
//GENERIRAJ LISTO Funkcija
const generirajListItems = (selector, arr) => {
    let ul = document.querySelector(selector)
    ul.innerHTML = ""
    let prednjiOkl = document.createElement("li")
    prednjiOkl.textContent = "[ "
    ul.appendChild(prednjiOkl)
    let zadnjiOkl = document.createElement("li")
    zadnjiOkl.textContent = " ]"
    if (arr.length == 0) {
        return ul.appendChild(zadnjiOkl) 
    }
    arr.forEach((el, idx, array) => {
        
        if (idx === array.length - 1){ 
            let node = document.createElement("li")
            node.textContent = el
            ul.appendChild(node)
            return ul.appendChild(zadnjiOkl)                         
        }
        
        let node = document.createElement("li")
        node.textContent = el + ", "
        ul.appendChild(node)
    });
}

//CALCULATE API Funkcija
const calculate = () => {
    axios.post('http://localhost:3001/api/mediana/calculate', {
        seznam: seznam.seznam
    }).then((response) => {
        
        console.log(response.data)
        const tr = document.createElement('tr')
        const td1 = document.createElement('td')
        const td2 = document.createElement('td')
        td1.textContent = response.data.mediana
        td2.textContent = new Date(response.data.createdAt).toLocaleString('sl-SL')
        tr.appendChild(td1)
        tr.appendChild(td2)
        //Element vstavimo pred ostale elemente
        const tbody = document.querySelector('#tbody-1')
        tbody.insertBefore(tr, tbody.childNodes[0])
        
      })
    .catch((error) => {
        document.querySelector('#err-calc').textContent = error.response.data.message
    });

}
//GET API Funkcija
const get = () => {
    axios.get('http://localhost:3001/api/mediana/get').
    then((response) => {
        
        console.log(response.data)
        const tbody = document.querySelector('#tbody-1')
        
        //Vstavljanje podatkov v tabelo
        response.data.forEach(el => {
            
            const trow = document.createElement('tr')
            const td1 = document.createElement('td')
            const td2 = document.createElement('td')
            trow.appendChild(td1)
            trow.appendChild(td2)

            td1.textContent = el.mediana
            td2.textContent = new Date(el.createdAt).toLocaleString('sl-SL')
            
            tbody.appendChild(trow)
        })
        
      })
    .catch((error) => {
        console.log(error)
    });

}

//Event listenerji za gumbe
document.querySelector("#dodaj-nakljucno").addEventListener("click", () => {
    seznam.dodajNakljucnoStevilo()
    generirajListItems(".seznam-stevil", seznam.seznam)
})
document.querySelector("#dodaj").addEventListener("click", () => {
    
    document.querySelector('#err-num').textContent = ""
    const ret = seznam.dodajStevilo(document.querySelector("#stevilo").value)
    if(ret == 4001) {
        document.querySelector('#err-num').textContent = "Pozabil si dodati število"
    }
    if(ret == 4002) {
        document.querySelector('#err-num').textContent = "To mora biti cela številka"
    }
    if(ret == 4003) {
        document.querySelector('#err-num').textContent = "Številka ne sme biti negativna"
    }
    document.querySelector('#stevilo').value = ""
    generirajListItems(".seznam-stevil", seznam.seznam)
})
document.querySelector("#odstrani-nakljucno").addEventListener("click", () => {
    seznam.izbrisiNakljucnega()
    generirajListItems(".seznam-stevil", seznam.seznam)
})
document.querySelector("#odstrani-vse").addEventListener("click", () => {
    seznam.izbrisiVse()
    generirajListItems(".seznam-stevil", seznam.seznam)
})
document.querySelector("#calculate").addEventListener("click", () => {
    
    document.querySelector('#err-calc').textContent = ""
    calculate()
})

//Generira šetevila iz seznama
generirajListItems(".seznam-stevil", seznam.seznam)

//Get funkcija generira tabelo
get()

