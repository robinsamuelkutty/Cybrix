import requests

def get_precise_location():
    # Get your public IP
    ip_response = requests.get("https://api64.ipify.org?format=json")
    ip = ip_response.json().get("ip", "")

    # Use the IP to get detailed location
    location_response = requests.get(f"https://ipinfo.io/{ip}/json")
    data = location_response.json()

    city = data.get("city", "Unknown")

    return city 