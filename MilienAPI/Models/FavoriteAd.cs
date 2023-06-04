using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MilienAPI.Models
{
    [Table("Favorites")]
    public class FavoriteAd
    {
        [Key]
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int AdId { get; set; }
    }
}
