import { AVAILABLE_PLACES } from "../data.js";

export default function Places() {
  return (
    <div className="mt-4">
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-6 [&>*:nth-child(odd)_button:hover]:rotate-[5deg] [&>*:nth-child(odd)_button:focus-visible]:rotate-[5deg] [&>*:nth-child(even)_button:hover]:-rotate-[5deg] [&>*:nth-child(even)_button:focus-visible]:-rotate-[5deg]">
        {AVAILABLE_PLACES.map((place) => (
          <li className="relative">
            <button className="cursor-pointer rounded-md transition-all duration-200 ease-out hover:shadow-[0_0_8px_4px_#f0b100] focus-visible:shadow-[0_0_8px_4px_#f0b100] focus:outline-0">
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
    </div>
  );
}
