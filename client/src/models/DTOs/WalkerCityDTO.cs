namespace Deshawnapicsharp.Models.DTOs;

public class WalkerCityDTO
{
    public int Id {get; set;}

    public int WalkerId { get; set; }

    public int CityId { get; set;}

    public WalkerDTO Walker { get; set; }
}