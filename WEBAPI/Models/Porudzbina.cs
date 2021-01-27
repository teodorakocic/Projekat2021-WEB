using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Projekat2021_WEB.Models
{
    [Table("Porudzbina")]
    public class Porudzbina
    {
        [Key]
        [Column("RedniBroj")]
        public int RedniBroj { get; set; }

        [Column("BrojStavki")]
        [DataType("int")]
        public int BrojStavki { get; set; }

        [Column("Cena")]
        [DataType("int")]
        public int Cena { get; set; }

        [Column("VremeSpremanja")]
        public int VremeSpremanja { get; set; }

        [JsonIgnore]
        public Restoran Restoran { get; set; }
    }
}
