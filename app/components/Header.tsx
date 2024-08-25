export default function Header() {
  return (
    <header className="flex justify-between items-center bg-gray-900 p-4 text-white">
      <div className="text-xl font-bold">Wager Dashboard</div>
      <div className="flex space-x-4">
        <button className="bg-yellow-500 px-4 py-2 rounded">Casino</button>
        <button className="bg-gray-700 px-4 py-2 rounded">Sports</button>
        <div className="flex space-x-2">
          <button className="bg-gray-800 px-4 py-2 rounded">Login</button>
          <button className="bg-yellow-500 px-4 py-2 rounded">Register</button>
        </div>
      </div>
    </header>
  );
}
