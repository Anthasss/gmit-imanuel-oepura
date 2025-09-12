import { useEffect, useState } from "react";
import Image from "next/image";
import Images from "@/components/gallery/images";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGaleri() {
      setLoading(true);
      const res = await fetch("/api/galeri");
      const data = await res.json();
      if (data.success && data.data.items.length > 0) {
        // Parse fotos JSON string
        const galeriItem = data.data.items[0];
        const fotos = galeriItem.fotos ? JSON.parse(galeriItem.fotos) : [];
        setImages(fotos);
      }
      setLoading(false);
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
        <h1 className="absolute text-8xl font-bold mt-4">Gallery</h1>
      </div>
      <div className="p-8">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Images images={images} />
        )}
      </div>
    </div>
  );
}
