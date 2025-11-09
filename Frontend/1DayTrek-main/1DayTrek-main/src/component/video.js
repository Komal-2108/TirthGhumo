"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  ChevronLeft,
  ChevronRight,
  PlayIcon,
  PauseIcon,
  Volume2,
  VolumeX,

} from "lucide-react";

export default function VideoTestimonials() {
  const [mounted, setMounted] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [api, setApi] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [volumes, setVolumes] = useState({});
  const [progress, setProgress] = useState({});
  const videoRefs = useRef([]);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (emblaApi) setApi(emblaApi);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => api && api.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api && api.scrollNext(), [api]);

  const testimonials = [
    {
      quote: "This trek was an unforgettable experience!",
      name: "Manthan",
      video: "/video/testimonial1.mp4",
    },
    {
      quote: "The organizers made everything seamless and fun!",
      name: "Priya Sharma",
      video: "/video/testimonial2.mp4",
    },
    {
      quote: "Loved every moment of the adventure.",
      name: "Samantha Dengate",
      video: "/video/testimonial3.mp4",
    },
    {
      quote: "An incredible journey with amazing people!",
      name: "Anuj Verma",
      video: "/video/testimonial4.mp4",
    },
    {
      quote: "An incredible journey with amazing people!",
      name: "Anuj Verma",
      video: "/video/testimonial5.mp4",
    },
  ];


  const handlePlayToggle = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (playingIndex === index) {
      video.pause();
      setPlayingIndex(null);
    } else {
      videoRefs.current.forEach((v, i) => {
        if (v && i !== index) {
          v.pause();
          v.currentTime = 0;
        }
      });
      video.play();
      setPlayingIndex(index);
    }
  };


  const handleVolumeToggle = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    video.muted = !video.muted;
    setVolumes((prev) => ({
      ...prev,
      [index]: video.muted ? 0 : video.volume,
    }));
  };

  const handleVolumeChange = (index, e) => {
    const video = videoRefs.current[index];
    if (!video) return;
    const newVolume = e.target.value;
    video.volume = newVolume;
    video.muted = newVolume === "0";
    setVolumes((prev) => ({ ...prev, [index]: parseFloat(newVolume) }));
  };


  const handleSeek = (index, e) => {
    const video = videoRefs.current[index];
    if (video && video.duration) {
      const seekTime = (e.target.value / 100) * video.duration;
      video.currentTime = seekTime;
    }
  };

  const updateProgress = (index) => {
    const video = videoRefs.current[index];
    if (video && video.duration) {
      const progressValue = (video.currentTime / video.duration) * 100;
      setProgress((prev) => ({ ...prev, [index]: progressValue }));
    }
  };

  const handleVideoEnd = () => setPlayingIndex(null);

  if (!mounted) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-16 text-center text-gray-500">
        <p>Loading video testimonials...</p>
      </section>
    );
  }

  return (
    <section className="relative max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-orange-500 via-amber-500 to-yellow-400 mb-10 text-center relative">
        Hear from our Trekers
        <span className="block w-20 h-1 bg-linear-to-r from-orange-400 to-amber-300 mx-auto mt-3 rounded-full"></span>
      </h2>



      <button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 md:-translate-x-15 z-1 bg-white shadow-lg rounded-full p-3 hover:scale-110 transition"
      >
        <ChevronLeft size={32} className="text-gray-700" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 md:translate-x-15 z-1 bg-white shadow-lg rounded-full p-3 hover:scale-110 transition"
      >
        <ChevronRight size={32} className="text-gray-700" />
      </button>


      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {testimonials.map((t, index) => {
            const isPlaying = playingIndex === index;
            const currentVolume = volumes[index] ?? 1;
            const progressValue = progress[index] || 0;

            return (
              <div
                key={index}
                className="relative flex-[0_0_75%] md:flex-[0_0_32%] ml-10 rounded-3xl overflow-hidden shadow-xl bg-black group"
              >
                {/* Video */}
                <div className="relative w-full h-[520px] flex items-center justify-center bg-black">
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={t.video}
                    className="absolute inset-0 w-full h-full object-cover z-10"
                    playsInline
                    onTimeUpdate={() => updateProgress(index)}
                    onEnded={handleVideoEnd}
                    controls={false}
                  />


                  <button
                    onClick={() => handlePlayToggle(index)}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 rounded-full p-4 scale-0 group-hover:scale-100 transition-transform duration-300 z-30"
                  >
                    {isPlaying ? (
                      <PauseIcon size={50} className="text-gray-900" />
                    ) : (
                      <PlayIcon size={50} className="text-gray-900" />
                    )}
                  </button>
                </div>


                <div className="absolute bottom-0 left-0 w-full bg-black/70 backdrop-blur-md flex items-center gap-4 px-4 py-3 text-white z-30">

                  <button onClick={() => handlePlayToggle(index)}>
                    {isPlaying ? (
                      <PauseIcon size={24} className="text-white" />
                    ) : (
                      <PlayIcon size={24} className="text-white" />
                    )}
                  </button>


                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progressValue}
                    onChange={(e) => handleSeek(index, e)}
                    className="w-full accent-orange-400 cursor-pointer"
                  />


                  <div className="relative group/vol flex items-center">
                    <button onClick={() => handleVolumeToggle(index)}>
                      {currentVolume === 0 ? (
                        <VolumeX size={22} className="text-white" />
                      ) : (
                        <Volume2 size={22} className="text-white" />
                      )}
                    </button>


                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={currentVolume}
                      onChange={(e) => handleVolumeChange(index, e)}
                      className="absolute -top-8 right-0 w-24 opacity-0 group-hover/vol:opacity-100 transition-opacity duration-300 accent-orange-400 cursor-pointer"
                    />
                  </div>
                </div>


                <div
                  className={`absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent p-6 flex flex-col justify-end text-white transition-opacity duration-500 ${isPlaying ? "opacity-0" : "opacity-100"
                    }`}
                >

                  <div className="text-sm opacity-80 mb-1">{t.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
