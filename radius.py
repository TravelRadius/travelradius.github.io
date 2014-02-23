# Import the relevant libraries
import urllib2
import json

# Set the Places API key for your application
AUTH_KEY = 'AIzaSyCRV6MyW5dnvG0wxw6mVCljH74Y6qD1i18'

# Define the location coordinates
LOCATION = '37.787930,-122.4074990'

# Define the radius (in meters) for the search
RADIUS = 100

# Compose a URL to query a predefined location with a radius of 5000 meters
url = ('https://maps.googleapis.com/maps/api/place/search/json?location=%s'
         '&radius=%s&sensor=false&key=%s') % (LOCATION, RADIUS, AUTH_KEY)

# Send the GET request to the Place details service (using url from above)
response = urllib2.urlopen(url)

# Get the response and use the JSON library to decode the JSON
json_raw = response.read()
json_data = json.loads(json_raw)

# Iterate through the results and print them to the console
if json_data['status'] == 'OK':
  for place in json_data['results']:
		print '%s: %s\n' % (place['name'], place['reference'])
