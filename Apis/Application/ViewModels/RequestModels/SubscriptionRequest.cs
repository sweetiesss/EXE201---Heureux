﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.RequestModels
{
    public class SubscriptionRequest
    {
        public string? Description { get; set; }

        public string Name { get; set; } = null!;

        public int Duration { get; set; }

        public decimal Price { get; set; }
    }
}
