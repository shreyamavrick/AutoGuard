import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVehicle } from "../context/vehicleContext";
import { useUser } from "../context/UserContext";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { vehicle, setVehicle } = useVehicle();
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (isAuthenticated && user?._id) {
      const savedCar = localStorage.getItem(`car_${user._id}`);
      if (savedCar) {
        try {
          setVehicle(JSON.parse(savedCar));
        } catch {
          localStorage.removeItem(`car_${user._id}`);
        }
      }
    }
  }, [isAuthenticated, user, setVehicle]);

 
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(
          "https://vaahan-suraksha-backend.vercel.app/api/v1/service/"
        );
        const data = await res.json();
        if (data.success) {
          setServices(data.data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleBookService = async (service) => {
    if (!isAuthenticated) {
      alert("Please log in first to book a service.");
      navigate("/login");
      return;
    }
    if (!vehicle?.brand || !vehicle?.model) {
      alert("Please confirm your car details before booking.");
      navigate("/dashboard/cars"); 
      return;
    }

    try {
      const res = await fetch(
        "https://vaahan-suraksha-backend.vercel.app/api/v1/service/subscription/"
      );
      const data = await res.json();

      if (data.success) {
        const subscriptions = data.data;

        // ⚡ For now assume the user has the first subscription
        const userSubscription = subscriptions[0];

        const isIncluded = userSubscription.services.includes(service._id);

        if (isIncluded) {
          // Book service directly
          alert(
            `✅ ${service.name} booked successfully for your ${vehicle.brand} ${vehicle.model}`
          );
          // 👉 here call your booking API when ready
        } else {
          // Suggest upgrade
          if (
            window.confirm(
              `❌ ${service.name} is not included in your plan.\nWould you like to view subscription?`
            )
          ) {
            navigate("/subscription", {
              state: { recommendedService: service },
            });
          }
        }
      }
    } catch (err) {
      console.error("Error checking subscription:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  if (loading) {
    return <p className="text-center py-20">Loading services...</p>;
  }

  // 🚨 If logged in but no car saved → force redirect to /cars
  if (isAuthenticated && (!vehicle?.brand || !vehicle?.model)) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-semibold mb-2">Confirm Your Car</h2>
        <p className="text-gray-600 mb-4">
          Please add your car details before booking a service.
        </p>
        <button
          onClick={() => navigate("/dashboard/cars")}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Add Car
        </button>
      </div>
    );
  }

  // 🚨 If not logged in and no vehicle chosen → ask to go home
  if (!isAuthenticated && (!vehicle?.brand || !vehicle?.model)) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-semibold mb-2">Select Vehicle</h2>
        <p className="text-gray-600 mb-4">
          Please select your vehicle (brand & model) before viewing services.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Select Vehicle
        </button>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Our <span className="text-purple-600">Premium Services</span>
        </h2>

        {/* Vehicle info */}
        {vehicle?.brand && vehicle?.model && (
          <p className="text-center text-gray-600 mb-14">
            Showing services for:{" "}
            <span className="font-semibold">
              {vehicle.brand} {vehicle.model}
            </span>{" "}
            {isAuthenticated && (
              <button
                onClick={() => navigate("/dashboard/cars")}
                className="ml-2 text-purple-600 underline hover:text-purple-800 text-sm"
              >
                Edit
              </button>
            )}
          </p>
        )}

        {/* Service Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200"
            >
              {/* Image */}
              <div className="relative group">
                <img
                  src={
                    service.images?.[0] ||
                    "https://via.placeholder.com/400x300?text=No+Image"
                  }
                  alt={service.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {service.name}
                </h3>
                <button
                  onClick={() => handleBookService(service)}
                  className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllServices;
