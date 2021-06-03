import { IApiProperty, IAPIResponse } from "../types/apiTypes";

export const fetchData = (
  formValues: any,
  setSearchFor: React.Dispatch<React.SetStateAction<string>>,
  setFoundCoordinates: React.Dispatch<React.SetStateAction<IAPIResponse[]>>,
  setOpenMap: React.Dispatch<React.SetStateAction<boolean>>,
  setViewPort: React.Dispatch<React.SetStateAction<IApiProperty>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  const search = formValues();
  let searchQuery: string = `${search.name} ${search.street} ${search.number} ${search.city} ${search.postalcode} ${search.country} ${search.municipality}`;
  setSearchFor(searchQuery);
  var encodedSearch = encodeURIComponent(searchQuery); // encodes the string the the URL otherwise doesnt read it.
  let requestOptions = {
    method: "GET",
  };
  fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${encodedSearch}&apiKey=9bf6b2731ab046f086f8125b49c9e684`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      setLoading(false);
      const propertyCoordinates: IAPIResponse[] = result.features;
      setFoundCoordinates(propertyCoordinates);
      if (propertyCoordinates.length > 0) {
        setViewPort({
          lat: propertyCoordinates[0].properties.lat,
          lon: propertyCoordinates[0].properties.lon,
          formatted: "",
        });
        setOpenMap(true);
      }
    })
    .catch((error) => {
      setLoading(false);
      setError(true);
    });
};
