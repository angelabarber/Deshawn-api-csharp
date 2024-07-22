namespace Deshawnapicsharp.Models.DTOs;

public class DogDTO
{
    public int Id { get; set; }

    public string Name { get; set; }

    public int CityDTOId { get; set ; }

    public int? WalkerDTOId { get; set; }

   // public Walker Walker {get; set;}
}