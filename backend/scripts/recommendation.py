import requests
from weather import get_closest_weather
from extract import extract_clothing_data_array
# Define your API key
API_KEY = "AIzaSyAVQCrly2tlJEKsLYpx29oqiRGyaLVZB9E"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"

def get_weather(api_key, city):
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        weather_info = {
            "temperature": data["main"]["temp"],
            "humidity": data["main"]["humidity"],
            "weather": data["weather"][0]["description"],
            "wind_speed": data["wind"]["speed"]
        }
        return weather_info
    else:
        return {"error": "Failed to fetch weather data"}

def ask_gemini(prompt):
    """Sends a query to Gemini API and returns the response."""
    headers = {"Content-Type": "application/json"}
    data = {
        "contents": [{"parts": [{"text": prompt}]}]
    }

    response = requests.post(URL, headers=headers, json=data)
    
    if response.status_code == 200:
        result = response.json()
        try:
            return result["candidates"][0]["content"]["parts"][0]["text"]
        except KeyError:
            return "Error: Unexpected response format."
    else:
        return f"Error: {response.status_code}, {response.text}"

def reccomend():
    weather = get_closest_weather("Poonjar")
    Product_name = ['Hoodie','Joggers','Button-Down Shirt','Slim-Fit Jeans','T-Shirt','Oversized T-Shirt','Cargo Pants','Water-Resistant Windbreaker','Sustainable Bamboo Fiber Polo Shirt','Fleece-Lined Tech Jacket']
    color = ['Black','Dark Grey','Navy Blue','Black','Gray','White','Light_brown','Dark_blue','Olive Green','Charcoal Black']
    Material = ['Cotton','Polyster Cotton','Linnen cotton','Denim','Moisture-Wicking Fabric','Cotton','Cotton','Nylon-Polyster','Sustainable Bamboo Fiber','Polyster']
    W_Query = [f"Temperature : {weather[0]}",f"Climate :{weather[1]}"]
    constraint = "The output must contain exactly three lines. The first line should start with 'Office Wear:' followed by the recommended clothes for office wear. The second line should start with 'Casual Wear:' followed by the recommended clothes for casual wear. The third line should start with 'Party Wear:' followed by the recommended clothes for party wear. No extra lines or missing lines are allowed. The format should strictly follow the pattern:  i need to use your repsonse to extract the result as a api call so please follow the forma do not use md fromat"""
    #response = ask_gemini(user_query)
    #print(response)
    with open("query.txt", "w") as file:
    # Writing Product details
        for p, c, m in zip(Product_name, color, Material):
            file.write(f"{p},{c},{m}\n")
    
    # Writing weather query
        file.write("\n")  # Adding a new line for separation
        for query in W_Query:
            file.write(query + "\n")
    
    # Writing constraint
        file.write("\n" + constraint + "\n")

    with open("query.txt", "r") as file:
        content = file.read()
    response = ask_gemini(content)
    reccomendations=extract_clothing_data_array(response)
    return {"reccomendations":reccomendations}