export default function GalleryImage({ image, title }) {
  return (
    <div className="relative">
      <img src={image.src} alt="gallery image" className="object-cover w-full h-full" />

      <div className="absolute bottom-0 left-0 right-0 text-white p-4 bg-black/70">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </div>
  );
}
