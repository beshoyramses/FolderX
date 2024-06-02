"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import RequireAuth from "@/components/RequireAuth";

const RootLayout = ({ children }) => {
  return (
    <RequireAuth>
      <div>
        <Header />
        <div className="flex">
          <Sidebar />
          {children}
        </div>
      </div>
    </RequireAuth>
  );
};

export default RootLayout;
