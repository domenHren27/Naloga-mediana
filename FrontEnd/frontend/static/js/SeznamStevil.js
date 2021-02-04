class SeznamStevil {

    constructor() {

        this.seznam = this.generirajNkljucnaStevila()

    }

    generirajNkljucnaStevila() {
    
        let randomNum = []
        
        for (let i = 1; i <= 5; i++) {
            let num = this.generirajNakljucnoStevilo();
            randomNum.push(num)
        }
        return randomNum
    
    }

    generirajNakljucnoStevilo() {

        return Math.floor(Math.random() * 1000 + 1)
    }

    dodajNakljucnoStevilo() {

        let num = this.generirajNakljucnoStevilo()
        this.seznam.push(num)
        return num
    }

    dodajStevilo(num) {

        if(num == ""){
            //Javi napako num ne sme biti prazen
            return 4001
        }
        if (!isNaN(num) && num.toString().indexOf('.') != -1)
        {
            //Javi napako num nesme biti float
            return 4002
        }
        num = parseInt(num)
        if (num < 0) {
            return 4003
        }
        if (!Number.isInteger(num)) {
            return 4002
        }

        this.seznam.push(num)
        return this.seznam

    }

    izbrisiNakljucnega() {

        this.seznam.splice(Math.floor(Math.random() * this.seznam.length),1)
        return this.seznam

    }

    izbrisiVse() {

        return this.seznam = []
    }

}