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
using SQLitePCL;

namespace API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ChargingPointTypesController : BaseApiController
    {
        private readonly IGenericRepository<ChargingPointType> _chargingPointType;

        public ChargingPointTypesController(IGenericRepository<ChargingPointType> chargingPointType)
        {
            _chargingPointType = chargingPointType;
        }

        // GET: api/ChargingPointTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChargingPointType>>> GetChargingPointTypes()
        {
            return Ok(await _chargingPointType.GetItemsAsync());
        }

        // GET: api/ChargingPointTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChargingPointType>> GetChargingPointType(int id)
        {
            var chargingPointType = await _chargingPointType.GetItemByIdAsync(id);

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

            try
            {
                await _chargingPointType.UpdateItemAsync(id, chargingPointType);
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
            await _chargingPointType.CreateItemAsync(chargingPointType);

            return CreatedAtAction("GetChargingPointType", new { id = chargingPointType.Id }, chargingPointType);
        }

        // DELETE: api/ChargingPointTypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ChargingPointType>> DeleteChargingPointType(int id)
        {
            var chargingPointType = await _chargingPointType.GetItemByIdAsync(id);
            if (chargingPointType == null)
            {
                return NotFound();
            }

            await _chargingPointType.DeleteItemAsync(id);

            return chargingPointType;
        }

        private bool ChargingPointTypeExists(int id)
        {
            if (_chargingPointType.GetItemByIdAsync(id) != null)
                return true;
            else
                return false;
        }
    }
}
