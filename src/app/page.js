export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black px-6 py-10">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-xl font-bold">FABRICKRAAM</h1>
        <nav className="space-x-6">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Gallery</a>
          <a href="#" className="hover:underline">Generate</a>
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Contact</a>
        </nav>
      </header>


      {/* Hero */}
      <section className="text-center mb-16">
        <h2 className="text-4xl font-semibold mb-4">Create Your Own Indigo Pattern</h2>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Start Generating
        </button>
      </section>
      
      {/* Gallery */}
      <section className="mb-16">
        <h3 className="text-2xl font-semibold mb-4">Gallery</h3>
        <div className="space-x-6 mb-6">
          <button className="font-semibold">Traditional</button>
          <button>Modern</button>
          <button>Fusion</button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-blue-600 w-full h-40 rounded-md" />
          ))}
        </div>
      </section>


      {/* Generate Section */}
      <section className="mb-16">
        <h3 className="text-2xl font-semibold mb-4">Generate</h3>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Geometric modern indigo pattern"
            className="flex-1 border border-gray-300 px-4 py-2 rounded"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Generate Pattern
          </button>
        </div>
      </section>

      
      {/* Footer */}
      <footer className="border-t pt-6 flex justify-between text-sm text-gray-600">
        <div className="space-x-4">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <div className="space-x-4">
          <span>info@example.com</span>
          <span>©</span>
        </div>
      </footer>
    </main>
    
  );
}  