import GalleryImage from "./galleryImage"

export default function Images({ images }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center min-h-screen bg-gray-100 p-8">
      {images && images.length > 0 ? (
        images.map((img, idx) => (
          <GalleryImage
            key={idx}
            image={{ src: img.url }}
            title={img.originalName}
          />
        ))
      ) : (
        <p>No images found.</p>
      )}
    </div>
  );
}