import { IAPIResponse } from "../types/apiTypes";

export const fetchData = (
  formValues: any,
  setSearchFor: React.Dispatch<React.SetStateAction<string>>,
  setFoundCoordinates: React.Dispatch<React.SetStateAction<IAPIResponse[]>>
) => {
  const search = formValues();
  let searchQuery: string = `${search.name} ${search.street} ${search.number} ${search.city} ${search.postalcode} ${search.country}`;
  setSearchFor(searchQuery);
  var encodedSearch = encodeURIComponent(searchQuery);
  let requestOptions = {
    method: "GET",
  };
  fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${encodedSearch}&apiKey=9bf6b2731ab046f086f8125b49c9e684`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      const propertyCoordinates: IAPIResponse[] = result.features;
      setFoundCoordinates(propertyCoordinates);
    })
    .catch((error) => console.log("error", error));
};
