using Deshawnapicsharp.Models;
using Deshawnapicsharp.Models.DTOs;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

List<Dog> dogs = new List<Dog> ()
{
    new Dog()
    {
        Id = 1,
        Name = "Dianemarie Hartness",
        CityId = 1,
        WalkerId = 1
    },
    new Dog()
    {
        Id = 2,
        Name = "Christoph Fosdyke",
        CityId = 1,
        WalkerId = 11
    },
    new Dog()
    {
        Id = 3,
        Name = "Rocket",
        CityId = 3,
        WalkerId = 7
    },
    new Dog()
    {
        Id = 4,
        Name = "Ebony",
        CityId = 4,
        WalkerId = 3
    },
    new Dog()
    {
        Id = 5,
        Name = "Scotty",
        CityId = 5,
        WalkerId = 8
    },
    new Dog()
    {
        Id = 6,
        Name = "Mac",
        CityId = 6,
        WalkerId = 2
    },
    new Dog()
    {
        Id = 7,
        Name = "Oreo",
        CityId = 7,
        WalkerId = 5
    },
    new Dog()
    {
        Id = 8,
        Name = "Sassy",
        CityId = 8,
        WalkerId = 1
    },
    new Dog()
    {
        Id = 9,
        Name = "Salem",
        CityId = 9,
        WalkerId = 9
    },
    new Dog()
    {
        Id = 10,
        Name = "Panda",
        CityId = 1,
        WalkerId = 7
    },
    new Dog()
    {
        Id = 11,
        Name = "Classy",
        CityId = 2,
        WalkerId = 1
    },
    new Dog()
    {
        Id = 12,
        Name = "Witch",
        CityId = 3,
        WalkerId = 9
    },
    new Dog()
    {
        Id = 13,
        Name = "Diamond",
        CityId = 4,
        WalkerId = null
    }

};

List<Walker> walkers = new List<Walker>()
{
    new Walker()
    {
        Id = 1,
        Name = "Greg"
    },
    new Walker()
    {
        Id = 2,
        Name = "Angela"
    },
    new Walker()
    {
        Id = 3,
        Name = "Tabor"
    },
    new Walker()
    {
        Id = 4,
        Name = "Andy"
    },
    new Walker()
    {
        Id = 5,
        Name = "Heidel"
    },
    new Walker()
    {
        Id = 6,
        Name = "Wilbo"
    },
    new Walker()
    {
        Id = 7,
        Name = "Monkey"
    },
    new Walker()
    {
        Id = 8,
        Name = "Buddy"
    },
    new Walker()
    {
        Id = 9,
        Name = "Monica"
    }
};

List<City> cities = new List<City>()
{
    new City()
    {
        Id = 1,
        Name = "San Diego"
    },
    new City()
    {
        Id = 2,
        Name = "Chicago"
    },
    new City()
    {
        Id = 3,
        Name = "White Plains"
    },
    new City()
    {
        Id = 4,
        Name = "Pittsburgh"
    },
    new City()
    {
        Id = 5,
        Name = "Phoenix"
    },
    new City()
    {
        Id = 6,
        Name = "Minneapolis"
    },
    new City()
    {
        Id = 7,
        Name = "Tucson"
    },
    new City()
    {
        Id = 8,
        Name = "Denver"
    },
    new City()
    {
        Id = 9,
        Name = "Sarasota"
    }
};

app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});

app.MapGet("/api/dogs", () =>
{
    return Results.Ok(
        dogs.Select(d => new DogDTO()
        {
            Id = d.Id,
            Name = d.Name,
            CityId = d.CityId,
            WalkerId = d.WalkerId
        })
        .ToList()
    );

});


app.MapGet("/api/dogs/{id}", (int id) =>
{
       Dog dog =  dogs.FirstOrDefault( d => d.Id == id);
    //    Walker walker = walkers.FirstOrDefault(w => w.Id == dog.WalkerId);

        if(dog == null)
        {
            return Results.NotFound();
        }

       return Results.Ok(
        new DogDTO()
       {
            Id = dog.Id,
            Name = dog.Name,
            CityId = dog.CityId,
            WalkerId = dog.WalkerId,
            Walker = walkers
            .Where(w => w.Id == dog.WalkerId)
            .Select(w => new WalkerDTO()
            {
                Id = w.Id,
                Name = w.Name
            })
            .FirstOrDefault(),
            City = cities
            .Where(c => c.Id == dog.CityId)
            .Select(c => new CityDTO()
            {
                Id = c.Id,
                Name = c.Name
            }).FirstOrDefault()
            
       }

    );
});

app.MapPost("/api/dogs", (Dog dog) => 
{
    dog.Id = dogs.Count > 0 ? dogs.Max(d => d.Id) + 1 : 1;
    dogs.Add(dog);

    return Results.Created(
        "Dog Created",
       new DogDTO()
       {
            Id = dog.Id,
            Name = dog.Name,
            CityId = dog.CityId,
            WalkerId = null,
            Walker = walkers
            .Where(w => w.Id == dog.WalkerId)
            .Select(w => new WalkerDTO()
            {
                Id = w.Id,
                Name = w.Name
            })
            .FirstOrDefault(),
            City = cities
            .Where(c => c.Id == dog.CityId)
            .Select(c => new CityDTO()
            {
                Id = c.Id,
                Name = c.Name
            }).FirstOrDefault()
            
       }
    );


});

app.MapGet("/api/cities", () =>
{
     return Results.Ok(
        cities.Select(c => new CityDTO()
        {
            Id = c.Id,
            Name = c.Name,
        })
        .ToList()
     );
} );


app.Run();
