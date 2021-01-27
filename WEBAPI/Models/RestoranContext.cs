using Microsoft.EntityFrameworkCore;

namespace Projekat2021_WEB.Models
{
    public class RestoranContext : DbContext
    {
        public DbSet<Restoran> Restorani { get; set; }
        public DbSet<Sto> Stolovi { get; set; }
        public DbSet<Porudzbina> Porudzbine { get; set; }

        public RestoranContext(DbContextOptions options) : base(options)
        {
            
        }       
    }
}
