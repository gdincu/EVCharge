using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class ChargingPointRepository : IGenericRepository<ChargingPoint>
    {
        private readonly AppDbContext _context;

        public ChargingPointRepository(AppDbContext context)
        {
            _context = context;
        }

        public Task<int> CountAsync(ISpecification<ChargingPoint> spec)
        {
            throw new System.NotImplementedException();
        }

        public async Task<ActionResult<ChargingPoint>> CreateItemAsync(ChargingPoint chargingPoint)
        {
            _context.ChargingPoints.Add(chargingPoint);
            await _context.SaveChangesAsync();
            return chargingPoint;
        }

        public async Task<ActionResult<ChargingPoint>> DeleteItemAsync(int id)
        {
            var chargingPoint = await _context.ChargingPoints.FindAsync(id);
            
            _context.ChargingPoints.Remove(chargingPoint);
            await _context.SaveChangesAsync();

            return chargingPoint;
        }

        public Task<ChargingPoint> GetEntityWithSpec(ISpecification<ChargingPoint> spec)
        {
            throw new System.NotImplementedException();
        }

        public async Task<ChargingPoint> GetItemByIdAsync(int id)
        {
            var chargingPoint = await _context.ChargingPoints
                                      .FirstOrDefaultAsync(p => p.Id == id);

            return chargingPoint;
        }

        public async Task<IReadOnlyList<ChargingPoint>> GetItemsAsync()
        {
            return await _context.ChargingPoints.ToListAsync();
        }

        public Task<IReadOnlyList<ChargingPoint>> ListAsync(ISpecification<ChargingPoint> spec)
        {
            throw new System.NotImplementedException();
        }

        public async Task<ActionResult<ChargingPoint>> UpdateItemAsync(int id, ChargingPoint chargingPoint)
        {
           _context.Entry(chargingPoint).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return chargingPoint;
        }

    }
}
