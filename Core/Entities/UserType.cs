using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public enum UserType : byte
    {
        admin = 1,
        client = 2,
        owner = 3
    }
}
