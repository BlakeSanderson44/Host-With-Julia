export type LocationCard = {
  slug: string;
  name: string;
  imageSrc: string; // public path under /public
  alt: string;
  blurb?: string;
};

export const LOCATIONS: LocationCard[] = [
  {
    slug: 'edmonds',
    name: 'Edmonds',
    imageSrc: '/images/locations/edmonds.svg',
    alt: 'A coastal view of Edmonds, Washington',
    blurb: 'Puget Sound charm with walkable neighborhoods and ferries.',
  },
  {
    slug: 'lake-chelan',
    name: 'Lake Chelan',
    imageSrc: '/images/locations/lake_chelan.svg',
    alt: 'Lake Chelan waterfront and rolling hills',
    blurb: 'Resort-style living and strong vacation-rental demand.',
  },
  {
    slug: 'mt-rainier',
    name: 'Mt. Rainier / Ashford',
    imageSrc: '/images/locations/mt_rainier.svg',
    alt: 'Mt. Rainier framed above evergreens near Ashford',
    blurb: 'Gateway to the park — year-round adventure and A-frame vibes.',
  },
];
