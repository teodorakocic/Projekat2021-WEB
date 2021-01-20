import { Sto } from "./Sto.js";
import {Restoran} from "./Restoran.js"

fetch("https://localhost:5001/Restoran/PreuzmiRestorane").then(p => {
    p.json().then(data => {
        data.forEach(restoran => {
            const rest1 = new Restoran(restoran.id, restoran.naziv, restoran.radnoVremeDo, restoran.i, restoran.j, restoran.kapacitetStola);
            rest1.nacrtajRestoran(document.body);
            })
        });
 });