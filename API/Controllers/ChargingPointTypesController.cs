using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Entities;
using Infrastructure;

namespace API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ChargingPointTypesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ChargingPointTypesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ChargingPointTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChargingPointType>>> GetChargingPointTypes()
        {
            return await _context.ChargingPointTypes.ToListAsync();
        }

        // GET: api/ChargingPointTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChargingPointType>> GetChargingPointType(int id)
        {
            var chargingPointType = await _context.ChargingPointTypes.FindAsync(id);

            if (chargingPointType == null)
            {
                return NotFound();
            }

            return chargingPointType;
        }

        // PUT: api/ChargingPointTypes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChargingPointType(int id, ChargingPointType chargingPointType)
        {
            if (id != chargingPointType.Id)
            {
                return BadRequest();
            }

            _context.Entry(chargingPointType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChargingPointTypeExists(id))
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

        // POST: api/ChargingPointTypes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ChargingPointType>> PostChargingPointType(ChargingPointType chargingPointType)
        {
            _context.ChargingPointTypes.Add(chargingPointType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChargingPointType", new { id = chargingPointType.Id }, chargingPointType);
        }

        // DELETE: api/ChargingPointTypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ChargingPointType>> DeleteChargingPointType(int id)
        {
            var chargingPointType = await _context.ChargingPointTypes.FindAsync(id);
            if (chargingPointType == null)
            {
                return NotFound();
            }

            _context.ChargingPointTypes.Remove(chargingPointType);
            await _context.SaveChangesAsync();

            return chargingPointType;
        }

        private bool ChargingPointTypeExists(int id)
        {
            return _context.ChargingPointTypes.Any(e => e.Id == id);
        }
    }
}
