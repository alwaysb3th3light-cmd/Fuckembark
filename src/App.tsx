function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">App Restored</h1>
        <p className="text-gray-600 mb-6">The application files were successfully restored to a functional state.</p>
        <div className="bg-blue-50 text-blue-700 p-4 rounded-lg font-mono text-sm break-all text-left">
          <strong>Your App URL is:</strong><br />
          <a href="https://ais-pre-i7gyuw6fp3zm4hc2zcg2ys-441953271418.us-west2.run.app" target="_blank" rel="noreferrer" className="underline hover:text-blue-800">
            https://ais-pre-i7gyuw6fp3zm4hc2zcg2ys-441953271418.us-west2.run.app
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
