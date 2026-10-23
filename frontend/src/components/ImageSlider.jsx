import { useState, useEffect } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2
} from "react-icons/fi";

export default function ImageSlider(props) {

  const images = props.images
    ? Array.isArray(props.images)
      ? props.images.filter(Boolean)
      : [props.images]
    : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center rounded-3xl bg-gray-100 sm:h-[500px]">
        <p className="text-gray-500 text-lg">
          No Images Found
        </p>
      </div>
    );
  }

  function nextImage() {
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function prevImage() {
    if (currentIndex === 0) {
      setCurrentIndex(images.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  }

  return (

    <div className="w-full max-w-[650px]">

      {/* MAIN IMAGE */}
      <div className="relative group overflow-hidden rounded-3xl bg-[#f8f6f2] shadow-[0_15px_50px_rgba(0,0,0,0.12)]">

        <img
          className="h-[320px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px] lg:h-[550px]"
          src={images[currentIndex]}
          alt={`Product image ${currentIndex + 1}`}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

        {/* Previous */}
        <button
          onClick={prevImage}
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-md transition duration-300 hover:scale-110 sm:left-5 sm:h-12 sm:w-12 sm:opacity-0 sm:group-hover:opacity-100"
        >
          <FiChevronLeft size={24} />
        </button>

        {/* Next */}
        <button
          onClick={nextImage}
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-md transition duration-300 hover:scale-110 sm:right-5 sm:h-12 sm:w-12 sm:opacity-0 sm:group-hover:opacity-100"
        >
          <FiChevronRight size={24} />
        </button>

        {/* Counter */}
        <div className="absolute bottom-5 right-5 bg-black/60 text-white px-4 py-2 rounded-full text-sm backdrop-blur-md">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Zoom Icon */}
        <div className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md shadow-md flex items-center justify-center">
          <FiMaximize2 size={18} />
        </div>

      </div>

      {/* THUMBNAILS */}
      <div className="flex gap-4 mt-6 overflow-x-auto pb-2">

        {images.map((img, index) => {

          return (

            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative min-w-[95px] h-[95px] rounded-2xl overflow-hidden cursor-pointer transition duration-300 ${
                index === currentIndex
                  ? "ring-4 ring-[#824203] scale-105"
                  : "opacity-70 hover:opacity-100"
              }`}
            >

              <img
                className="w-full h-full object-cover"
                src={img}
                alt=""
              />

              {index === currentIndex && (
                <div className="absolute inset-0 bg-black/10"></div>
              )}

            </div>

          );
        })}

      </div>

    </div>
  );
}