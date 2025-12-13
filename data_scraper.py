
import requests
from bs4 import BeautifulSoup
import json
import time
import random

# Configuration
PROVINCES = [
    {"name": "Siem Reap", "cityId": 33},
    {"name": "Phnom Penh", "cityId": 496},
    {"name": "Sihanoukville", "cityId": 1459},
    {"name": "Kampot", "cityId": 1461},
    {"name": "Battambang", "cityId": 1460},
    {"name": "Kep", "cityId": 1463},
    {"name": "Koh Kong", "cityId": 23207},
    {"name": "Mondulkiri", "cityId": 23208}
]

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Accept-Language': 'en-US,en;q=0.9',
}

def clean_rating(rating_str):
    try:
        if not rating_str:
            return 4.0
        return float(rating_str)
    except:
        return 4.0

def scrape_hotels():
    all_hotels = []

    for province in PROVINCES:
        print(f"Scraping {province['name']}...")
        
        # Trip.com list URL construction
        url = f"https://www.trip.com/hotels/list?city={province['cityId']}"
        
        try:
            response = requests.get(url, headers=HEADERS, timeout=15)
            
            if response.status_code != 200:
                print(f"Failed to fetch {province['name']}: Status {response.status_code}")
                continue

            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Find the Next.js hydration data
            script_tag = soup.find('script', id='__NEXT_DATA__')
            
            if not script_tag:
                print(f"Could not find data script for {province['name']}")
                continue

            data = json.loads(script_tag.string)
            
            # Navigate nicely through the JSON structure
            try:
                # Path found during inspection: props.pageProps.listData.hotelList
                hotel_list = data['props']['pageProps']['listData']['hotelList']
            except KeyError:
                # Fallback path if structure changes slightly
                try: 
                    # Sometimes it might be in initial state
                    hotel_list = data['props']['pageProps']['initialState']['hotelList']['list']
                except:
                    print(f"Could not locate hotel list in JSON for {province['name']}")
                    continue

            count = 0
            for item in hotel_list:
                if count >= 20: # Limit to 20 per province
                    break
                
                # Extract relevant fields
                hotel_name = item.get('hotelName') or item.get('name')
                hotel_id = str(item.get('hotelId', ''))
                
                # Basic info
                hotel = {
                    "id": f"trip-{hotel_id}",
                    "name": hotel_name,
                    "location": item.get('address', f"{province['name']}, Cambodia"),
                    "city": province['name'],
                    "country": "Cambodia",
                    "description": item.get('brief', f"Experience a comfortable stay at {hotel_name} in {province['name']}."),
                    "price": int(item.get('displayPrice', {}).get('amount', 50)) if isinstance(item.get('displayPrice'), dict) else 50,
                    "rating": clean_rating(item.get('commentScore', 4.5)),
                    "reviews": int(item.get('commentCount', 100)),
                    "stars": int(item.get('star', 4)),
                    "propertyType": "Hotel", # Default
                    "images": [],
                    "amenities": [],
                    "roomTypes": [],
                    "coordinates": {
                        "lat": item.get('lat', 0),
                        "lng": item.get('lon', 0)
                    }
                }

                # Image extraction
                img_url = item.get('imgUrl')
                if img_url:
                     hotel['images'].append(img_url)

                # Add some realistic looking mock amenities
                base_amenities = ["Free WiFi", "Air Conditioning", "Restaurant", "24-Hour Front Desk"]
                if hotel['stars'] >= 4:
                    base_amenities.extend(["Pool", "Spa", "Gym", "Bar"])
                if hotel['stars'] == 5:
                    base_amenities.extend(["Concierge", "Room Service", "Airport Shuttle"])
                hotel['amenities'] = base_amenities

                # Mock room types
                hotel['roomTypes'] = [
                    {
                        "id": f"room-{hotel_id}-1",
                        "name": "Standard Room",
                        "price": hotel['price'],
                        "capacity": 2,
                        "beds": "1 Queen Bed",
                        "size": 25,
                        "amenities": ["WiFi", "AC", "TV"],
                        "image": img_url if img_url else "",
                        "available": 5
                    },
                    {
                        "id": f"room-{hotel_id}-2",
                        "name": "Deluxe Room",
                        "price": int(hotel['price'] * 1.5),
                        "capacity": 2,
                        "beds": "1 King Bed",
                        "size": 35,
                        "amenities": ["WiFi", "AC", "TV", "Balcony"],
                        "image": img_url if img_url else "",
                        "available": 3
                    }
                ]
                
                all_hotels.append(hotel)
                count += 1
            
            print(f"Successfully scraped {count} hotels for {province['name']}")
            time.sleep(random.uniform(1, 3)) # Be polite

        except Exception as e:
            print(f"Error scraping {province['name']}: {str(e)}")

    # Save to file
    with open('scraped_hotels.json', 'w', encoding='utf-8') as f:
        json.dump(all_hotels, f, indent=2, ensure_ascii=False)
    
    print(f"Total Scraped: {len(all_hotels)} hotels. Saved to scraped_hotels.json")

if __name__ == "__main__":
    scrape_hotels()
