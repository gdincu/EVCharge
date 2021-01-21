using Core.Entities;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<T> GetItemByIdAsync(int id);
        Task<IReadOnlyList<T>> GetItemsAsync();
        Task<ActionResult<T>> UpdateItemAsync(int id, T entity);
        Task<ActionResult<T>> CreateItemAsync(T entity);
        Task<ActionResult<T>> DeleteItemAsync(int id);
        Task<T> GetEntityWithSpec(ISpecification<T> spec);
        Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);
        Task<int> CountAsync(ISpecification<T> spec);
    }
}
