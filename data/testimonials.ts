export type Testimonial = {
  id: string;
  name: string;
  property: string;
  location?: string;
  date?: string;
  rating?: number;
  text: string;
  source?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Jose Javier",
    property: "A-Frame • Firepit • Hot Tub • EV • Mt. Rainier",
    location: "Ashford, Washington",
    date: "2024-07",
    rating: 5,
    text:
      "One of the most beautiful places I’ve stayed in. Julia was incredibly helpful and the cabin felt like pure magic. I’m planning to return.",
    source: "Airbnb review",
  },
  {
    id: "t2",
    name: "Jennifer",
    property: "A-Frame • Firepit • Hot Tub • EV • Mt. Rainier",
    location: "Ashford, Washington",
    date: "2024-06",
    rating: 5,
    text:
      "Very close to the Mt. Rainier entrance and the hot tub was wonderful. Julia responded quickly to every question.",
    source: "Airbnb review",
  },
  {
    id: "t3",
    name: "James",
    property: "A-Frame • Firepit • Hot Tub • EV • Mt. Rainier",
    location: "Ashford, Washington",
    date: "2024-05",
    rating: 5,
    text:
      "A perfect place to unwind after a long day exploring Mount Rainier. Well-equipped home and the hot tub was amazing.",
    source: "Airbnb review",
  },
  {
    id: "t4",
    name: "Viraj",
    property: "A-Frame • Firepit • Hot Tub • EV • Mt. Rainier",
    location: "Ashford, Washington",
    date: "2024-04",
    rating: 5,
    text:
      "Very close to the park and Julia was a responsive host. Had a lovely stay and would love to return.",
    source: "Airbnb review",
  },
  {
    id: "t5",
    name: "Aldo",
    property: "A-Frame • Firepit • Hot Tub • EV • Mt. Rainier",
    location: "Ashford, Washington",
    date: "2024-03",
    rating: 5,
    text: "Great luxury cabin and Julia’s responses were quick and helpful.",
    source: "Airbnb review",
  },
  {
    id: "t6",
    name: "Sonam",
    property: "A-Frame • Firepit • Hot Tub • EV • Mt. Rainier",
    location: "Ashford, Washington",
    date: "2024-02",
    rating: 5,
    text:
      "Beautiful and fully stocked cabin with comfy beds and sofas. Easy-to-use hot tub and peaceful surroundings—elk and deer sometimes wander by.",
    source: "Airbnb review",
  },
  {
    id: "t7",
    name: "Lisa",
    property: "Indoor Pool • Hot Tub • Games • Lake Access",
    location: "Chelan, Washington",
    date: "2024-07",
    rating: 5,
    text:
      "Condo matched the description exactly. Clear instructions and very responsive host. Julia shared great local suggestions—we’d definitely stay again.",
    source: "Airbnb review",
  },
  {
    id: "t8",
    name: "Summer",
    property: "Lake Access & Views • Indoor Pool & Hot Tub",
    location: "Chelan, Washington",
    date: "2024-06",
    rating: 5,
    text:
      "Spotless, well-stocked, with a beautiful lake view. Julia was super responsive and thoughtful—she even shipped back my daughter’s forgotten stuffed animal. Truly above-and-beyond service.",
    source: "Airbnb review",
  },
  {
    id: "t9",
    name: "Trisha",
    property: "Lake Access & Views • Indoor Pool & Hot Tub",
    location: "Chelan, Washington",
    date: "2024-05",
    rating: 5,
    text:
      "Clean and comfortable with a well-stocked kitchen and bedrooms. Beds were very comfy and the lake view was incredible. Highly recommend.",
    source: "Airbnb review",
  },
  {
    id: "t10",
    name: "Emily Jo",
    property: "Chelan Getaway • Indoor Pool, Hot Tub & Games",
    location: "Chelan, Washington",
    date: "2024-04",
    rating: 5,
    text: "Julia was very helpful—I would highly recommend renting her condo in Chelan.",
    source: "Airbnb review",
  },
];
