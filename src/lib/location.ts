export const PICKUP_LOCATION = {
  name: "Vintage Rides USA",
  street: "1715 Samco Rd",
  city: "Rapid City",
  state: "SD",
  zip: "57702",
} as const;

export const PICKUP_ADDRESS_INLINE = `${PICKUP_LOCATION.street}, ${PICKUP_LOCATION.city}, ${PICKUP_LOCATION.state} ${PICKUP_LOCATION.zip}`;

const QUERY = encodeURIComponent(PICKUP_ADDRESS_INLINE);

// Opens the address in the user's default Google Maps app/site.
export const PICKUP_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${QUERY}`;

// Opens turn-by-turn directions to the pickup location.
export const PICKUP_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${QUERY}`;

// Embeddable iframe map (no API key required).
export const PICKUP_MAP_EMBED_URL = `https://maps.google.com/maps?q=${QUERY}&output=embed`;
