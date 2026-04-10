export default function Places({
  title,
  places,
  fallbackText,
  onAddRemovePlace
}) {
  return (
    <div className="border-2 border-cyan-950 rounded-[7px] mt-7 py-6 px-7">
        <h2 className="font-['Raleway'] font-semibold text-lg sm:text-[1.3rem] mb-2.5 text-cyan-100">
          {title}
        </h2>
        <div className="mt-4">
          {places.length > 0 ? (
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-6 [&>*:nth-child(odd)_button:hover]:rotate-[5deg] [&>*:nth-child(odd)_button:focus-visible]:rotate-[5deg] [&>*:nth-child(even)_button:hover]:-rotate-[5deg] [&>*:nth-child(even)_button:focus-visible]:-rotate-[5deg]">
              {places.map((place) => (
                <li key={place.id} className="relative">
                  <button
                    onClick={() => onAddRemovePlace(place.id)}
                    className="cursor-pointer rounded-md transition-all duration-200 ease-out hover:shadow-[0_0_8px_4px_#f0b100] focus-visible:shadow-[0_0_8px_4px_#f0b100] focus:outline-0 animate-[slideUp_0.3s_ease-in_1]"
                  >
                    <img
                      src={place.image.src}
                      alt={place.image.alt}
                      className="rounded-md inline-block"
                    />
                    <span className="absolute bottom-2 right-2 font-['Quicksand'] font-medium text-sm bg-yellow-300 text-gray-800 text-ye px-1 rounded-sm shadow-lg">
                      {place.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-['Bricolage_Grotesque'] text-gray-300 text-sm sm:text-[1rem]">
              {fallbackText}
            </p>
          )}
        </div>
        
    </div>
  );
}
