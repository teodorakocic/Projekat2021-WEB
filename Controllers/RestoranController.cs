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
            return await Context.Restorani.ToListAsync();
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
       
    }
}
