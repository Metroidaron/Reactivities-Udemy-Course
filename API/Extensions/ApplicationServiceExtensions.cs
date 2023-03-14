using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions {
    public static class ApplicationServiceExtensions {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config) {

            // Not sure
            services.AddEndpointsApiExplorer();

            // Swagger Service
            services.AddSwaggerGen();

            // Database Context
            services.AddDbContext<DataContext>(opt => {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            // CORS support for our Frontend
            services.AddCors(opt => {
                opt.AddPolicy("CorsPolicy", policy => {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });

            // Mediator for the pattern
            services.AddMediatR(typeof(List.Handler));

            // AutoMapper Helper Package
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            return services;
        }
    }
}