export class Porudzbina {
    constructor(redniBroj, brojStavki, cena, vremeSpremanja, par) {
        this.redniBroj = redniBroj;
        this.brojStavki = brojStavki;
        this.cena = cena;
        this.vremeSpremanja = vremeSpremanja;
        this.par = par;
        this.jeloContainer = null;
    }

    napisiPorudzbinu(host) {
        this.jeloContainer = document.createElement("div");
        this.jeloContainer.innerHTML = this.redniBroj + ".";
        if (this.vremeSpremanja == 0)
            this.jeloContainer.className = "porudzbina";
        else if (this.vremeSpremanja > 25)
            this.jeloContainer.className = "dugoCekanje";
        else 
            this.jeloContainer.className = "kratkoCekanje";
        host.appendChild(this.jeloContainer);
    }
}