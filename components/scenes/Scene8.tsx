'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Map, Marker, Popup } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

interface Restaurant {
  id: number;
  name: string;
  type: string;
  yearClosed: number;
  lat: number;
  lng: number;
  story: string;
  impact: string;
}

const closedRestaurants: Restaurant[] = [
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

export default function Scene8() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [viewState, setViewState] = useState({
    longitude: -123.1207,
    latitude: 49.2827,
    zoom: 12,
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-slate-950 py-24"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-6xl font-bold text-white mb-6">
            The Map of Loss
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Each pin represents a beloved restaurant that couldn't survive the squeeze.
            Click to see their stories.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative h-[600px] rounded-2xl overflow-hidden border-2 border-red-900/50 shadow-2xl"
        >
          <Map
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/dark-v11"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'}
          >
            {closedRestaurants.map((restaurant) => (
              <Marker
                key={restaurant.id}
                longitude={restaurant.lng}
                latitude={restaurant.lat}
                anchor="bottom"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setSelectedRestaurant(restaurant);
                }}
              >
                <div className="relative cursor-pointer group">
                  <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-60 animate-pulse" />
                  <div className="relative w-6 h-6 bg-red-600 rounded-full border-2 border-white shadow-lg group-hover:scale-125 transition-transform" />
                </div>
              </Marker>
            ))}

            {selectedRestaurant && (
              <Popup
                longitude={selectedRestaurant.lng}
                latitude={selectedRestaurant.lat}
                anchor="top"
                onClose={() => setSelectedRestaurant(null)}
                closeButton={true}
                closeOnClick={false}
                className="restaurant-popup"
              >
                <div className="bg-slate-900 rounded-lg p-4 min-w-[250px]">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {selectedRestaurant.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm bg-red-900/30 text-red-400 px-2 py-1 rounded">
                      {selectedRestaurant.type}
                    </span>
                    <span className="text-sm text-gray-400">
                      Closed {selectedRestaurant.yearClosed}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    {selectedRestaurant.story}
                  </p>
                  <div className="bg-red-950/30 rounded-lg p-3 border border-red-900/30">
                    <p className="text-red-400 text-xs font-medium">
                      {selectedRestaurant.impact}
                    </p>
                  </div>
                </div>
              </Popup>
            )}
          </Map>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-4xl font-bold text-red-400 mb-2">1,200+</div>
            <div className="text-gray-300">Restaurants Closed</div>
            <div className="text-sm text-gray-400 mt-2">Since 2015 in Metro Vancouver</div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-4xl font-bold text-red-400 mb-2">30%</div>
            <div className="text-gray-300">Won't Reopen</div>
            <div className="text-sm text-gray-400 mt-2">Of restaurants that closed during pandemic</div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-4xl font-bold text-red-400 mb-2">Every Week</div>
            <div className="text-gray-300">New Closure</div>
            <div className="text-sm text-gray-400 mt-2">Average rate in 2023-2024</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
