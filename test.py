import requests
import json
response = requests.get(f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={3.33},{2.22}&radius={2000}&type=clinic&keyword=clinic&key=AIzaSyBiIvCLftcHwIONNtyTUsGHkS1vZuCPeuw")
print(response.json())