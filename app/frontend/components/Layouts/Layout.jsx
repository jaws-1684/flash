import React, { createContext, useEffect } from "react";
import { useState, useMemo } from "react";
import { usePage } from "@inertiajs/react";
import Success from "../Alerts/Success";
import Danger from "../Alerts/Danger";
import { ThemeContext } from "../Theme/ThemeContext.jsx";
import { Head } from "@inertiajs/react";


export default function Layout({ title = "Flash", children }) {
  const { flash } = usePage().props;
  const { notice, alert } = flash;

  const [toast, setToast] = useState({
    notice: true,
    alert: true,
  });


  const [theme, setTheme] = useState(getTheme);
  const themeValue = useMemo(() => ({ theme, setTheme }), [theme]);

  useEffect(() => {
    if (!notice) return;
    setToast((toast) => ({ ...toast, notice: true }));
  }, [notice]);

  useEffect(() => {
    if (!alert) return;
    setToast((toast) => ({ ...toast, alert: true }));
  }, [alert]);

  return (
    <>
      <ThemeContext value={themeValue}>
        <Head>
          <title>{title}</title>
        </Head>
        <div className={theme}>
          <div className="flex min-h-screen max-w-screen bg-white dark:text-gray-200 dark:bg-fgray">
            <div className="notice z-50 absolute top-20 right-10  w-fit">
              {notice && toast.notice && (
                <Success
                  onClick={() =>
                    setToast((toast) => ({ ...toast, notice: false }))
                  }
                  text={notice}
                />
              )}
              {alert && toast.alert && (
                <Danger
                  onClick={() =>
                    setToast((toast) => ({ ...toast, alert: false }))
                  }
                  text={alert}
                />
              )}
            </div>

            {children}
          </div>
        </div>
      </ThemeContext>
    </>
  );
}

const getTheme = () => {
  const theme = localStorage.getItem("theme");
  if (!theme) {
    localStorage.setItem("theme", "light");
    return "dark";
  } else {
    return theme;
  }
};
