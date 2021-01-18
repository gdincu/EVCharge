using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class ChargingPointTypeRepository : IGenericRepository<Booking>
    {
        public Task<ActionResult<Booking>> CreateItemAsync(Booking entity)
        {
            throw new NotImplementedException();
        }

        public Task<ActionResult<Booking>> DeleteItemAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Booking> GetItemByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyList<Booking>> GetItemsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<ActionResult<Booking>> UpdateItemAsync(int id, Booking entity)
        {
            throw new NotImplementedException();
        }
    }
}
