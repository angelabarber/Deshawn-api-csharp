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

List<Dog> dogs = new List<Dog>()
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
        WalkerId = null
    },
    new Dog()
    {
        Id = 3,
        Name = "Rocket",
        CityId = 3,
        WalkerId = null
    },
    new Dog()
    {
        Id = 4,
        Name = "Ebony",
        CityId = 4,
        WalkerId = null
    },
    new Dog()
    {
        Id = 5,
        Name = "Scotty",
        CityId = 1,
        WalkerId = null
    },
    new Dog()
    {
        Id = 6,
        Name = "Mac",
        CityId = 2,
        WalkerId = null
    },
    new Dog()
    {
        Id = 7,
        Name = "Oreo",
        CityId = 2,
        WalkerId = null
    },
    new Dog()
    {
        Id = 8,
        Name = "Sassy",
        CityId = 3,
        WalkerId = null
    },
    new Dog()
    {
        Id = 9,
        Name = "Salem",
        CityId = 4,
        WalkerId = null
    },
    new Dog()
    {
        Id = 10,
        Name = "Panda",
        CityId = 1,
        WalkerId = null
    },
    new Dog()
    {
        Id = 11,
        Name = "Classy",
        CityId = 2,
        WalkerId = null
    },
    new Dog()
    {
        Id = 12,
        Name = "Witch",
        CityId = 3,
        WalkerId = null
    },
    new Dog()
    {
        Id = 13,
        Name = "Diamond",
        CityId = 4,
        WalkerId = null
    },
    new Dog()
    {
        Id = 14,
        Name = "Snowball",
        CityId = 2,
        WalkerId = null
    },
    new Dog()
    {
        Id = 15,
        Name = "Bella",
        CityId = 1,
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
        Name = "Bellevue"
    },
    new City()
    {
        Id = 2,
        Name = "Brentwood"
    },
    new City()
    {
        Id = 3,
        Name = "Nashville"
    },
    new City()
    {
        Id = 4,
        Name = "Green Hills"
    }
};

List<WalkerCity> walker_cities = new List<WalkerCity>()
{
    new WalkerCity()
    {
        Id = 1,
        WalkerId = 1,
        CityId = 1
    },
    new WalkerCity()
    {
        Id = 2,
        WalkerId = 1,
        CityId = 3
    },
    new WalkerCity()
    {
        Id = 3,
        WalkerId = 2,
        CityId = 2
    },
    new WalkerCity()
    {
        Id = 4,
        WalkerId = 2,
        CityId = 4
    },
    new WalkerCity()
    {
        Id = 5,
        WalkerId = 3,
        CityId = 3
    },
    new WalkerCity()
    {
        Id = 6,
        WalkerId = 3,
        CityId = 4
    },
    new WalkerCity()
    {
        Id = 7,
        WalkerId = 4,
        CityId = 1
    },
    new WalkerCity()
    {
        Id = 8,
        WalkerId = 4,
        CityId = 2
    },
    new WalkerCity()
    {
        Id = 9,
        WalkerId = 5,
        CityId = 2
    },
    new WalkerCity()
    {
        Id = 10,
        WalkerId = 6,
        CityId = 1
    },
    new WalkerCity()
    {
        Id = 11,
        WalkerId = 6,
        CityId = 3
    },
    new WalkerCity()
    {
        Id = 12,
        WalkerId = 7,
        CityId = 3
    },
    new WalkerCity()
    {
        Id = 13,
        WalkerId = 7,
        CityId = 4
    },
    new WalkerCity()
    {
        Id = 14,
        WalkerId = 8,
        CityId = 1
    },
    new WalkerCity()
    {
        Id = 15,
        WalkerId = 8,
        CityId = 2
    },
    new WalkerCity()
    {
        Id = 16,
        WalkerId = 9,
        CityId = 3
    },
    new WalkerCity()
    {
        Id = 17,
        WalkerId = 9,
        CityId = 4
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

app.MapPut("/api/dogs/{id}", (int id, Dog dog) => 
{
    Dog dogToUpdate = dogs.FirstOrDefault(d => d.Id == id);
    int dogIndex = dogs.IndexOf(dogToUpdate);
    if (dogToUpdate == null)
    {
        return Results.NotFound();
    }

    if (id != dogToUpdate.Id)
    {
        return Results.BadRequest();
    }
    
    dogs[dogIndex] = dog;
    return Results.Ok(dogs[dogIndex]);
});

app.MapDelete("/api/dogs/{id}", (int id) => {
    Dog dog = dogs.FirstOrDefault(d => d.Id == id);

    if (dog== null)
    {
        return Results.NotFound();
    }

    if (id != dog.Id)
    {
        return Results.BadRequest();
    }
    
    dogs.Remove(dog);
    return Results.NoContent();
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

app.MapPost("/api/cities", (City city) =>
{
    city.Id = cities.Count > 0 ? cities.Max( c => c.Id) +1 : 1;
    cities.Add(city);
    return Results.Created();
});

app.MapGet("/api/walkers", () =>
{
     return Results.Ok(
        walkers.Select(w => new WalkerDTO()
        {
            Id = w.Id,
            Name = w.Name,
        })
        .ToList()
     );
} );

app.MapGet("/api/walkerCities", () => {

{
    return Results.Ok(
        walker_cities.Select(wc => new WalkerCityDTO()
        {
            Id = wc.Id,
            WalkerId = wc.WalkerId,
            CityId = wc.CityId,
            Walker = walkers.Where(w => w.Id == wc.WalkerId)
            .Select(w=> new WalkerDTO()
            {
                Id = w.Id,
                Name = w.Name
            }).FirstOrDefault()

        })
        .ToList()
    );
}
});



app.Run();
