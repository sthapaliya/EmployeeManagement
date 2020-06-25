﻿using AutoMapper;
using EmployeeManagement.Application.Common.Mappings;
using EmployeeManagement.Domain.Entities;

namespace EmployeeManagement.Application.EmployeeLists.Queries.GetEmployees
{
    public class EmployeeListDto : IMapFrom<Employee>
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Mobile { get; set; }
        public bool IsActive { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Employee, EmployeeListDto>();
        }
    }
}
