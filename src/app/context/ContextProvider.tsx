import { ReactNode, useState, useEffect, useMemo } from "react";
import Cookies from "universal-cookie";
import { Member } from "../../lib/types/member";
import { GlobalContext } from "../hooks/useGlobals";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cookies = useMemo(() => new Cookies(), []);
  if (!cookies.get("accessToken")) localStorage.removeItem("memberData");

  const memberData = localStorage.getItem("memberData");
  console.log("Raw memberData from localStorage:", memberData);
  let initialMember: Member | null = null;
  if (memberData && memberData !== "undefined" && memberData !== "null") {
    try {
      initialMember = JSON.parse(memberData);
      console.log("Parsed initialMember:", initialMember);
      console.log("initialMember keys:", initialMember ? Object.keys(initialMember) : "null");
      console.log("initialMember.memberNick:", initialMember?.memberNick);
      console.log("initialMember.memberPhone:", initialMember?.memberPhone);
    } catch (e) {
      console.error("Error parsing memberData:", e);
      initialMember = null;
    }
  }
  const [authMember, setAuthMember] = useState<Member | null>(initialMember);
  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());

  // Sync authMember changes with localStorage
  useEffect(() => {
    console.log("ContextProvider: authMember changed", authMember);
    if (authMember) {
      localStorage.setItem("memberData", JSON.stringify(authMember));
      console.log("ContextProvider: saved to localStorage", authMember);
    } else {
      localStorage.removeItem("memberData");
      console.log("ContextProvider: removed from localStorage");
    }
  }, [authMember]);

  // Listen for localStorage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "memberData") {
        if (e.newValue) {
          try {
            const newMember = JSON.parse(e.newValue);
            setAuthMember(newMember);
          } catch (error) {
            console.error("Error parsing memberData from storage:", error);
          }
        } else {
          setAuthMember(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Check for token validity on component mount
  useEffect(() => {
    const token = cookies.get("accessToken");
    if (!token && authMember) {
      setAuthMember(null);
      localStorage.removeItem("memberData");
    }
  }, [cookies, authMember]);

  console.log("=== verify ===");

  return (
    <GlobalContext.Provider
      value={{ authMember, setAuthMember, orderBuilder, setOrderBuilder }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;