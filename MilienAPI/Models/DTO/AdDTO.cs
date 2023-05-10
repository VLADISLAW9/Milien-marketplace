﻿using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MilienAPI.Models.DTO
{
    [Table("Ads")]
    public class AdDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public int CustomerId { get; set; }
        public string Adress { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        [Column(TypeName = "category")]
        public Category Category { get; set; }
    }
}
