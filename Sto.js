export class Sto{
    constructor (x, y, maxKapacitet, rezim){
        this.x = x;
        this.y = y;
        this.trentniKapacitet = 0;
        this.maxKapacitet = maxKapacitet;
        this.rezim = rezim;
        this.rezervisan = 0;       
        this.stoContainer = null;
    }

    nacrtajSto(host){
        this.stoContainer = document.createElement("div");
        this.stoContainer.innerHTML = this.maxKapacitet;
        if (this.rezim == 1)
            this.stoContainer.className = "sto";
        else
            this.stoContainer.className = "covidTable";
        host.appendChild(this.stoContainer);
        
    }

    updateTable(rezervacija, x, y) {
        this.rezervisan = rezervacija;
        if (rezervacija === 0)
            this.stoContainer.className = "sto";
        else {
        if (this.rezim == 1)
            this.stoContainer.className = "rezSto";
        else
            this.stoContainer.className = "rezStoCovid";
    }
}

    deleteReservation(rezervacija, x, y) {
        this.rezervisan = rezervacija;
        if (rezervacija === 1) {
            if(this.rezim == 1)
                this.stoContainer.className = "rezSto"; 
            else
                this.stoContainer.className = "rezStoCovid";
        }
        else 
            this.stoContainer.className = "sto";
    }
}
