﻿using System.ComponentModel.DataAnnotations.Schema;

namespace IdentityAPI.Models
{
    [Table("Customers")]
    public class Customer
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Pass { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string PhoneNumber { get; set; }
    }
}
