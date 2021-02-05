using Core.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class ChargingPointToReturnDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public string ChargingPointLocation { get; set; }
        [Required]
        public string ChargingPointType { get; set; }
        public int QtyTotal { get; set; }
        public int QtyAvailable { get; set; }
    }
}