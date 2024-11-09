const express = require("express");
const app = express();

app.use(express.json());

const PORT = 3000;

const pizze = [
    { id: 1, naziv: "Margerita", cijena: 6.5 },
    { id: 2, naziv: "Salami", cijena: 8.5 },
    { id: 3, naziv: "Capriciossa", cijena: 9.5 },
];


app.get('/pizze/:id', (req, res) => {
    const id_pizza = req.params.id;
    const pizza = pizze.find(pizza => pizza.id == id_pizza);

    if (pizza) {
        res.json(pizza);
    } else {
        res.json({ message: 'Traženi ID ne postoji!' });
    }
});

const narudzbe = [];


app.post('/naruci', (req, res) => {
    const { narudzba, klijent } = req.body;
    let ukupna_cijena = 0;

    
    if (!(klijent && klijent.prezime && klijent.adresa && klijent.broj_telefona)) {
        res.send("Niste poslali sve potrebne podatke o klijentu.");
    }

    let narucenePizze = [];
    
    for (let nar of narudzba) {
        
        if (!(nar.pizza && nar.velicina && nar.kolicina)) {
            res.send("Niste poslali sve potrebne podatke za pizzu.");
        }

        
        const pizza = pizze.find(pizza => pizza.naziv === nar.pizza);
        if (!pizza) {
            res.send(`Pizza "${nar.pizza}" ne postoji u jelovniku.`);
        }

        ukupna_cijena += pizza.cijena * nar.kolicina;
        narucenePizze.push(nar); 
    }

    
    narudzbe.push({ narudzba, klijent });

    
    const message = `Vaša narudžba za ${narudzba.map(nar => `${nar.pizza} (${nar.velicina})`).join(' i ')} je uspješno zaprimljena!`;

    
    res.json({
        message: message,
        prezime: klijent.prezime,
        adresa: klijent.adresa,
        ukupna_cijena: ukupna_cijena
    });
});

app.listen(PORT, (error) => {
    if (error) {
        console.error("Greška pri pokretanju servera.");
    } else {
        console.log("Server uspješno pokrenut na portu " + PORT);
    }
});
