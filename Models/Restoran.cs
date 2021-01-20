using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Projekat2021_WEB.Models
{
    [Table("Restoran")]
    public class Restoran
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [DataType("nvarchar(255)")]
        public string Naziv { get; set; }

        [Column("RadnoVremeDo")]
        [DataType("nvarchar(255)")]
        public string RadnoVremeDo { get; set; }

        [Column("I")]
        public int I { get; set; }

        [Column("J")]
        public int J { get; set; }

        [Column("KapacitetStola")]
        public int KapacitetStola { get; set; }

        public virtual List<Sto> Stolovi { get; set; }
        public virtual List<Porudzbina> Porudzbine { get; set; }
    }
}
