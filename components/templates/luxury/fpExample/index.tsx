'use client';
import { motion } from "framer-motion";

export default function FPExample({
  couple = { bride: "Sarah", groom: "John" },
  date = "Saturday, September 20, 2025",
  venue = "The Garden Venue, Jakarta",
  photoUrl = "https://placehold.co/600x400?text=Couple+Photo"
}) {
  return (
    <div className="min-h-screen bg-[#fffaf0] flex flex-col items-center justify-center px-4 py-12 font-serif">
      {/* Decorative Frame */}
      <div className="relative max-w-3xl w-full border-[4px] border-[#e3d5ca] rounded-[2rem] shadow-lg overflow-hidden">
        {/* Floral Accent (Top Left) */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-[url('https://www.svgrepo.com/show/306982/floral.svg')] bg-contain bg-no-repeat opacity-40"></div>
        {/* Floral Accent (Bottom Right) */}
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-[url('https://www.svgrepo.com/show/306982/floral.svg')] bg-contain bg-no-repeat opacity-40 rotate-180"></div>

        {/* Cover Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center pt-10 px-6"
        >
          <h1 className="text-5xl md:text-6xl text-gray-800">
            {couple.bride} & {couple.groom}
          </h1>
          <p className="text-gray-600 italic text-lg mt-2">
            “A fairytale beginning for our forever”
          </p>
        </motion.div>

        {/* Photo Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-center px-6"
        >
          <img
            src={photoUrl}
            alt="Couple"
            className="rounded-2xl shadow-md border border-[#d4c1b3] max-h-[350px] object-cover"
          />
        </motion.div>

        {/* Invitation Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center px-6 py-8"
        >
          <h2 className="text-3xl text-gray-700 mb-2">You Are Invited</h2>
          <p className="text-gray-600 mb-4">{date}</p>
          <p className="text-gray-600">{venue}</p>
          <div className="border-t border-[#d4c1b3] w-1/2 mx-auto my-6"></div>
          <p className="text-gray-600">
            Join us for an evening filled with love, laughter, and celebration as
            we say “I do.”
          </p>
        </motion.div>

        {/* RSVP Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="pb-10 text-center"
        >
          <button className="px-8 py-3 bg-[#d4a373] text-white font-medium rounded-full shadow-md hover:bg-[#b5835a] transition">
            RSVP Now
          </button>
        </motion.div>
      </div>
    </div>
  );
}