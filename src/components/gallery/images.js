import GalleryImage from "./galleryImage"

export default function Images(){
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-1 md:grid-rows-2 gap-4 justify-center items-center min-h-screen bg-gray-100 p-8">
      <GalleryImage image={{ src: "/dummy/gallery/galleryImage.png" }} title="Image 1" />
      <GalleryImage image={{ src: "/dummy/gallery/galleryImage.png" }} title="Image 2" />
      <GalleryImage image={{ src: "/dummy/gallery/galleryImage.png" }} title="Image 3" />
      <GalleryImage image={{ src: "/dummy/gallery/galleryImage.png" }} title="Image 4" />
      <GalleryImage image={{ src: "/dummy/gallery/galleryImage.png" }} title="Image 5" />
      <GalleryImage image={{ src: "/dummy/gallery/galleryImage.png" }} title="Image 6" />

    </div>
  )
}