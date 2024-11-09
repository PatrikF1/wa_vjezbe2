const express = require("express");
const app = express();

app.use(express.json())

const PORT = 3000;


const pizze = [
     { id: 1, naziv: "Margerita", cijena: 6.5 },
     { id: 2, naziv: "Salami", cijena: 8.5 },
     { id: 3, naziv: "Capriciossa", cijena: 9.5 },
]

app.get('/pizze/:id', (req,res) => {
    const id_pizza = req.params.id;

   const pizza = pizze.find(pizza => pizza.id == id_pizza);


    if(pizza){
        res.json(pizza)
    } else {
        res.json( {message: 'trazeni ID ne postoji!'} )
    }
    
})


const narudzbe = [];


app.post('/naruci', (req, res) => {
    const narudzba = req.body;
    let narucenePizze = []
    
    for (let nar of narudzba) {
        const kljucevi = Object.keys(nar);
    
    if(!(kljucevi.includes('pizza') && kljucevi.includes('velicina') && kljucevi.includes('kolicina'))){
        res.send("Niste poslali sve potrebne podatke")
        
    }
    const pizza = pizze.find(pizza => pizza.naziv == nar.pizza);
    if (!pizza){
        res.send("pizza ne postoji u jelovniku")
    }
    
    narucenePizze.push(nar.pizza)
    narudzbe.push(nar)
};
    

    res.send("pizze koje su narucene: " + narucenePizze )
    
})



app.listen(PORT, error => {
    if(error){
        console.error("Greska otvaranja servera");
    }
    else {
        console.log("server uspijesno pokrenut")
    }
});


