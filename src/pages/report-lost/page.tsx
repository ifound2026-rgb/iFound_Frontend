const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Submit clicked"); // <- Add this
  alert("Submit clicked"); // Optional for visible test
  // rest of your code...
};

import { useState } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { categories } from '../../mocks/foundItems';

export default function ReportLostPage() {
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    description: '',
    location: '',
    dateLost: '',
    ownerName: '',
    email: '',
    phone: '',
    image: ''
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Updated handleSubmit to connect to backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // JWT after login

      // Prepare payload for backend
      const payload = { ...formData };

      // Include image if uploaded
      if (selectedImage) {
        payload.image = selectedImage; // backend should accept base64 string
      }

      const response = await fetch("https://ifound-backend-h1le.onrender.com/api/lost", {
  method: "POST", // must be POST
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`, // if your backend requires JWT
  },
  body: JSON.stringify(payload),
});



      if (!response.ok) {
        throw new Error("Failed to submit lost item");
      }

      const data = await response.json();
      console.log("Lost item saved:", data);

      // Show success popup
      setShowSuccess(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          itemName: "",
          category: "",
          description: "",
          location: "",
          dateLost: "",
          ownerName: "",
          email: "",
          phone: "",
          image: "",
        });
        setSelectedImage(null);
      }, 3000);
    } catch (err) {
      console.error("Error submitting lost item:", err);
      alert("There was a problem submitting your report. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-search-line text-3xl text-red-600"></i>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Report Lost Item</h1>
            <p className="text-lg text-gray-600">
              Fill out the form below with as much detail as possible to help us find your lost item
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Item Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Blue Backpack"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  >
                    <option value="">Select a category</option>
                    {categories.filter(cat => cat !== 'All Categories').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date Lost <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateLost"
                    value={formData.dateLost}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location Lost <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Library 2nd Floor"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Upload Photo
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      {selectedImage ? (
                        <div>
                          <img src={selectedImage} alt="Preview" className="max-h-48 mx-auto rounded-lg mb-2" />
                          <p className="text-sm text-gray-600">Click to change image</p>
                        </div>
                      ) : (
                        <div>
                          <i className="ri-image-add-line text-4xl text-gray-400 mb-2"></i>
                          <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Provide detailed description including color, brand, size, distinctive features..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm resize-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 mt-4">Contact Information</h3>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    required
                    placeholder="Full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@school.edu"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-4 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                  <i className="ri-send-plane-line mr-2"></i>
                  Submit Report
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      itemName: '',
                      category: '',
                      description: '',
                      location: '',
                      dateLost: '',
                      ownerName: '',
                      email: '',
                      phone: '',
                      image: ''
                    });
                    setSelectedImage(null);
                  }}
                  className="px-6 py-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all whitespace-nowrap"
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-checkbox-circle-line text-4xl text-green-600"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">Report Submitted!</h3>
            <p className="text-gray-600 text-center">
              Your lost item report has been submitted successfully. We'll notify you if we find a match.
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
