"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SearchInput = () => {
  const handleOnSubmit = () => {
    //on click, the user fetches a get request to retrieve active services from service providers
    //check if any of the active services are within the user's city
    //get the service provider's location and display on the map
    //return an interactive map woth providers on it
    
  };
  return (
    <div className="max-w-2xl flex flex-col items-center justify-center p-2 sm:p-4 sm:gap-2 sm:mt-3">
      <Input type="text" placeholder="Servicio de pintura..." />
      <Button type="submit" onClick={handleOnSubmit}>
        Buscar
      </Button>
    </div>
  );
};

export default SearchInput;
