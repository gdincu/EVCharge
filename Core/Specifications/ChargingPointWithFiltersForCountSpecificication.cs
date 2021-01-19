using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

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
