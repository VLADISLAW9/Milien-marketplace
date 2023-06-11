namespace ServiceAPI.Models
{
    public class PaidAdDTO
    {
        public int Id { get; set; }
        public int AdId { get; set; }
        public DateTime ExpiryTime { get; set; }
    }
}
