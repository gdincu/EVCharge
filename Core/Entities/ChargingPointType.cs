using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public enum ChargingPointType : byte
    {
        slow = 1,
        rapid = 2,
        fast = 3
    }
}
