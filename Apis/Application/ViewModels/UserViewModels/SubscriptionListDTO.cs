using AutoMapper.Configuration.Conventions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.UserViewModels
{
    public class SubscriptionListDTO
    {
        public int Id { get; set; }
        public string? Description { get; set; }

        public string Name { get; set; } = null!;

        public int Duration { get; set; }

        public decimal Price { get; set; }
    }
}
