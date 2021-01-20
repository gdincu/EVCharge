using Core.Entities;

namespace Core.Specifications
{
#nullable enable
    public class BookingWithDatesSpecification : BaseSpecification<Booking>
    {
        public BookingWithDatesSpecification(BookingParams parameters) {
            
            ApplyPaging(parameters.PageSize * (parameters.PageIndex - 1), parameters.PageSize);

            if (!string.IsNullOrEmpty(parameters.Sort))
            {
                switch (parameters.Sort.ToLower())
                {
                    //Order by end date
                    case "enddateasc":
                        AddOrderBy(x => x.End.Date);
                        break;
                    case "enddatedesc":
                        AddOrderByDescending(x => x.End.Date);
                        break;
                    //Order by start date
                    case "startdateasc":
                        AddOrderBy(x => x.Start.Date);
                        break;
                    case "startdatedesc":
                        AddOrderByDescending(x => x.Start.Date);
                        break;
                    //Default order by
                    default:
                        AddOrderBy(x => x.Start.Date);
                        break;
                }
            }
        }

        public BookingWithDatesSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.Start.ToString());
            AddInclude(x => x.End.ToString());
        }
    }
#nullable restore
}
