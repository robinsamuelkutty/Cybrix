import requests
from datetime import datetime
from city import get_precise_location
import sys

def get_closest_weather(city):
    url = f"http://api.openweathermap.org/data/2.5/forecast?q={city}&appid=e15dac03e4734f5ce16b8d443126caf9&units=metric"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        forecast_list = data["list"]

        # Get current time
        now = datetime.utcnow()

        # Find the closest forecast
        closest_forecast = min(forecast_list, key=lambda x: abs(datetime.strptime(x["dt_txt"], "%Y-%m-%d %H:%M:%S") - now))

        # Extract relevant data
        dt_txt = closest_forecast["dt_txt"]
        temp = closest_forecast["main"]["temp"]
        weather = closest_forecast["weather"][0]["description"]
        return temp, weather

    else:
        print(f"Error: {response.status_code}, Unable to fetch data.", file=sys.stderr)
        return -1, -1

if __name__ == "__main__":
    city = get_precise_location()
    temp, weather = get_closest_weather(city)
    print(f"{temp},{weather}")