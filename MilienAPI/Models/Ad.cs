using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MilienAPI.Models
{
    [Table("Ads")]
    public class Ad
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public double Price { get; set; }
        public int CustomerId { get; set; }
        public string Adress { get; set; }
        public string Category { get; set; }
        public string[]? PhotoPath { get; set; }
        public string? Subcategory { get; set; }
        public bool Premium { get; set; }
    }
}
