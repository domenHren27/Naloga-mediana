const db = require('../models/db')
const Mediana = db.Mediana


exports.get = async (req,res) => {
    try {
        const data = await Mediana.findAll({
            order : [['createdAt', 'DESC']],
            attributes: ['mediana','createdAt']
        })
        console.log(data)
        res.send(data)
    } catch (e) {
        console.log(e)
        res.status(500).send('Nekaj je šlo narboe na srežniški strani')
    } 
        
}
exports.calculate = async (req, res) => {

    console.log(req.body.seznam)
    if (!req.body.seznam) {
        return res.status(400).send()
    }
    if (!Array.isArray(req.body.seznam)) {
        return res.status(400).send()
    }
    if (req.body.seznam.length == 0) {
        return res.status(400).send({
            message: "Sezam ne sme biti prazen"
        })
    }

    if (!req.body.seznam.some(i => Number.isInteger(i)))
    {
        return res.status(400).send({
            message: "seznam mora vsebovati samo cela stevila"
        })
    }
    
    
    const mediana = {
        mediana: median(req.body.seznam)
    }
    
    try {
        const data = await Mediana.create(mediana)
        return res.send(data)
    } 
    catch (e) {
        console.log(e)
        return res.status(500).send({
            message: "Prišlo je do napake na strežniški strani"
        })
    }
        
}
const median = (values) => {
    if(values.length ===0) return 0;
  
    values.sort(function(a,b){
      return a-b;
    });
  
    var half = Math.floor(values.length / 2);
  
    if (values.length % 2)
      return values[half];
  
    return (values[half - 1] + values[half]) / 2.0;
}