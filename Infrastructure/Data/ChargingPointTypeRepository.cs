using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class ChargingPointTypeRepository : IGenericRepository<ChargingPointType>
    {
        private readonly AppDbContext _context;

        public ChargingPointTypeRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ActionResult<ChargingPointType>> CreateItemAsync(ChargingPointType entity)
        {
            _context.ChargingPointTypes.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<ActionResult<ChargingPointType>> DeleteItemAsync(int id)
        {
            var entity = await _context.ChargingPointTypes.FindAsync(id);

            _context.ChargingPointTypes.Remove(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<ChargingPointType> GetItemByIdAsync(int id)
        {
            var entity = await _context.ChargingPointTypes.FirstOrDefaultAsync(p => p.Id == id);

            return entity;
        }

        public async Task<IReadOnlyList<ChargingPointType>> GetItemsAsync()
        {
            return await _context.ChargingPointTypes.ToListAsync();
        }

        public async Task<ActionResult<ChargingPointType>> UpdateItemAsync(int id, ChargingPointType entity)
        {
            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return entity;
        }
    }
}
