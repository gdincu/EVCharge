using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using API.Errors;
using AutoMapper;
using API.Dtos;
using API.Helpers;

namespace API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ChargingPointsController : BaseApiController
    {
        private readonly IGenericRepository<ChargingPoint> _chargingPointRepository;
        private readonly IGenericRepository<ChargingPointType> _chargingPointTypeRepository;
        private readonly IGenericRepository<ChargingPointLocation> _chargingPointLocationRepository;
        private readonly IMapper _mapper;

        public ChargingPointsController(IGenericRepository<ChargingPoint> chargingPointRepository, 
            IGenericRepository<ChargingPointType> chargingPointTypeRepository,
            IGenericRepository<ChargingPointLocation> chargingPointLocationRepository,
            IMapper mapper)
        {
            _chargingPointRepository = chargingPointRepository;
            _chargingPointLocationRepository = chargingPointLocationRepository;
            _chargingPointTypeRepository = chargingPointTypeRepository;
            _mapper = mapper;
        }

        // GET: api/ChargingPoints
        [HttpGet]
        public async Task<ActionResult<Pagination<ChargingPointToReturnDto>>> GetChargingPoints([FromQuery]ChargingPointParams parameters)
        {
            var spec = new ChargingPointsWithTypesAndLocationsSpecification(parameters);
            var countSpec = new ChargingPointWithFiltersCount(parameters);
            var totalItems = await _chargingPointRepository.CountAsync(countSpec);
            var chargingPoints = await _chargingPointRepository.ListAsync(spec);
            var data = _mapper.Map<IReadOnlyList<ChargingPoint>, IReadOnlyList<ChargingPointToReturnDto>>(chargingPoints);

            if (chargingPoints == null) return NotFound(new ApiResponse(404));

            return Ok(new Pagination<ChargingPointToReturnDto>(parameters.PageIndex, parameters.PageSize, totalItems, data));

        }

        // GET: api/ChargingPoints/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChargingPoint>> GetChargingPoint(int id)
        {
            var chargingPoint = await _chargingPointRepository.GetItemByIdAsync(id);

            if (chargingPoint == null)
            {
                return NotFound();
            }

            return chargingPoint;
        }

        // PUT: api/ChargingPoints/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChargingPoint(int id, ChargingPoint chargingPoint)
        {
            if (id != chargingPoint.Id)
            {
                return BadRequest();
            }

            var updatedChargingPoint = await _chargingPointRepository.UpdateItemAsync(id,chargingPoint);

            return Ok(updatedChargingPoint);

        }

        // POST: api/ChargingPoints
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ChargingPoint>> PostChargingPoint(ChargingPoint chargingPoint)
        {

            await _chargingPointRepository.CreateItemAsync(chargingPoint);

            return Ok(chargingPoint);

        }

        // DELETE: api/ChargingPoints/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ChargingPoint>> DeleteChargingPoint(int id)
        {
            ChargingPoint deletedChargingPoint = _chargingPointRepository.GetItemByIdAsync(id).Result;
            await _chargingPointRepository.DeleteItemAsync(id);
            return deletedChargingPoint;

        }

    }
}
