using Core.Entities;

namespace Core.Specifications
{
    public class BookingWithFiltersForCountSpecificication : BaseSpecification<Booking>
    {
        public BookingWithFiltersForCountSpecificication(BookingParams parameters) : base(x =>
        (string.IsNullOrEmpty(parameters.Search) || x.Start.ToString().ToLower().Contains(parameters.Search)) &&
            (!parameters.Start.HasValue || x.Start.ToString() == parameters.Start.ToString()) &&
            (!parameters.End.HasValue || x.End.ToString() == parameters.End.ToString())
        )
        {
        }
    }
}
