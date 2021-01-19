using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() 
        {
            CreateMap<ChargingPoint, ChargingPointToReturnDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
                .ForMember(d => d.ChargingPointLocation, o => o.MapFrom(s => s.ChargingPointLocation.Name))
                .ForMember(d => d.ChargingPointType, o => o.MapFrom(s => s.ChargingPointType.Name));
        }
    }
}