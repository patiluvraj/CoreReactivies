using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private DataContext _dataContext { get; set; }
        public ActivitiesController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<List<Activity>> GetActivities()
        {
            return await _dataContext.Activities.ToListAsync();    
        }

        [HttpGet("{id}")]
        public async Task<Activity> GetActivity(Guid id)
        {
            return await _dataContext.Activities.FindAsync(id);    
        }
    }
}