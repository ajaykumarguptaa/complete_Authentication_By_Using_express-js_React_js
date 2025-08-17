import { useState,useEffect } from "react";
import { Home, User, Settings, LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";



export default function Dashboard() {
  // State to manage the sidebar open/close state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  //loggedInUser state
  const [loggedInUser, setLoggedInUser] = useState(null); 

//product state
  const [products, setProducts] = useState([]);

  // Fetch the logged-in user from localStorage
  useEffect(() => {
    const user = localStorage.getItem("LoggedInUser");
    setLoggedInUser(user);
  },[])



  // Logout function
  const navigate=useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("LoggedInUser");
    setTimeout(() => {
      navigate("/home");
    }, 500);
    // window.location.href = "/login";// also work rather than navigate
  }


  const  fetchProduct= async ()=>{
    try{
      const url="http://localhost:3000/products";
      const response = await fetch(url,{
        method:"GET",
        headers:{
          // "Content-Type":"application/json",
          "Authorization":localStorage.getItem("token")
        }
      }
    );
      const data = await response.json();
      setProducts(data);
      console.log(data);
    }catch(error){
      console.error("Error:",error);
    }
  }

  useEffect(()=>{
      fetchProduct()
  },[] )

  

  return (
    <div className="min-h-screen flex bg-zinc-600">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-zinc-800 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-700">
          <h1 className={`text-lg font-bold ${!isSidebarOpen && "hidden"}`}>
            My Dashboard
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-zinc-700 rounded-lg"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-4 space-y-2">
          <NavItem icon={<Home size={20} />} label="Dashboard" open={isSidebarOpen} />
          <NavItem icon={<User size={20} />} label="Profile" open={isSidebarOpen} />
          <NavItem icon={<Settings size={20} />} label="Settings" open={isSidebarOpen} />
        </nav>

        {/* Logout */}
        <div onClick={handleLogOut} className="p-4 border-t border-zinc-700">
          <NavItem icon={<LogOut size={20} />} label="Logout" open={isSidebarOpen} />
          
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold text-zinc-800">Welcome, {loggedInUser}!</h2>
        <p className="mt-2 text-zinc-600">
          This is your dashboard. You can manage your profile, view stats, and update settings.
        </p>

        {/* Example Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card title="Total Projects" value="12" />
          <Card title="Tasks Completed" value="89" />
          <Card title="Messages" value="23" />
        </div>
        {/* Products Section */}
        <section className="mt-8">
          <h3 className="text-lg font-semibold text-zinc-800">Your Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {products.map((product,index) => (
              <Card key={index} title={product.name} value={product.price} />
            ))}
          </div>
        </section>

      <ToastContainer />
      </main>
    </div>
  );
}

function NavItem({ icon, label, open }) {
  return (
    <a
      href="#"
      className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-zinc-700 transition"
    >
      {icon}
      {open && <span>{label}</span>}
    </a>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-zinc-700 shadow-md rounded-lg p-4">
      <h3 className="text-xl text-zinc-400">{title}</h3>
      <p className="text-xl font-bold text-zinc-900">{value}</p>
    </div>
  );
}
