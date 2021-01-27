import {Sto} from "./Sto.js"
import {Porudzbina} from "./Porudzbina.js"

export class Restoran {
    constructor(id, naziv, radnoVremeDo, i, j, kapacitetStola) {
        this.id = id;           
        this.naziv = naziv;
        this.radnoVremeDo = radnoVremeDo;        
        this.i = i;
        this.j = j;
        this.kapacitetStola = kapacitetStola;          
        this.stolovi = [];
        this.porudzbine = [];
        this.kontejner = null;
    }

    nacrtajRestoran(host) {
        if (!host)
            throw new Exception("Parent element does not exist!");
        
        this.kontejner = document.createElement("div");
        this.kontejner.className = "kontejner";
        host.appendChild(this.kontejner);
    
        this.nacrtajFormu(this.kontejner);
    }

    nacrtajFormu(host) {
        const kontejnerForma = document.createElement("div");
        kontejnerForma.className = "kontejnerForma";
        host.appendChild(kontejnerForma);

        let linebreak = document.createElement("br");

        let elLabela = document.createElement("h3");
        elLabela.innerHTML = "Informacije o restoranu \"" + this.naziv + "\"";
        kontejnerForma.appendChild(elLabela);

        const zaglavljeForma = document.createElement("div");
        zaglavljeForma.className = "zaglavlje";
        kontejnerForma.appendChild(zaglavljeForma);

        elLabela = document.createElement("h4");
        elLabela.innerHTML = "Režim rada: ";
        zaglavljeForma.appendChild(elLabela);

        let rezim = ["COVID-19", "Normal"];
        let divEl = null;
        let opcija = null;
        let labela = null;
        rezim.forEach((el, index) => {
            divEl = document.createElement("div");
            opcija = document.createElement("input");
            opcija.type = "radio";
            opcija.name = this.naziv;
            opcija.value = index;

            labela = document.createElement("label");
            labela.innerHTML = el;

            divEl.appendChild(opcija);
            divEl.appendChild(labela);
            zaglavljeForma.appendChild(divEl);
        })
        
        zaglavljeForma.appendChild(linebreak);

        let dugmeUredi = document.createElement("button");
        dugmeUredi.className = "dugme1";
        dugmeUredi.innerHTML = "Uredi restoran";
        zaglavljeForma.appendChild(dugmeUredi);

        let radnoVremeForma = document.createElement("div");
        radnoVremeForma.className = "rVreme";
        zaglavljeForma.appendChild(radnoVremeForma);

        
        dugmeUredi.onclick = (ev) => {
            
            const raspored = this.kontejner.querySelector(`input[name='${this.naziv}']:checked`);
            if (this.kapacitetStola != 0) {

            if (raspored == null)
                alert("Molimo Vas izaberite režim rada u kojem se trenutno nalazi restoran");

            else {
                
            if (raspored.value == 0) {
                this.kapacitetStola = 4;
                this.nacrtajStolove(this.kontejner);
                this.radnoVremeDo = "18:00";
                this.dodajVreme(this.radnoVremeDo, radnoVremeForma);
            }
            if (raspored.value == 1) {
                this.kapacitetStola = this.kapacitetStola;
                this.nacrtajStolove(this.kontejner);
                this.radnoVremeDo = this.radnoVremeDo;
                this.dodajVreme(this.radnoVremeDo, radnoVremeForma);
            }
            
            elLabela = document.createElement("label");
            elLabela.innerHTML = "Rezerviši sto: ";
            kontejnerForma.appendChild(elLabela);
            kontejnerForma.appendChild(linebreak);

            let red = this.dodajOpcije("Red u sali  ", this.j, kontejnerForma);

            let kolona = this.dodajOpcije("Kolona u sali  ", this.i, kontejnerForma);

            kontejnerForma.appendChild(linebreak);

            const dugme = document.createElement("button");
            dugme.className = "dugme";
            dugme.innerHTML = "Dodaj rezervaciju";
            kontejnerForma.appendChild(dugme);

            dugme.onclick = (ev) => {
                let x = parseInt(red.value);
                let y = parseInt(kolona.value);

                if(this.stolovi[x * this.i + y].rezervisan === 0)
                    this.stolovi[x * this.i + y].updateTable(1, x, y);
                else
                    alert("Sto je već rezervisan!");
                }

            const dugme2 = document.createElement("button");
            dugme2.className = "dugme";
            dugme2.innerHTML = "Rezervacija istekla";
            kontejnerForma.appendChild(dugme2);

            dugme2.onclick = (ev) => {
                let a = parseInt(red.value);
                let b = parseInt(kolona.value);

                if(this.stolovi[a * this.i + b].rezervisan === 1)
                    this.stolovi[a * this.i + b].deleteReservation(0, a, b);
                else
                    alert("Sto nije bio rezervisan!");
                }

            let porudzbineForma = document.createElement("div");
            porudzbineForma.className = "porudzbineForma";
            host.appendChild(porudzbineForma);

            elLabela = document.createElement("h4");
            elLabela.innerHTML = "Lista porudzbina: ";
            porudzbineForma.appendChild(elLabela);

            this.inicijalnaLista(porudzbineForma);

            this.zaNovePorudzbine(porudzbineForma, "Sto koji poručuje", "brojPorudzbina");
            this.zaNovePorudzbine(porudzbineForma, "Broj stavki", "stavke");
            this.zaNovePorudzbine(porudzbineForma, "Cena", "cena");
            this.zaNovePorudzbine(porudzbineForma, "Vreme spremanja", "vreme");

            const dugmeDodaj = document.createElement("button");
            dugmeDodaj.className = "dugme";
            dugmeDodaj.innerHTML = "Ažuriraj porudzbinu";
            porudzbineForma.appendChild(dugmeDodaj);

            let pomocnaForma = document.createElement("div");
            pomocnaForma.className = "pomocnaForma";
            porudzbineForma.appendChild(pomocnaForma);

            elLabela = document.createElement("h4");
            elLabela.innerHTML = "Red za spremnje: ";
            pomocnaForma.appendChild(elLabela);
            let niz = [];
            let stavke = [];
            let cene = [];
            let vreme = [];
            for(let a=0; a<this.i*this.j; a++) {
                niz.push(0);
                stavke.push(0);
                cene.push(0);
                vreme.push(0);

            }
            let zarada = 0;
            dugmeDodaj.onclick = (ev) => {
                const redniBr = this.kontejner.querySelector(".brojPorudzbina").value;
                const broj = this.kontejner.querySelector(".stavke").value;
                const ce = this.kontejner.querySelector(".cena").value;
                const time = this.kontejner.querySelector(".vreme").value;

                if (redniBr != 0 && broj != 0 && ce != 0 && time != 0) {
                    if(redniBr < this.i*this.j){
                    fetch("https://localhost:5001/Restoran/UpisPorudzbine/" + this.id, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        redniBroj: redniBr,
                        brojStavki: broj,
                        cena: ce,
                        vremeSpremanja: time
                    })
                }).then(p => {
                    if(p.ok){
                        p.json().then(q => {
                            this.porudzbine[redniBr] = new Porudzbina(redniBr, broj, ce, time, 1);
                            niz[redniBr] = 1;
                            stavke[redniBr] = broj;
                            cene[redniBr] = ce;
                            zarada += parseInt(cene[redniBr]);
                            vreme[redniBr] = time;
                            this.porudzbine[redniBr].napisiPorudzbinu(pomocnaForma);
                        });
                    }
                    else if(p.status == 406){
                        alert("Sto sa zadatim rednim brojem ne postoji");
                    }
                }).catch (p => {
                    alert("Molimo Vas popunite sve stavke za unos nove porudzbine!");
                });
            }
                    /*if (redniBr < this.i*this.j) {
                    if(niz[redniBr] != 1) {
                    this.porudzbine[redniBr] = new Porudzbina(redniBr, broj, ce, time, 1);
                    niz[redniBr] = 1;
                    stavke[redniBr] = broj;
                    cene[redniBr] = ce;
                    zarada += parseInt(cene[redniBr]);
                    vreme[redniBr] = time;
                    this.porudzbine[redniBr].napisiPorudzbinu(pomocnaForma);
                }
                else
                    alert("Sto je već poručio!");
                    }*/
                    else
                        alert("Sto sa zadatim rednim brojem ne postoji");
                }
                else
                    alert("Molimo Vas popunite sve stavke za unos nove porudzbine!");
                }

                
                let pomocnaForma2 = document.createElement("div");
                pomocnaForma2.className = "pomocnaForma2";
                porudzbineForma.appendChild(pomocnaForma2);

                this.zaNovePorudzbine(porudzbineForma, "Sto koji povlači porudzbinu", "obrisanaPorudzbina");
                const dugmeObrisi = document.createElement("button");
                dugmeObrisi.className = "dugme";
                dugmeObrisi.innerHTML = "Ukloni porudzbinu";
                porudzbineForma.appendChild(dugmeObrisi);

                this.zaNovePorudzbine(porudzbineForma, "Pogledajte porudzbinu", "procitanaPorudzbina");
                const dugmeProcitaj = document.createElement("button");
                dugmeProcitaj.className = "dugme";
                dugmeProcitaj.innerHTML = "Prikaži porudzbinu";
                porudzbineForma.appendChild(dugmeProcitaj);

                dugmeProcitaj.onclick = (ev) => {
                    const read = this.kontejner.querySelector(".procitanaPorudzbina").value;
                    if (niz[read] == 1 && niz[read] != null) 
                        this.procitajPorudzbinu(read, stavke[read], vreme[read], cene[read]);
                    else
                        alert("Ne postoji porudzbina za dati sto!");
                }

                elLabela = document.createElement("h4");
                elLabela.innerHTML = "Red izbačenih porudzbina: ";
                pomocnaForma2.appendChild(elLabela);

                dugmeObrisi.onclick = (ev) => {
                    
                    const deleted = this.kontejner.querySelector(".obrisanaPorudzbina").value;

                    if (niz[deleted] == 1) {
                        this.porudzbine[deleted].napisiPorudzbinu(pomocnaForma2);
                        this.obrisiPorudzbinu(deleted);
                        zarada -= parseInt(cene[deleted]);
                        niz[deleted] = 0;
                    }
                    else
                        alert("Dati sto nije još uvek ništa poručio!");
                }

                const dugmeZarada = document.createElement("button");
                dugmeZarada.className = "dugme";
                dugmeZarada.innerHTML = "Zarada";
                porudzbineForma.appendChild(dugmeZarada);
                dugmeZarada.onclick = (ev) => {
                    alert("Do ovog trenutka za današnji dan restoran je zaradio " + zarada + " RSD.");
                }
                }
            }
            else
            alert("Već ste uneli režim rada za dati restoran!");
        
        }
    }


    dodajVreme(vreme, host) {
        const pomocna = document.createElement("br");
        host.appendChild(pomocna);
        const labela = document.createElement("label");
        labela.innerHTML = "Radno vreme restorana je do " + vreme + "h.";
        host.appendChild(labela);
    }

    dodajOpcije(imeLab, brojac, host) {
        let opcija = null;
        let deoZaRez = document.createElement("div");
        let selectX = document.createElement("select");
        let labela = document.createElement("label");
        labela.innerHTML = imeLab;
        deoZaRez.appendChild(labela);
        deoZaRez.appendChild(selectX);

        for (let t = 0; t < brojac; t++) {
            opcija = document.createElement("option");
            opcija.innerHTML = t;
            opcija.value = t;
            selectX.appendChild(opcija);
        }

        host.appendChild(deoZaRez);
        return selectX;
    }

    zaNovePorudzbine(host, imeLab, klasa) {
        let elLabela = document.createElement("label");
        elLabela.innerHTML = imeLab;
        host.appendChild(elLabela);

        let tb = document.createElement("input");
        tb.type = "number";
        tb.className = klasa;
        host.appendChild(tb);
    }

    vratiRezim() {
        return this.kontejner.querySelector(`input[name='${this.naziv}']:checked`).value;
    }

    nacrtajStolove(host) {
        const kontStolovi = document.createElement("div");
        kontStolovi.className = "kontStolovi";
        host.appendChild(kontStolovi);
        let red;
        let sto;
        for (let t = 0; t < this.j; t++) {
            red = document.createElement("div");
            red.className = "red";
            kontStolovi.appendChild(red);
            for (let k = 0; k < this.i; k++) {
                sto = new Sto(t, k, this.kapacitetStola, this.vratiRezim());
                this.dodajSto(sto);
                sto.nacrtajSto(red);
            }
        }
    }

    inicijalnaLista(host) {
        const kontPorudzbine = document.createElement("div");
        kontPorudzbine.className = "kontPorudzbine";
        host.appendChild(kontPorudzbine);
        let por;
        for (let t = 0; t < this.i*this.j; t++) {
            por = new Porudzbina(t, 0, 0, 0, 0);
            this.dodajPorudzbinu(por);
            por.napisiPorudzbinu(kontPorudzbine);
    }
}

    dodajSto(sto) {
        this.stolovi.push(sto);
    }

    dodajPorudzbinu(por) {
        this.porudzbine.push(por);
    }

    obrisiPorudzbinu(index) {
        this.porudzbine = this.porudzbine.filter(el => el !== this.porudzbine[index]);
    }

    procitajPorudzbinu(a, b, c, d) {
        if (b >= 5)
            alert("Porudzbina za sto sa redni brojem " + a + " sadrži " + b + " stavki, vreme potrebno za pripremu je " + c +
            " minuta, a cena iste iznosi " + d + " RSD.");
        else if (b > 1)
            alert("Porudzbina za sto sa redni brojem " + a + " sadrži " + b + " stavke, vreme potrebno za pripremu je " + c +
            " minuta, a cena iste iznosi " + d + " RSD.");
        else
            alert("Porudzbina za sto sa redni brojem " + a + " sadrži " + b + " stavku, vreme potrebno za pripremu je " + c +
            " minuta, a cena iste iznosi " + d + " RSD.");
    }
}