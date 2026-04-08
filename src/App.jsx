import Places from "./components/Places"

function App() {
  return (
    <>
      <div className="border-2 border-cyan-950 rounded-[7px] mt-7 py-6">
        <h2 className="font-['Raleway'] font-semibold text-lg sm:text-[1.3rem] mb-2.5 text-cyan-100">I'd like to visit...</h2>
        <p className="font-['Bricolage_Grotesque'] text-gray-300 text-sm sm:text-[1rem]">Select the places you would like to visit below.</p>
      </div>
      <div className="border-2 border-cyan-950 rounded-[7px] mt-7 mb-5 py-6 px-7">
        <h2 className="font-['Raleway'] font-semibold text-lg sm:text-[1.3rem] text-cyan-100">Available Places</h2>
        <Places />
      </div>
    </>
  )
}

export default App
