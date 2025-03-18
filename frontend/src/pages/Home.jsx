import React, { useEffect, useState } from "react";
import { Calendar, Cloud, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Home = () => {
  const { authUser } = useAuthStore();
  const [weather, setWeather] = useState({ temp: "Loading...", condition: "Loading..." });
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch weather data from the backend
    const fetchWeather = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/weather");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Weather data:", data);

        // Update weather state with fetched data
        setWeather({ temp: `${data.temp}°C`, condition: data.weather });
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        setError("Failed to fetch weather data. Please try again later."); // Set error message
        setWeather({ temp: "N/A", condition: "N/A" }); // Fallback data
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchWeather();
  }, []);

  const outfitRecommendations = [
    {
      id: 1,
      occasion: "Office",
      items: ["Navy Blazer", "White Button-up", "Khaki Chinos", "Brown Loafers"],
      sustainability: "All items from sustainable brands",
    },
    {
      id: 2,
      occasion: "Casual Day",
      items: ["Denim Jacket", "Black T-shirt", "Blue Jeans", "White Sneakers"],
      sustainability: "3/4 items can be paired with other outfits",
    },
    {
      id: 3,
      occasion: "Evening Out",
      items: ["Black Sweater", "Dark Jeans", "Chelsea Boots", "Leather Watch"],
      sustainability: "Jacket is upcycled from sustainable materials",
    },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      {/* Weather Section */}
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Good morning, {authUser ? authUser.fullName : "Guest"}
          </h1>
          <p className="text-gray-500 flex items-center mt-1">
            <Calendar className="h-4 w-4 mr-2" /> Monday, March 17
          </p>
        </div>
        <div className="text-right bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center justify-end">
            <Cloud className="h-6 w-6 mr-2 text-blue-500" />
            <span className="font-medium text-lg">
              {loading ? "Loading..." : weather.temp}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {loading ? "Loading..." : weather.condition}
          </p>
          {error && (
            <p className="text-sm text-red-500 mt-2">{error}</p>
          )}
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Today's Recommendations
        </h2>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl shadow-sm border border-blue-200">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-blue-700 font-medium text-lg">
                Best for today's weather
              </span>
              <p className="text-sm text-gray-600 mt-2">
                Based on {weather.temp} and your preferences
              </p>
            </div>
            <Link
              to="/recommendations"
              className="text-blue-600 text-xl bg-white p-2 rounded-full shadow-sm hover:bg-blue-50 transition-colors"
            >
              →
            </Link>
          </div>
        </div>
      </div>

      {/* Outfit Suggestions Section */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Outfit Suggestions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {outfitRecommendations.map((outfit) => (
          <div
            key={outfit.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md h-full"
          >
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4">
              <span className="font-medium text-gray-800">
                {outfit.occasion}
              </span>
            </div>
            <div className="p-5 flex flex-col h-full">
              <div className="flex flex-wrap mb-4">
                {outfit.items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-lg p-2 m-1 text-sm transition-all hover:bg-gray-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-2 flex items-center">
                <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                <span className="text-xs text-green-600 font-medium">
                  {outfit.sustainability}
                </span>
              </div>
              <div className="mt-auto pt-4 flex justify-between items-center">
                <button className="text-blue-600 text-sm font-medium hover:underline">
                  See Details
                </button>
                <div className="flex items-center">
                  <button className="bg-gray-200 rounded-full p-2 mr-3 hover:bg-gray-300 transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                  <button className="bg-blue-600 text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-blue-700 transition-colors">
                    Wear This
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Generate More Outfits Button */}
      <button className="w-full py-4 text-blue-600 font-medium bg-white rounded-xl shadow-sm hover:bg-blue-50 transition-colors mt-8">
        Generate More Outfits
      </button>
    </div>
  );
};

export default Home;