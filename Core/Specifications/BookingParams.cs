using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Specifications
{
    public class BookingParams
    {
        private const int MaxPageSize = 20;
        public int PageIndex { get; set; } = 1;

        private int _pageSize = 10;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }

        public string Sort { get; set; }

        private string _search;
        public string Search
        {
            get => _search;
            set => _search = value.ToLower();
        }
    }
}
