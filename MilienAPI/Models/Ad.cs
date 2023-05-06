using MilienAPI.Models;

namespace MilienAPI.Models
{
    public class Ad
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public Customer CutomerId { get; set; }
    }
}
