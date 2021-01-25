using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Projekat2021_WEB.Models;

namespace Projekat2021_WEB.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RestoranController : ControllerBase
    {
        public RestoranContext Context { get; set; }

        public RestoranController(RestoranContext context)
        {
            Context = context;
        }

        [Route("PreuzmiRestorane")]
        [HttpGet]
        public async Task<List<Restoran>> PreuzmiRestorane()
        { 
            return await Context.Restorani.Include(p=> p.Stolovi).Include(p=>p.Porudzbine).ToListAsync();
        }

        [Route("UpisiRestoran")]
        [HttpPost]
        public async Task UpisiRestoran([FromBody] Restoran restoran)
        {
            Context.Restorani.Add(restoran);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniRestoran")]
        [HttpPut]
        public async Task IzmeniRestoran([FromBody] Restoran restoran)
        {
            Context.Update<Restoran>(restoran);
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiRestoran/{id}")]
        [HttpDelete]
        public async Task IzbrisiRestoran(int id)
        {
          var stol=Context.Stolovi.Where(s=>s.Restoran.ID==id);
            await stol.ForEachAsync(s=>{
                Context.Remove(s);
            });
            var porudzb=Context.Porudzbine.Where(s=>s.Restoran.ID==id);
            await porudzb.ForEachAsync(s=>{
                Context.Remove(s);
            });
           var restoran = await Context.Restorani.FindAsync(id);
            Context.Remove(restoran);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniSto/{id}")]
        [HttpPut]
        public async Task IzmeniSto(int id)
        {
            var sto = await Context.Stolovi.FindAsync(id);
            sto.Rezervisan = true;
            Context.Stolovi.Update(sto);
            await Context.SaveChangesAsync();
        }

        [Route("ObrisiSveStolove")]
        [HttpPost]
        public async Task ObrisiSveStolove(){
            
            foreach (var p in Context.Stolovi)
            {
                Context.Remove(p);
            }
            await Context.SaveChangesAsync();
        }
       
        [Route("IzmeniPorudzbinu")]
        [HttpPut]
        public async Task IzmeniSmenu([FromBody] Porudzbina porudzbina)
        {
            Context.Update<Porudzbina>(porudzbina);
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiPorudzbinu")]
        [HttpDelete]
        public async Task IzbrisiPorudzbinu(int id)
        {
           var porudzbina = await Context.Porudzbine.FindAsync(id);
            Context.Remove(porudzbina);
            await Context.SaveChangesAsync();
        }

        [Route("UpisPorudzbine/{idRestoran}")]
        [HttpPost]
        public async Task UpisPorudzbine(int idRestoran,[FromBody] Porudzbina porudzbina)
        {
            var restoran=await Context.Restorani.FindAsync(idRestoran);
            porudzbina.Restoran=restoran;
            Context.Porudzbine.Add(porudzbina);
            await Context.SaveChangesAsync();
        }

        [Route("PreuzmiPorudzbine/{idRestoran}")]
        [HttpGet]
        public async Task<List<Porudzbina>> PreuzmiPorudzbine(int idRestoran)
        {
            return await Context.Porudzbine.Where(porudzbina=> porudzbina.Restoran.ID==idRestoran).ToListAsync();
        }

        [Route("PreuzmiStolove/{idRestoran}")]
        [HttpGet]
        public async Task<List<Sto>> PreuzmiStolove(int idRestoran)
        {
            return await Context.Stolovi.Where(sto => sto.Restoran.ID==idRestoran).ToListAsync();
        }
    }
}
