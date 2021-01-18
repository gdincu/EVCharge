using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class ChargingPointLocationRepository : IGenericRepository<ChargingPointLocation>
    {
        private readonly AppDbContext _context;

        public ChargingPointLocationRepository(AppDbContext context)
        {
            _context = context;
        }

        public Task<int> CountAsync(ISpecification<ChargingPointLocation> spec)
        {
            throw new NotImplementedException();
        }

        public async Task<ActionResult<ChargingPointLocation>> CreateItemAsync(ChargingPointLocation entity)
        {
            _context.ChargingPointLocations.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<ActionResult<ChargingPointLocation>> DeleteItemAsync(int id)
        {
            var entity = await _context.ChargingPointLocations.FindAsync(id);

            _context.ChargingPointLocations.Remove(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public Task<ChargingPointLocation> GetEntityWithSpec(ISpecification<ChargingPointLocation> spec)
        {
            throw new NotImplementedException();
        }

        public async Task<ChargingPointLocation> GetItemByIdAsync(int id)
        {
            var entity = await _context.ChargingPointLocations.FirstOrDefaultAsync(p => p.Id == id);

            return entity;
        }

        public async Task<IReadOnlyList<ChargingPointLocation>> GetItemsAsync()
        {
            return await _context.ChargingPointLocations.ToListAsync();
        }

        public Task<IReadOnlyList<ChargingPointLocation>> ListAsync(ISpecification<ChargingPointLocation> spec)
        {
            throw new NotImplementedException();
        }

        public async Task<ActionResult<ChargingPointLocation>> UpdateItemAsync(int id, ChargingPointLocation entity)
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
