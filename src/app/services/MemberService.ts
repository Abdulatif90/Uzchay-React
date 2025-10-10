import axios from "axios";
import { serverApi } from "../../lib/config";
import { LoginInput, Member, MemberInput, MemberUpdateInput } from "../../lib/types/member";

class MemberService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getTopUsers(): Promise<Member[]> {
    try {
         let url = this.path + "/member/top-users";
      const result = await axios.get(url, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      console.log("getTopUsers:", result);

        return result.data;
    } catch (err) {
      console.log("Error, getTopUsers:", err);
      throw err;
    }
  }
 public async getRestaurant(): Promise<Member> {
    try {
      let url = this.path + "/member/restaurant";
      const result = await axios.get(url, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      console.log("getRestaurant:", result);

      const restaurant: Member = result.data;
      return restaurant;
    } catch (err) {
      console.log("Error, getRestaurant:", err);
      throw err;
    }
  }

  public async signup(input: MemberInput): Promise<Member> {
    try {
      const url = this.path + "/member/signup";
      const result = await axios.post(url, input, { withCredentials: true });
      console.log("signup", result);

      const member: Member = result.data.member;
      console.log("member:", member);
      
      // Don't automatically store member data in localStorage after signup
      // User should login manually after signup to set localStorage
      
      return member;
    } catch(err) {
      console.log("Error, signup", err)
      throw err;
    }
  }

  public async login(input:LoginInput):Promise<Member>{
    try{
      const url =  this.path +"/member/login";
      const result = await axios.post(url, input, {withCredentials: true});
      console.log("login", result);

      const member: Member = result.data.member;
      console.log("member:", member);
      
      // Ensure all required fields have default values
      const normalizedMember: Member = {
        ...member,
        memberPhone: member.memberPhone || "",
        memberAddress: member.memberAddress || "",
        memberDesc: member.memberDesc || "",
        memberImage: member.memberImage || ""
      };
      
      localStorage.setItem("memberData", JSON.stringify(normalizedMember));
      return normalizedMember;
      
       } catch (err) {
      console.log("Error, login", err);
      throw err;
    }
  }

  public async logout(): Promise<void> {
    try {
      const url = this.path + "/member/logout";
      const result = await axios.post(url, {}, { withCredentials: true });
      console.log("logout", result);

      localStorage.removeItem("memberData");
    } catch (err) {
      console.log("Error, logout", err);
      throw err;
    }
  }
   public async updateMember(input: MemberUpdateInput): Promise<Member> {
    try {
      const formData = new FormData();
      formData.append("memberNick", input.memberNick || "");
      formData.append("memberPhone", input.memberPhone || "");
      formData.append("memberAddress", input.memberAddress || "");
      formData.append("memberDesc", input.memberDesc || "");
      if (input.memberImage) {
        if (input.memberImage instanceof File) {
          formData.append("memberImage", input.memberImage);
        } else {
          formData.append("memberImage", input.memberImage);
        }
      }

      const result = await axios(`${serverApi}/member/update`, {
        method: "POST",
        data: formData,
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("updateMember:", result);

      const member: Member = result.data;
      
      // Ensure all fields have proper default values
      const normalizedMember: Member = {
        ...member,
        memberPhone: member.memberPhone || "",
        memberAddress: member.memberAddress || "",
        memberDesc: member.memberDesc || "",
        memberImage: member.memberImage || ""
      };
      
      // Remove localStorage handling - let ContextProvider handle it
      return normalizedMember;
    } catch (err) {
      console.log("Error, updateMember:", err);
      throw err;
    }
  }
}

export default MemberService;