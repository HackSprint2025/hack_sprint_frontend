function Navbar() {
  return (
    <nav className="flex w-full px-10 py-5 bg-gray-100">
        <h1 className="text-3xl font-semibold cursor-pointer">Healthify</h1>
        <ul className="flex ml-auto space-x-4 text-lg">
            <li className="hover:text-slate-700 font-semibold cursor-pointer">Home</li>
            <li className="hover:text-slate-700 font-semibold cursor-pointer">About</li>
            <li className="hover:text-slate-700 font-semibold cursor-pointer">Contact</li>
        </ul>
    </nav>
  )
}

export default Navbar