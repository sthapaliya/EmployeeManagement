using AutoMapper;
using AutoMapper.QueryableExtensions;
using EmployeeManagement.Application.Common.Interfaces;
using EmployeeManagement.Application.EmployeeLists.Queries.GetEmployees;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace EmployeeManagement.Application.Employees.Queries.GetEmployees
{
    public class GetEmployeesQuery : IRequest<List<EmployeeListDto>>
    {
    }

    public class GetEmployeesQueryHandler : IRequestHandler<GetEmployeesQuery, List<EmployeeListDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetEmployeesQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<EmployeeListDto>> Handle(GetEmployeesQuery request, CancellationToken cancellationToken)
        {

            var records = await _context.Employees
                    .ProjectTo<EmployeeListDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

            return await Task.FromResult(records);
        }
    }
}
