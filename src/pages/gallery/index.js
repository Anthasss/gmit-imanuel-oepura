import { useEffect, useState } from "react";
import Image from "next/image";
import Images from "@/components/gallery/images";

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGaleri() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/galeri");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (data.success && data.data.items.length > 0) {
          // Pass the gallery items directly without flattening
          setGalleryItems(data.data.items);
        } else {
          setGalleryItems([]);
        }
      } catch (err) {
        console.error("Error fetching gallery data:", err);
        setError(err.message || "Failed to load gallery data");
        setGalleryItems([]);
      } finally {
        setLoading(false);
      }
    }

    fetchGaleri();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center h-screen relative">
        <Image
          src="/header/gallery.png"
          alt="Gallery Head"
          layout="fill"
          objectFit="cover"
          priority
        />
        <h1 className="absolute text-8xl font-bold mt-4 text-white">
          Gallery
        </h1>
      </div>
      <div className="bg-gray-50 min-h-screen">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="loading loading-xl text-neutral"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <p className="text-red-500 text-lg mb-2">
                Error loading gallery
              </p>
              <p className="text-gray-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <Images galleryItems={galleryItems} />
        )}
      </div>
    </div>
  );
}
