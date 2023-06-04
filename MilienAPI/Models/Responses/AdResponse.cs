using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;

namespace MilienAPI.Models.DTO
{
    [Table("Ads")]
    public class AdResponse
    {
        public string Title { get; set; }
        public string? Description { get; set; }
        public double Price { get; set; }
        public string Adress { get; set; }
        public string Category { get; set; }
        public string Subcategory { get; set; }
        public IFormFileCollection? Images { get; set; }
    }
}
