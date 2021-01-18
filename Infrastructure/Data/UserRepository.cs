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
    public class UserRepository : IGenericRepository<User>
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public Task<int> CountAsync(ISpecification<User> spec)
        {
            throw new NotImplementedException();
        }

        public async Task<ActionResult<User>> CreateItemAsync(User entity)
        {
            _context.Users.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<ActionResult<User>> DeleteItemAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public Task<User> GetEntityWithSpec(ISpecification<User> spec)
        {
            throw new NotImplementedException();
        }

        public async Task<User> GetItemByIdAsync(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(p => p.Id == id);

            return user;
        }

        public async Task<IReadOnlyList<User>> GetItemsAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public Task<IReadOnlyList<User>> ListAsync(ISpecification<User> spec)
        {
            throw new NotImplementedException();
        }

        public async Task<ActionResult<User>> UpdateItemAsync(int id, User entity)
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
