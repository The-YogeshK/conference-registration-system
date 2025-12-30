import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-4xl font-extrabold mb-10 text-black tracking-tight text-center">
        Conference Registration System
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <Link 
          href="/register/student" 
          className="group block p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-300 transform hover:-translate-y-1"
        >
          <h2 className="text-2xl font-bold text-blue-600 mb-2 group-hover:text-blue-700">Student</h2>
          <p className="text-gray-500 font-medium">Register with your university details.</p>
        </Link>
        
        <Link 
          href="/register/professional" 
          className="group block p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-300 transform hover:-translate-y-1"
        >
          <h2 className="text-2xl font-bold text-purple-600 mb-2 group-hover:text-purple-700">Professional</h2>
          <p className="text-gray-500 font-medium">Register with your company details.</p>
        </Link>
      </div>
    </div>
  );
}