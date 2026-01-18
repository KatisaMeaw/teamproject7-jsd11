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

  const login = async ({ email, password }) => {
    setAuthError(null);

    try {
      const response = await axios.post(
        `${apiBase}/users/auth/cookie/login`,
        { email, password },
        // if user have token in the cookies, it will attach token with http request.
        { withCredentials: true }
      );

      setUser(response.data.user);
      return true;
    } catch (error) {
      const message = error.response.data.message || error.response.data.error || error.message;

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