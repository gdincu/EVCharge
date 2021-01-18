using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class BookingRepository : IGenericRepository<Booking>
    {
        private readonly AppDbContext _context;

        public BookingRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ActionResult<Booking>> CreateItemAsync(Booking entity)
        {
            _context.Bookings.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<ActionResult<Booking>> DeleteItemAsync(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return booking;
        }

        public async Task<Booking> GetItemByIdAsync(int id)
        {
            var booking = await _context.Bookings.FirstOrDefaultAsync(p => p.Id == id);

            return booking;
        }

        public async Task<IReadOnlyList<Booking>> GetItemsAsync()
        {
            return await _context.Bookings.ToListAsync();
        }

        public async Task<ActionResult<Booking>> UpdateItemAsync(int id, Booking entity)
        {
            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return entity;
        }
    }
}
