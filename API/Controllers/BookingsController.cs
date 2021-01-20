﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Entities;
using Core.Interfaces;
using API.Errors;
using Core.Specifications;
using API.Helpers;

namespace API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookingsController : BaseApiController
    {
        private readonly IGenericRepository<Booking> _bookingRepository;

        public BookingsController(IGenericRepository<Booking> bookingRepository)
        {
            _bookingRepository = bookingRepository;
        }

        // GET: Bookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings([FromQuery]BookingParams parameters)
        {
            var spec = new BookingWithDatesSpecification(parameters);
            var countSpec = new BookingWithFiltersForCountSpecificication(parameters);
            var totalItems = await _bookingRepository.CountAsync(countSpec);
            var bookings = await _bookingRepository.ListAsync(spec);

            if (bookings == null) return NotFound(new ApiResponse(404));

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
