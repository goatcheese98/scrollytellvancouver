/** Original Scene8 records retained verbatim; not a current closure registry. */
export interface Restaurant {
  id: number;
  name: string;
  type: string;
  yearClosed: number;
  lat: number;
  lng: number;
  story: string;
  impact: string;
}

export const closedRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "Kent's Kitchen",
    type: 'Family Restaurant',
    yearClosed: 2023,
    lat: 49.2827,
    lng: -123.1207,
    story: 'A 30-year staple in the community, serving homestyle meals.',
    impact: 'Lost 25 jobs, beloved breakfast spot gone',
  },
  {
    id: 2,
    name: "Zefferelli's",
    type: 'Italian Fine Dining',
    yearClosed: 2022,
    lat: 49.2665,
    lng: -123.1365,
    story: 'Award-winning pasta house that couldn\'t survive rent increases.',
    impact: 'Insurance tripled in final year',
  },
  {
    id: 3,
    name: 'The Templeton',
    type: 'Diner',
    yearClosed: 2024,
    lat: 49.2643,
    lng: -123.1034,
    story: 'Historic diner closed after 70+ years in operation.',
    impact: 'Could not compete with delivery apps',
  },
  {
    id: 4,
    name: 'Burgoo Bistro',
    type: 'Casual Dining',
    yearClosed: 2023,
    lat: 49.2733,
    lng: -123.1342,
    story: 'Popular comfort food spot with three locations, all closed.',
    impact: 'Labour costs became unsustainable',
  },
  {
    id: 5,
    name: 'The Arbor',
    type: 'Contemporary Canadian',
    yearClosed: 2024,
    lat: 49.2612,
    lng: -123.1139,
    story: 'Farm-to-table restaurant known for local ingredients.',
    impact: 'Supply chain volatility and rising costs',
  },
];

