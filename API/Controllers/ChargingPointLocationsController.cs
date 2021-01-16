using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Entities;
using Infrastructure;

namespace EVCharge.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ChargingPointLocationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ChargingPointLocationsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: ChargingPointLocations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChargingPointLocation>>> GetChargingPointLocations()
        {
            return await _context.ChargingPointLocations.ToListAsync();
        }

        // GET: ChargingPointLocations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChargingPointLocation>> GetChargingPointLocation(int id)
        {
            var chargingPointLocation = await _context.ChargingPointLocations.FindAsync(id);

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

            _context.Entry(chargingPointLocation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
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
            _context.ChargingPointLocations.Add(chargingPointLocation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChargingPointLocation", new { id = chargingPointLocation.Id }, chargingPointLocation);
        }

        // DELETE: ChargingPointLocations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ChargingPointLocation>> DeleteChargingPointLocation(int id)
        {
            var chargingPointLocation = await _context.ChargingPointLocations.FindAsync(id);
            if (chargingPointLocation == null)
            {
                return NotFound();
            }

            _context.ChargingPointLocations.Remove(chargingPointLocation);
            await _context.SaveChangesAsync();

            return chargingPointLocation;
        }

        private bool ChargingPointLocationExists(int id)
        {
            return _context.ChargingPointLocations.Any(e => e.Id == id);
        }
    }
}
