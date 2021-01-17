using Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IChargingPointRepository
    {
        Task<ChargingPoint> GetChargingPointByIdAsync(int id);
        Task<IReadOnlyList<ChargingPoint>> GetChargingPointsAsync();
        //Task<IReadOnlyList<ChargingPointLocation>> GetChargingPointLocationsAsync();
        //Task<IReadOnlyList<ChargingPointType>> GetChargingPointTypesAsync();
    }
}
