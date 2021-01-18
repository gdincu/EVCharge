using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Core.Entities;
using Core.Interfaces;

namespace API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ChargingPointsController : BaseApiController
    {
        private readonly IGenericRepository<ChargingPoint> _chargingPointRepository;

        public ChargingPointsController(IGenericRepository<ChargingPoint> chargingPointRepository)
        {
            _chargingPointRepository = chargingPointRepository;
        }

        // GET: api/ChargingPoints
        [HttpGet]
        public async Task<IReadOnlyList<ChargingPoint>> GetChargingPoints()
        {
            return await _chargingPointRepository.GetItemsAsync();
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
