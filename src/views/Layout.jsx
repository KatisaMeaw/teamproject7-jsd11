import { useLocation, Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios"
import Bottombar from "../components/Bottombar";

export function Layout() {
  const apiBase = import.meta.env.VITE_API_URL;

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin"); 

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      setAuthLoading(true);

      try {
        const response = await axios.get(`${apiBase}/users/auth/cookie/me`, {
          withCredentials: true,
        });

        setUser(response.data.user);
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, [apiBase]);

  const login = async (data) => {
    setAuthError(null);

    // 🔥 เพิ่มส่วนนี้: ถ้า data มี _id แสดงว่าเป็นข้อมูล User แล้ว ให้ Set State เลย (ไม่ต้องยิง API)
    if (data && data._id) {
        setUser(data);
        return true;
    }

    // ถ้าไม่มี _id แสดงว่าเป็น email/password แบบเดิม ให้ดึงค่าออกมาแล้วยิง API
    const { email, password } = data;

    try {
        const response = await axios.post(
            `${apiBase}/users/auth/cookie/login`,
            { email, password },
            { withCredentials: true }
        );

        setUser(response.data.user);
        return true;
    } catch (error) {
        const message = error.response?.data?.message || error.response?.data?.error || error.message;
        setAuthError(message || "Login failed");
        setUser(null);
        return null;
    }
};

  const logout = async () => {
    setAuthError(null);
    try {
      await axios.post(`${apiBase}/users/auth/cookie/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.log(error);
    } finally {
      setUser(null);

      window.location.href = "/";
    }
  };
  return (
    <div>
      {!isAdminPage && (
      <Navbar
        user={user}
        authLoading={authLoading}
        authError={authError}
        login={login}
        logout={logout}
      />
      )}
      <section className="pb-16 md:pb-0">
        <Outlet context={{ user, authLoading, apiBase, login, logout }} />
      </section>
      <Bottombar
      user={user}
      />
    </div>
  );
}