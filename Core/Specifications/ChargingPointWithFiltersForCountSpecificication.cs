using Core.Entities;

namespace Core.Specifications
{
    public class ChargingPointWithFiltersCount : BaseSpecification<ChargingPoint>
    {
        public ChargingPointWithFiltersCount(ChargingPointParams parameters) : base(x =>
        (string.IsNullOrEmpty(parameters.Search) || x.Name.ToLower().Contains(parameters.Search)) &&
        (!parameters.LocationId.HasValue || x.ChargingPointLocationId == parameters.LocationId) &&
        (!parameters.TypeId.HasValue || x.ChargingPointTypeId == parameters.TypeId)
        )
        {
        }
    }
}
