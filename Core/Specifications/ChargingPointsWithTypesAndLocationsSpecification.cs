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
            AddInclude(x => x.ChargingPointTypeId);
            AddInclude(x => x.ChargingPointLocationId);
            AddOrderBy(x => x.Name);
            ApplyPaging(parameters.PageSize * (parameters.PageIndex - 1),parameters.PageSize);

            if(!string.IsNullOrEmpty(parameters.Sort))
            {
                switch (parameters.Sort.ToLower())
                {
                    //Order by location
                    case "locationasc":
                        AddOrderBy(x => x.ChargingPointLocationId);
                        break;
                    case "locationdesc":
                        AddOrderByDescending(x => x.ChargingPointLocationId);
                        break;
                    //Order by type
                    case "typeasc":
                        AddOrderBy(x => x.ChargingPointTypeId);
                        break;
                    case "typedesc":
                        AddOrderByDescending(x => x.ChargingPointTypeId);
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
            AddInclude(x => x.ChargingPointTypeId);
            AddInclude(x => x.ChargingPointLocationId);
        }
    }
#nullable restore
}
