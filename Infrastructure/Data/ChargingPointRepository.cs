using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class ChargingPointRepository : IChargingPointRepository
    {
        private readonly AppDbContext _context;

        public ChargingPointRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyList<ChargingPoint>> GetChargingPointsAsync()
        {
            return await _context.ChargingPoints
                .Include(p => p.ChargingPointLocationId)
                .Include(p => p.ChargingPointTypeId)
                .ToListAsync();
        }

        public async Task<ChargingPoint> GetChargingPointByIdAsync(int id)
        {
            return await _context.ChargingPoints
                .Include(p => p.ChargingPointLocationId)
                .Include(p => p.ChargingPointTypeId)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IReadOnlyList<ChargingPointLocation>> GetChargingPointLocationsAsync()
        {
            return await _context.ChargingPointLocations.ToListAsync();
        }

        public async Task<IReadOnlyList<ChargingPointType>> GetChargingPointTypesAsync()
        {
            return await _context.ChargingPointTypes.ToListAsync();
        }
    }
}
