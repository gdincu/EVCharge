﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using API.Errors;
using System.Linq;

namespace API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : BaseApiController
    {
        private readonly IGenericRepository<User> _userRepository;

        public UsersController(IGenericRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        // GET: Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return Ok(await _userRepository.GetItemsAsync());
        }

        // GET: Users/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _userRepository.GetItemByIdAsync(id);

            if (user == null)
            {
                return NotFound(new ApiResponse(404));
            }

            return user;
        }

        // PUT: Users/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            try
            {
                await _userRepository.UpdateItemAsync(id, user);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        private bool UserExists(int id)
        {
            if (_userRepository.GetItemByIdAsync(id) != null)
                return true;
            else
                return false;
        }

        // POST: Users
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            await _userRepository.CreateItemAsync(user);

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _userRepository.GetItemByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            await _userRepository.DeleteItemAsync(id);

            return user;
        }

        [HttpGet("usernameexists")]
        public bool CheckUsernameExists([FromQuery] string username)
        {
            bool result =  _userRepository.GetItemsAsync().Result.FirstOrDefault(p => p.UserName == username) != null;
            return result;

        }

    }
}