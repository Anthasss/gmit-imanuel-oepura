import Images from "@/components/gallery/images";

export default function Gallery() {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <img src="/header/gallery.png" alt="Gallery Head" className="object-cover w-full h-full" />
        <h1 className="absolute text-8xl font-bold mt-4">Gallery</h1>
      </div>
      
      <Images />
    </div>
  );
}
