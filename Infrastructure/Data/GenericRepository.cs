using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly AppDbContext _context;
        public GenericRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<T>> CreateItemAsync(T entity)
        {
            _context.Set<T>().Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<ActionResult<T>> DeleteItemAsync(int id)
        {
            var temp = await _context.Set<T>().FindAsync(id);

            _context.Set<T>().Remove(temp);
            await _context.SaveChangesAsync();

            return temp;
        }

        public async Task<T> GetItemByIdAsync(int id)
        {
            return await _context.Set<T>().FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IReadOnlyList<T>> GetItemsAsync()
        {
            return await _context.Set<T>().ToListAsync(); 
        }

        public async Task<ActionResult<T>> UpdateItemAsync(int id, T entity)
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
