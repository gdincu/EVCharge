﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class ChargingPoint: BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int ChargingPointLocationId { get; set; }
        public ChargingPointType ChargingPointType { get; set; }
        public decimal Price { get; set; }
    }
}
