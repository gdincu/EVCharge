using Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IChargingPointRepository
    {
        Task<ChargingPoint> GetItemByIdAsync(int id);
        Task<IReadOnlyList<ChargingPoint>> GetItemsAsync();
        Task<IReadOnlyList<ChargingPointLocation>> GetChargingPointLocationsAsync();
        Task<IReadOnlyList<ChargingPointType>> GetChargingPointTypesAsync();
    }
}
