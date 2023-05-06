using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.ComponentModel.DataAnnotations.Schema;

namespace MilienAPI.Models
{
    public class CustomerDTO
    {
        public string Login { get; set; }
        public string Pass { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string PhoneNumber { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        [Column(TypeName = "status")]
        public Status Status { get; set; }
    }
}
