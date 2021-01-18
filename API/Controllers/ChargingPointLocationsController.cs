using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Entities;
using Infrastructure;
using Core.Interfaces;

namespace API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ChargingPointLocationsController : BaseApiController
    {
        private readonly IGenericRepository<ChargingPointLocation> _chargingPointLocation;

        public ChargingPointLocationsController(IGenericRepository<ChargingPointLocation> chargingPointLocation)
        {
            _chargingPointLocation = chargingPointLocation;
        }

        // GET: ChargingPointLocations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChargingPointLocation>>> GetChargingPointLocations()
        {
            return Ok(await _chargingPointLocation.GetItemsAsync());
        }

        // GET: ChargingPointLocations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChargingPointLocation>> GetChargingPointLocation(int id)
        {
            var chargingPointLocation = await _chargingPointLocation.GetItemByIdAsync(id);

            if (chargingPointLocation == null)
            {
                return NotFound();
            }

            return chargingPointLocation;
        }

        // PUT: ChargingPointLocations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChargingPointLocation(int id, ChargingPointLocation chargingPointLocation)
        {
            if (id != chargingPointLocation.Id)
            {
                return BadRequest();
            }

            try
            {
                await _chargingPointLocation.UpdateItemAsync(id, chargingPointLocation);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChargingPointLocationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: ChargingPointLocations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ChargingPointLocation>> PostChargingPointLocation(ChargingPointLocation chargingPointLocation)
        {
            await _chargingPointLocation.CreateItemAsync(chargingPointLocation);

            return CreatedAtAction("GetChargingPointLocation", new { id = chargingPointLocation.Id }, chargingPointLocation);
        }

        // DELETE: ChargingPointLocations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ChargingPointLocation>> DeleteChargingPointLocation(int id)
        {
            var chargingPointLocation = await _chargingPointLocation.GetItemByIdAsync(id);
            if (chargingPointLocation == null)
            {
                return NotFound();
            }

            await _chargingPointLocation.DeleteItemAsync(id);

            return chargingPointLocation;
        }

        private bool ChargingPointLocationExists(int id)
        {
            if (_chargingPointLocation.GetItemByIdAsync(id) != null)
                return true;
            else
                return false;
        }
    }
}
