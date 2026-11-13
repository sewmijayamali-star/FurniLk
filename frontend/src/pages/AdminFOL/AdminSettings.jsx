import { useState } from "react";
import { Sidebar } from "../admin";
import {
  FiSettings,
  FiUser,
  FiBell,
  FiShield,
  FiShoppingBag,
  FiChevronRight,
} from "react-icons/fi";

export default function AdminSettings() {
  const [active, setActive] = useState("Settings");

  const settings = [
    {
      icon: <FiUser />,
      title: "Account Settings",
      description: "Manage your admin account information.",
    },
    {
      icon: <FiShoppingBag />,
      title: "Store Information",
      description: "View and manage your store details.",
    },
    {
      icon: <FiBell />,
      title: "Notifications",
      description: "Manage your notification preferences.",
    },
    {
      icon: <FiShield />,
      title: "Privacy & Security",
      description: "Manage your account security and privacy.",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F5F0]">
      <Sidebar active={active} setActive={setActive} />

      <main className="min-w-0 flex-1 overflow-auto px-4 pb-8 pt-20 sm:px-6 sm:py-8 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <FiSettings className="text-2xl text-[#B45309]" />
            <h1 className="text-2xl font-bold text-slate-800">
              Settings
            </h1>
          </div>

          <p className="text-sm text-slate-500">
            Manage your store settings and account preferences.
          </p>
        </div>

        {/* Settings List */}
        <div className="max-w-4xl space-y-4">
          {settings.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#B45309]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-xl text-[#B45309]">
                  {item.icon}
                </div>

                <div>
                  <h2 className="font-semibold text-slate-800">
                    {item.title}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>

              <FiChevronRight className="text-xl text-slate-400" />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 max-w-4xl rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-800">
            FurniLK Admin Panel
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Manage your FurniLK store from one place.
          </p>

          <p className="mt-4 text-xs text-slate-400">
            FurniLK © 2026. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
}