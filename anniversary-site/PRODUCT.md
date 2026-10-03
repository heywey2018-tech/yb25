# Yogesh & Bhavna — Silver Jubilee

A single-page personal digital invitation celebrating Yogesh and Bhavna’s 25th wedding anniversary on 14 November at Hotel Comfort Inn, Dehradun. Guests read their story, browse seven memory slots, discover the four-event evening itinerary, find the venue and RSVP.

The page must retain the user’s supplied copy and the order Hero → Our Journey → Celebration → Venue → RSVP. All 15 supplied photographs are placed in the host's selected slots. No unrelated couple photographs, fabricated relationship facts, additional pages, registry or blog. Date has no assumed year. Full venue address is pending host details; RSVP uses the supplied Google Apps Script endpoint.

Use Vite and produce a portable static build ZIP for the user’s chosen online hosting service. Configure photos, address and RSVP from a public JSON file without requiring a rebuild. A static ZIP cannot independently store shared RSVPs; use the supplied external form endpoint or honest email draft flow. Google Apps Script uses a no-cors form POST: completion can acknowledge dispatch, but cannot claim a row was saved because the response is opaque.
