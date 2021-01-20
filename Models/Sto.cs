using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Projekat2021_WEB.Models
{
    [Table("Sto")]
    public class Sto
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("MaxKapacitet")]
        public int MaxKapacitet { get; set; }

        [Column("X")]
        public int X { get; set; }

        [Column("Y")]
        public int Y { get; set; }

        [Column("Rezervisan")]
        [DataType("bool")]
        public bool Rezervisan { get; set; }

        [JsonIgnore]
        public Restoran Restoran { get; set; }
    }
}
