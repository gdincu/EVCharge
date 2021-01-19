using Core.Entities;

namespace Core.Specifications
{
#nullable enable
    public class ChargingPointsWithTypesAndLocationsSpecification : BaseSpecification<ChargingPoint>
    {
        public ChargingPointsWithTypesAndLocationsSpecification(ChargingPointParams parameters) : base(x => (
            (string.IsNullOrEmpty(parameters.Search) || x.Name.ToLower().Contains(parameters.Search)) &&
            (!parameters.LocationId.HasValue || x.ChargingPointLocationId == parameters.LocationId) &&
            (!parameters.TypeId.HasValue || x.ChargingPointTypeId == parameters.TypeId)
          ))
        {
            AddInclude(x => x.ChargingPointType);
            AddInclude(x => x.ChargingPointLocation);
            AddOrderBy(x => x.Name);
            ApplyPaging(parameters.PageSize * (parameters.PageIndex - 1),parameters.PageSize);

            if(!string.IsNullOrEmpty(parameters.Sort))
            {
                switch (parameters.Sort.ToLower())
                {
                    //Order by location
                    case "locationasc":
                        AddOrderBy(x => x.ChargingPointLocation.Name);
                        break;
                    case "locationdesc":
                        AddOrderByDescending(x => x.ChargingPointLocation.Name);
                        break;
                    //Order by type
                    case "typeasc":
                        AddOrderBy(x => x.ChargingPointType.Name);
                        break;
                    case "typedesc":
                        AddOrderByDescending(x => x.ChargingPointType.Name);
                        break;
                    //Order by price
                    case "priceasc":
                        AddOrderBy(x => x.Price);
                        break;
                    case "pricedesc":
                        AddOrderByDescending(x => x.Price);
                        break;
                    //Default order by
                    default:
                        AddOrderBy(x => x.Name);
                        break;
                }
            }
        }

        public ChargingPointsWithTypesAndLocationsSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ChargingPointType);
            AddInclude(x => x.ChargingPointLocation);
        }
    }
#nullable restore
}
