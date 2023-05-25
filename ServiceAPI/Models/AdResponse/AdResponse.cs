namespace ServiceAPI.Models.AdResponse
{
    public class AdResponse
    {
        public string Title { get; set; }
        public string? Description { get; set; }
        public double Price { get; set; }
        public string Adress { get; set; }
        public string Category { get; set; }
        public List<IFormFile>? Images { get; set; }
    }
}
