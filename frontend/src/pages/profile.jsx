

import { useEffect, useState } from "react";
import axios from "axios";
import {
  FiUser,
  FiCamera,
  FiEdit2,
  FiSave,
  FiX,
  FiMapPin,
  FiLock,
  FiMail,
  FiPhone,
  FiCheckCircle,
  FiPackage,
  FiTrash2,
} from "react-icons/fi";
import Navbar from "../components/navbar";

const API_URL = import.meta.env.VITE_API_URL;

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  country: "Sri Lanka",
};

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [originalForm, setOriginalForm] = useState(initialForm);

  const [profileImage, setProfileImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("Please sign in to view your profile.");
      setLoading(false);
      return;
    }

    const loadProfile = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data.user || response.data;

        setUser(data);

        const nameParts = (data.name || "").trim().split(" ");

        const profileData = {
          firstName: data.firstName || nameParts[0] || "",
          lastName:
            data.lastName || nameParts.slice(1).join(" ") || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          city: data.city || "",
          postalCode: data.postalCode || "",
          country: data.country || "Sri Lanka",
        };

        setForm(profileData);
        setOriginalForm(profileData);

        const image = data.imageUrl || data.profileImage || "";
        setProfileImage(image);
        setImagePreview(image);
      } catch (err) {
        console.error("Profile loading error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load your profile. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    setError("");
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setProfileImage("");
  };

  const handleCancel = () => {
    setForm(originalForm);
    setImageFile(null);
    setImagePreview(profileImage);
    setEditing(false);
    setError("");
    setMessage("");
  };

  const handleSave = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    try {
      let updatedImage = profileImage;

      // Upload the selected profile image
      if (imageFile) {
        const imageData = new FormData();
        imageData.append("profileImage", imageFile);

        const imageResponse = await axios.post(
          `${API_URL}/users/profile/upload-image`,
          imageData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        updatedImage =
          imageResponse.data.imageUrl ||
          imageResponse.data.profileImage;
      }

      const updatedData = {
        ...form,
        name: `${form.firstName} ${form.lastName}`.trim(),
        imageUrl: updatedImage,
      };

      // Save profile information
      const response = await axios.put(
        `${API_URL}/users/profile`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const savedUser = response.data.user || response.data;

      setUser(savedUser);
      setProfileImage(updatedImage || "");
      setImagePreview(updatedImage || "");
      setImageFile(null);
      setOriginalForm(form);
      setEditing(false);
      setMessage("Your profile has been updated successfully.");

      window.dispatchEvent(new Event("authChanged"));
    } catch (err) {
      console.error("Profile update error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to update your profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const displayName =
    `${form.firstName} ${form.lastName}`.trim() || "My Account";

  const avatarLetter = displayName.charAt(0).toUpperCase();

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F5F0]">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center pt-24">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#E9E1D6] border-t-[#B45309]" />
            <p className="mt-4 text-sm text-[#81776B]">
              Loading your account...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F5F0] text-[#29251F]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">

        {/* PAGE HEADING */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B45309]">
            FurniLK / My Account
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            My Account
          </h1>

          <p className="mt-2 text-sm text-[#81776B]">
            Manage your personal information and account preferences.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-700">
            <FiCheckCircle />
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">

          {/* LEFT PROFILE SIDEBAR */}
          <aside className="h-fit overflow-hidden rounded-3xl border border-[#E9E1D6] bg-white shadow-sm">

            <div className="bg-[#29251F] px-6 py-8 text-center text-white">
              <div className="relative mx-auto h-28 w-28">

                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="h-28 w-28 rounded-full border-4 border-white/20 object-cover"
                  />
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/20 bg-[#B45309] text-4xl font-semibold">
                    {avatarLetter}
                  </div>
                )}

                {editing && (
                  <label className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-4 border-[#29251F] bg-[#B45309] text-white transition hover:bg-[#92400E]">
                    <FiCamera size={17} />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                {displayName}
              </h2>

              <p className="mt-1 break-all text-sm text-white/60">
                {form.email}
              </p>

              {editing && imagePreview && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="mt-4 inline-flex items-center gap-2 text-xs text-red-200 transition hover:text-white"
                >
                  <FiTrash2 />
                  Remove photo
                </button>
              )}

              {editing && (
                <p className="mt-3 text-xs text-white/50">
                  JPG, PNG or WEBP · Maximum 5MB
                </p>
              )}
            </div>

            <div className="p-5">
              <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-widest text-[#A69A8B]">
                Account
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-3 rounded-xl bg-[#F8F5F0] px-4 py-3 text-sm font-medium text-[#B45309]">
                  <FiUser size={18} />
                  Personal Information
                </div>

                <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#81776B]">
                  <FiMapPin size={18} />
                  Address Information
                </div>

                <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#81776B]">
                  <FiPackage size={18} />
                  Order History
                </div>

                <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#81776B]">
                  <FiLock size={18} />
                  Account Security
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-[#F8F5F0] p-4">
                <p className="text-xs font-semibold text-[#29251F]">
                  Your FurniLK Account
                </p>
                <p className="mt-2 text-xs leading-5 text-[#81776B]">
                  Keep your information up to date for a smoother shopping experience.
                </p>
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <section className="space-y-6">

            {/* PERSONAL INFORMATION CARD */}
            <div className="rounded-3xl border border-[#E9E1D6] bg-white p-6 shadow-sm sm:p-8">

              <div className="flex flex-col justify-between gap-4 border-b border-[#EEE8E0] pb-6 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-xl font-semibold">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm text-[#81776B]">
                    Your personal details and contact information.
                  </p>
                </div>

                {!editing && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(true);
                      setMessage("");
                      setError("");
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#B45309] px-5 py-2.5 text-sm font-semibold text-[#B45309] transition hover:bg-[#B45309] hover:text-white"
                  >
                    <FiEdit2 />
                    Edit Profile
                  </button>
                )}
              </div>

              <form onSubmit={handleSave}>

                <div className="grid grid-cols-1 gap-6 py-7 sm:grid-cols-2">

                  <InputField
                    label="First Name"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    editing={editing}
                    placeholder="Enter first name"
                  />

                  <InputField
                    label="Last Name"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    editing={editing}
                    placeholder="Enter last name"
                  />

                  <InputField
                    label="Email Address"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    editing={false}
                    icon={<FiMail />}
                  />

                  <InputField
                    label="Phone Number"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    editing={editing}
                    placeholder="Enter phone number"
                    icon={<FiPhone />}
                  />

                </div>

                <div className="border-t border-[#EEE8E0] pt-7">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold">
                      Address Information
                    </h3>
                    <p className="mt-1 text-sm text-[#81776B]">
                      Your preferred delivery address.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                    <div className="sm:col-span-2">
                      <InputField
                        label="Street Address"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        editing={editing}
                        placeholder="Enter your street address"
                      />
                    </div>

                    <InputField
                      label="City"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      editing={editing}
                      placeholder="Enter city"
                    />

                    <InputField
                      label="Postal Code"
                      name="postalCode"
                      value={form.postalCode}
                      onChange={handleChange}
                      editing={editing}
                      placeholder="Enter postal code"
                    />

                    <InputField
                      label="Country"
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      editing={editing}
                      placeholder="Enter country"
                    />

                  </div>
                </div>

                {editing && (
                  <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#EEE8E0] pt-6 sm:flex-row sm:justify-end">

                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={saving}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[#DED5C9] px-6 py-3 text-sm font-semibold text-[#81776B] transition hover:bg-[#F8F5F0]"
                    >
                      <FiX />
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B45309] px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#92400E] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <FiSave />
                      {saving ? "Saving..." : "Save Changes"}
                    </button>

                  </div>
                )}

              </form>
            </div>

            {/* ACCOUNT SECURITY CARD */}
            <div className="rounded-3xl border border-[#E9E1D6] bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F8F5F0] text-[#B45309]">
                  <FiLock size={22} />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold">
                    Account Security
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[#81776B]">
                    Keep your account secure by using a strong password.
                  </p>
                  <p className="mt-3 text-xs text-[#A69A8B]">
                    Password management can be connected to your existing authentication system.
                  </p>
                </div>
              </div>
            </div>

          </section>
        </div>
      </div>
    </main>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  editing,
  placeholder,
  icon,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-[#51483F]"
      >
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A69A8B]">
            {icon}
          </span>
        )}

        <input
          id={name}
          name={name}
          type="text"
          value={value}
          onChange={onChange}
          readOnly={!editing}
          placeholder={placeholder || "Not provided"}
          className={`w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition ${
            icon ? "pl-11" : ""
          } ${
            editing
              ? "border-[#DED5C9] bg-white text-[#29251F] focus:border-[#B45309] focus:ring-2 focus:ring-[#B45309]/10"
              : "border-transparent bg-[#F8F5F0] text-[#655B50]"
          }`}
        />
      </div>
    </div>
  );
}
