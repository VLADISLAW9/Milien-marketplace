using System.ComponentModel.DataAnnotations;

namespace ServiceAPI.Models.DTO
{
    public class AdDTO
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public int CustomerId { get; set; }
        public string Adress { get; set; }
        public string Category { get; set; }
        public string[]? PhotoPath { get; set; }
        public string? Subcategory { get; set; }
        public bool Premium { get; set; }
    }
}
