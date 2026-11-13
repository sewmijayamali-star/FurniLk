
import { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from "../admin";
import { toast } from "react-hot-toast";

export default function AdminCategories() {
  const [active, setActive] = useState("Categories");

  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch categories
  async function fetchCategories() {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API_URL}/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategories(response.data);

    } catch (error) {
      console.error("Error fetching categories:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Failed to load categories"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  // Open Add Category Modal
  function openAddModal() {
    setEditingCategory(null);
    setName("");
    setImage("");
    setShowModal(true);
  }

  // Open Edit Category Modal
  function openEditModal(category) {
    setEditingCategory(category);
    setName(category.name);
    setImage(category.image || "");
    setShowModal(true);
  }

  // Save Category
  async function handleSaveCategory(e) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (editingCategory) {
        await axios.put(
          `${API_URL}/categories/${editingCategory._id}`,
          {
            name: name.trim(),
            image,
          },
          config
        );

        toast.success("Category updated successfully");

      } else {
        await axios.post(
          `${API_URL}/categories`,
          {
            name: name.trim(),
            image,
          },
          config
        );

        toast.success("Category added successfully");
      }

      setShowModal(false);
      setName("");
      setImage("");
      setEditingCategory(null);

      fetchCategories();

    } catch (error) {
      console.error("Category save error:", error.response?.data || error.message);

      toast.error(
        error.response?.data?.message || "Failed to save category"
      );
    } finally {
      setSaving(false);
    }
  }

  // Delete Category
  async function handleDeleteCategory(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      const token = localStorage.getItem("token");

      await axios.delete(
        `${API_URL}/categories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Category deleted successfully");

      fetchCategories();

    } catch (error) {
      console.error("Delete category error:", error.response?.data || error.message);

      toast.error(
        error.response?.data?.message || "Failed to delete category"
      );
    } finally {
      setDeletingId(null);
    }
  }

  // Search Categories
  const filteredCategories = categories.filter((category) =>
    category.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#F8F5F0]">

      {/* Sidebar */}
      <Sidebar active={active} setActive={setActive} />

      <main className="min-w-0 flex-1 overflow-auto px-4 pb-8 pt-20 sm:px-6 sm:py-8 lg:px-8">

        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B45309]">
              Management
            </p>

            <h1 className="mt-1 text-3xl font-black text-slate-950">
              Categories
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Organize and manage your furniture categories
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="rounded-xl bg-[#B45309] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#92400E]"
          >
            + Add Category
          </button>

        </div>

        {/* Statistics */}
        <div className="mb-6 grid gap-5 sm:grid-cols-2">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Categories
            </p>

            <h2 className="mt-2 text-3xl font-black text-slate-950">
              {categories.length}
            </h2>

            <p className="mt-2 text-xs text-slate-400">
              Available furniture categories
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Products
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#B45309]">
              {categories.reduce(
                (total, category) =>
                  total + (category.productCount || 0),
                0
              )}
            </h2>

            <p className="mt-2 text-xs text-slate-400">
              Products across managed categories
            </p>
          </div>

        </div>

        {/* Category List */}
        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">

          {/* Search */}
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-lg font-bold text-slate-950">
                All Categories
              </h2>

              <p className="text-sm text-slate-500">
                Manage your furniture collections
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span>🔍</span>

              <input
                type="text"
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 sm:w-56"
              />
            </div>

          </div>

          {/* Loading */}
          {loading ? (

            <div className="flex min-h-64 items-center justify-center">
              <div className="text-center">

                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#B45309]"></div>

                <p className="mt-4 text-sm text-slate-500">
                  Loading categories...
                </p>

              </div>
            </div>

          ) : filteredCategories.length === 0 ? (

            <div className="p-12 text-center">

              <div className="text-5xl">🪑</div>

              <h3 className="mt-4 text-lg font-bold text-slate-800">
                No Categories Found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {search
                  ? "No categories match your search."
                  : "Start by adding your first furniture category."}
              </p>

              {!search && (
                <button
                  onClick={openAddModal}
                  className="mt-5 rounded-xl bg-[#B45309] px-5 py-3 text-sm font-semibold text-white hover:bg-[#92400E]"
                >
                  + Add Category
                </button>
              )}

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="min-w-[750px] w-full text-left">

                <thead className="bg-slate-50 text-sm text-slate-600">
                  <tr>

                    <th className="px-6 py-5 font-semibold">
                      Category
                    </th>

                    <th className="px-6 py-5 font-semibold">
                      Products
                    </th>

                    <th className="px-6 py-5 font-semibold">
                      Created Date
                    </th>

                    <th className="px-6 py-5 text-center font-semibold">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {filteredCategories.map((category) => (

                    <tr
                      key={category._id}
                      className="text-sm transition hover:bg-slate-50"
                    >

                      {/* Category Name */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          {category.image ? (
                            <img
                              src={category.image}
                              alt={category.name}
                              className="h-14 w-14 rounded-xl border border-slate-200 object-cover"
                            />
                          ) : (
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#B45309]/10 text-2xl">
                              🪑
                            </div>
                          )}

                          <div>
                            <p className="font-bold text-slate-900">
                              {category.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              ID: {category._id}
                            </p>
                          </div>

                        </div>

                      </td>

                      {/* Product Count */}
                      <td className="px-6 py-5">

                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                          {category.productCount || 0} Products
                        </span>

                      </td>

                      {/* Created Date */}
                      <td className="px-6 py-5 text-slate-500">

                        {category.createdAt
                          ? new Date(category.createdAt).toLocaleDateString("en-GB")
                          : "N/A"}

                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">

                        <div className="flex items-center justify-center gap-3">

                          <button
                            onClick={() => openEditModal(category)}
                            className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-bold text-[#B45309] transition hover:bg-amber-100"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDeleteCategory(category._id)}
                            disabled={deletingId === category._id}
                            className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                          >
                            {deletingId === category._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

        <p className="mt-4 text-sm text-slate-500">
          Showing {filteredCategories.length} of {categories.length} categories
        </p>

      </main>

      {/* Add / Edit Category Modal */}
      {showModal && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">

            <div className="mb-6 flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-black text-slate-950">
                  {editingCategory
                    ? "Edit Category"
                    : "Add Category"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingCategory
                    ? "Update category information"
                    : "Create a new furniture category"}
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-600 transition hover:bg-slate-200"
              >
                ×
              </button>

            </div>

            <form onSubmit={handleSaveCategory}>

              {/* Category Name */}
              <div className="mb-5">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Category Name
                </label>

                <input
                  type="text"
                  placeholder="Enter category name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#B45309] focus:ring-2 focus:ring-[#B45309]/10"
                  required
                />

              </div>

              {/* Category Image URL */}
              <div className="mb-6">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Category Image URL
                </label>

                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#B45309] focus:ring-2 focus:ring-[#B45309]/10"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Enter an image URL for this category (optional).
                </p>

                {image && (
                  <img
                    src={image}
                    alt="Category preview"
                    className="mt-3 h-32 w-full rounded-xl border border-slate-200 object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}

              </div>

              {/* Buttons */}
              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-xl bg-[#B45309] px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#92400E] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingCategory
                    ? "Update Category"
                    : "Save Category"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}
