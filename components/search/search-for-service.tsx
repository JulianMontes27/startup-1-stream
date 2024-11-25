"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { Service } from "@prisma/client";

const SearchForService = () => {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  const router = useRouter();

  //on mount (initial render)...
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const query = e.target.value;
    setSearchQuery(query);
    //see if a category matches the user input
    if (query) {
      const matchingCategories = [
        ...new Set(
          services
            .filter((service: Service) =>
              service.category.toLowerCase().includes(query.toLowerCase())
            )
            .map((service: Service) => service.category.toLowerCase())
        ),
      ];
      setActiveCategories(matchingCategories);
    } else {
      setActiveCategories([]);
    }
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && searchQuery) {
      const url = qs.stringifyUrl({
        url: "/service",
        query: { category: searchQuery },
      });
      router.push(url);
    }
  };

  return (
    <section className="w-full bg-gray-100 rounded-md py-4 px-4">
      {/* Search Bar */}
      <div className="flex items-center bg-white rounded-md shadow-sm p-2">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search for services..."
          value={searchQuery}
          onChange={handleChange}
          onKeyDown={handleSubmit}
          className="w-full ml-3 bg-transparent focus:outline-none text-sm text-gray-600"
        />
      </div>

      {/* Dropdown List */}
      {activeCategories.length > 0 && (
        <ul className="mt-2 bg-white rounded-md shadow-lg overflow-hidden">
          {activeCategories.map((category, index) => (
            <li
              key={index}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSearchQuery(category);
                const url = qs.stringifyUrl({
                  url: "/service",
                  query: { category },
                });
                router.push(url);
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default SearchForService;
