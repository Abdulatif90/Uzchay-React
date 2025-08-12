import { ReactNode, useState } from "react";
import Cookies from "universal-cookie";
import { Member } from "../../lib/types/member";
import { GlobalContext } from "../hooks/useGlobals";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cookies = new Cookies();
  if (!cookies.get("accessToken")) localStorage.removeItem("memberData");

  const memberData = localStorage.getItem("memberData");
  let initialMember: Member | null = null;
  if (memberData && memberData !== "undefined" && memberData !== "null") {
    try {
      initialMember = JSON.parse(memberData);
    } catch (e) {
      initialMember = null;
    }
  }
  const [authMember, setAuthMember] = useState<Member | null>(initialMember);
  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());
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