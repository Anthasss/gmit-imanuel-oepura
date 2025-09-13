import GalleryImage from "./galleryImage"

export default function Images({ galleryItems }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {galleryItems && galleryItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <GalleryImage
              key={item.id}
              galleryItem={item}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No gallery items found.</p>
        </div>
      )}
    </div>
  );
}