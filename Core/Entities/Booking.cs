using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Booking : BaseEntity
    {
        public int UserId { get; set; }
        public int ChargingPointId { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public decimal Price { get; set; }
        public DateTime CreatedTimestamp { get; set; }
    }
}
