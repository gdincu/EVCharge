using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class ChargingPointType : BaseEntity
    {
        public string Name { get; set; }
        public decimal PowerRatingKW { get; set; }
    }
}
