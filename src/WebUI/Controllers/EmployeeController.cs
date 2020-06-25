using EmployeeManagement.Application.EmployeeLists.Queries.GetEmployees;
using EmployeeManagement.Application.Employees.Commands.CreateEmployee;
using EmployeeManagement.Application.Employees.Commands.DeleteEmployee;
using EmployeeManagement.Application.Employees.Commands.UpdateEmployee;
using EmployeeManagement.Application.Employees.Queries.GetEmployee;
using EmployeeManagement.Application.Employees.Queries.GetEmployees;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmployeeManagement.WebUI.Controllers
{
    public class EmployeesController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<EmployeeListDto>>> Get()
        {
            return await Mediator.Send(new GetEmployeesQuery());
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateEmployeeCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut]
        public async Task<ActionResult> Update(UpdateEmployeeCommand command)
        {
            await Mediator.Send(command);
            return NoContent();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDto>> Get(int id)
        {
            return await Mediator.Send(new GetEmployeeQuery { Id = id });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteEmployeeCommand { Id = id });
            return NoContent();
        }
    }
}
