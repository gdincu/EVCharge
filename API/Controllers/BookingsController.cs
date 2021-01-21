using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Entities;
using Core.Interfaces;
using API.Errors;
using Core.Specifications;
using API.Helpers;
using System.Linq;
using System;

namespace API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookingsController : BaseApiController
    {
        private readonly IGenericRepository<Booking> _bookingRepository;
        private readonly IGenericRepository<ChargingPoint> _chargingPointRepository;

        public BookingsController(IGenericRepository<Booking> bookingRepository,
            IGenericRepository<ChargingPoint> chargingPointRepository
            )
        {
            _bookingRepository = bookingRepository;
            _chargingPointRepository = chargingPointRepository;
        }

        // GET: Bookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings([FromQuery]BookingParams parameters)
        {
            if (parameters is null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            var spec = new BookingWithDatesSpecification(parameters);
            var countSpec = new BookingWithFiltersForCountSpecificication(parameters);
            var totalItems = await _bookingRepository.CountAsync(countSpec);
            var bookings = await _bookingRepository.ListAsync(spec);

            //Filters results by start and end dates
            DateTime? startDate = Convert.ToDateTime(parameters.StartDate);
            DateTime? endDate = Convert.ToDateTime(parameters.EndDate);

            if (bookings == null) return NotFound(new ApiResponse(404));

            //Default Scenario without any StartDate or EndDate parameters
            if (string.IsNullOrEmpty(parameters.StartDate) && string.IsNullOrEmpty(parameters.EndDate))
                return Ok(new Pagination<Booking>(parameters.PageIndex, parameters.PageSize, totalItems, bookings));

            //Scenario where the StartDate is set while the EndDate is not
            if (startDate != null && string.IsNullOrEmpty(parameters.EndDate))
            {
                bookings = bookings.Where(f => f.Start >= startDate).ToList();
                return Ok(new Pagination<Booking>(parameters.PageIndex, parameters.PageSize, totalItems, bookings));
            }

            //Scenario where both the StartDate and EndDate parameters are set
            if (startDate != null && endDate != null)
            {
                bookings = bookings.Where(f => startDate <= f.Start && endDate >= f.End).ToList();
                return Ok(new Pagination<Booking>(parameters.PageIndex, parameters.PageSize, totalItems, bookings));
            }

            //Scenario where the EndDate is set while the StartDate is not
            if (endDate != null && string.IsNullOrEmpty(parameters.StartDate))
            { 
                bookings = bookings.Where(f => endDate >= f.End).ToList();
                return Ok(new Pagination<Booking>(parameters.PageIndex, parameters.PageSize, totalItems, bookings));
            }
            

            return Ok(new Pagination<Booking>(parameters.PageIndex, parameters.PageSize, totalItems, bookings));

        }

        // GET: Bookings/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Booking>> GetBooking(int id)
        {
            var booking = await _bookingRepository.GetItemByIdAsync(id);

            if (booking == null)
            {
                return NotFound(new ApiResponse(404));
            }

            return booking;
        }

        // GET: Bookings/5
        [HttpGet("{id}/chargingpoint")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ChargingPoint> GetChargingPointByBooking(int id)
        {
            var tempId = _bookingRepository.GetItemByIdAsync(id).Result.ChargingPointId;
            return await _chargingPointRepository.GetItemByIdAsync(tempId);
            
        }

        // PUT: Bookings/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBooking(int id, Booking booking)
        {
            if (id != booking.Id)
            {
                return BadRequest();
            }

            try
            {
                await _bookingRepository.UpdateItemAsync(id, booking);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
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

        // POST: Bookings
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Booking>> PostBooking(Booking booking)
        {
            _bookingRepository.CreateItemAsync(booking);

            return CreatedAtAction("GetBooking", new { id = booking.Id }, booking);

        }

        // DELETE: Bookings/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Booking>> DeleteBooking(int id)
        {
            var booking = await _bookingRepository.GetItemByIdAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            await _bookingRepository.DeleteItemAsync(id);

            return booking;
        }

        private bool BookingExists(int id)
        {
            if (_bookingRepository.GetItemByIdAsync(id) != null)
                return true;
            else
                return false;
        }
    }
}
