import {useState, useEffect, useCallback} from "react";
import { Box } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";
import { useGlobals } from "../../hooks/useGlobals";
import { MemberUpdateInput } from "../../../lib/types/member";
import { T } from "../../../lib/types/common";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { Messages, serverApi } from "../../../lib/config";
import MemberService from "../../services/MemberService";

export function Settings() {
   const { authMember, setAuthMember } = useGlobals();
  const [memberImage, setMemberImage] = useState<string>(
    authMember?.memberImage
      ? ` ${serverApi}/${authMember.memberImage}`
      : "icons/default-user.svg"
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  console.log("authMember in Settings:", authMember);
  console.log("authMember full object:", JSON.stringify(authMember, null, 2));
  console.log("memberNick from authMember:", authMember?.memberNick);
  console.log("memberPhone from authMember:", authMember?.memberPhone);
  console.log("All authMember keys:", authMember ? Object.keys(authMember) : "no authMember");
  console.log("memberUpdateInput initial state will be:", {
    memberNick: authMember?.memberNick || "",
    memberPhone: authMember?.memberPhone || "",
    memberAddress: authMember?.memberAddress || "",
    memberDesc: authMember?.memberDesc || ""
  });

  // Initialize with current authMember data or get from state if exists
  const getInitialFormData = useCallback(() => ({
    memberNick: authMember?.memberNick || "",
    memberPhone: authMember?.memberPhone || "",
    memberAddress: authMember?.memberAddress || "",
    memberDesc: authMember?.memberDesc || "",
    memberImage: authMember?.memberImage || "",
  }), [authMember]);

  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>(getInitialFormData);

  // Update states when authMember changes
  useEffect(() => {
    console.log("useEffect triggered, authMember:", authMember);
    if (authMember) {
      console.log("Updating memberUpdateInput with:", {
        memberNick: authMember.memberNick || "",
        memberPhone: authMember.memberPhone || "",
        memberAddress: authMember.memberAddress || "",
        memberDesc: authMember.memberDesc || ""
      });
      setMemberImage(
        authMember.memberImage
          ? `${serverApi}/${authMember.memberImage}?t=${Date.now()}`
          : "/icons/default-user.svg"
      );
      const formData = getInitialFormData();
      console.log("Setting form data in useEffect:", formData);
      setMemberUpdateInput(formData);
    }
  }, [authMember, getInitialFormData]);

  // / HANDLERS /

  const memberNickHandler = (e: T) => {
    memberUpdateInput.memberNick = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberPhoneHandler = (e: T) => {
    memberUpdateInput.memberPhone = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberAddressHandler = (e: T) => {
    memberUpdateInput.memberAddress = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberDescriptionHandler = (e: T) => {
    memberUpdateInput.memberDesc = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const handleSubmitButton = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      if (
        memberUpdateInput.memberNick === "" ||
        memberUpdateInput.memberPhone === "" ||
        memberUpdateInput.memberAddress === "" ||
        memberUpdateInput.memberDesc === ""
      ) {
        throw new Error(Messages.error3);
      }

      // Prepare update data
      const updateData: MemberUpdateInput = {
        memberNick: memberUpdateInput.memberNick ?? "",
        memberPhone: memberUpdateInput.memberPhone ?? "",
        memberAddress: memberUpdateInput.memberAddress ?? "",
        memberDesc: memberUpdateInput.memberDesc ?? "",
        memberImage: imageFile || undefined
      };

      console.log("Sending update data:", updateData);
      
      const member = new MemberService();
      const result = await member.updateMember(updateData);
      
      console.log("Update result:", result);
      
      // Update localStorage with new member data
      localStorage.setItem("memberData", JSON.stringify(result));
      setAuthMember(result);

      // Update local state with new data
      setMemberUpdateInput({
        memberNick: result.memberNick,
        memberPhone: result.memberPhone,
        memberAddress: result.memberAddress,
        memberDesc: result.memberDesc,
        memberImage: result.memberImage,
      });

      // Update image display
      if (result.memberImage) {
        setMemberImage(`${serverApi}/${result.memberImage}?t=${Date.now()}`);
      }

      await sweetTopSmallSuccessAlert("Modified successfully!", 700);
    } catch (err) {
      console.error("Update member error:", err);
      if (typeof err === "object" && err !== null) {
        console.error("Error details:", {
          message: (err as any).message,
          response: (err as any).response?.data,
          status: (err as any).response?.status
        });
      }
      sweetErrorHandling(err).then();
    }
  };

  const handleImageViewer = (e: T) => {
    const file = e.target.files[0];
    console.log("file", file);
    const fileType = file.type,
      validateImagesTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!validateImagesTypes.includes(fileType)) {
      sweetErrorHandling(Messages.error5).then();
    } else {
      if (file) {
        setImageFile(file);
        setMemberImage(URL.createObjectURL(file));
      }
    }
  };
  return (
    <Box className={"settings"}>
      <Box className={"member-media-frame"}>
        <img src={memberImage} className={"mb-image"} alt="" />
        <div className={"media-change-box"}>
          <span>Upload image</span>
          <p>JPG, JPEG, PNG formats only!</p>
          <div className={"up-del-box"}>
           <Button component="label" onChange={handleImageViewer}>
              <CloudDownloadIcon />
              <input type="file" hidden />
            </Button>
          </div>
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Username</label>
          <input
            className={"spec-input mb-nick"}
            type="text"
            placeholder={authMember?.memberNick}
            value={memberUpdateInput.memberNick || ""}
            name="memberNick"
            onChange={memberNickHandler}
          />
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"short-input"}>
          <label className={"spec-label"}>Phone</label>
          <input
            className={"spec-input mb-phone"}
            type="text"
            placeholder={authMember?.memberPhone ?? "no phone"}
            value={memberUpdateInput.memberPhone || ""}
            name="memberPhone"
            onChange={memberPhoneHandler}
          />
        </div>
        <div className={"short-input"}>
          <label className={"spec-label"}>Address</label>
          <input
            className={"spec-input  mb-address"}
            type="text"
              placeholder={
              authMember?.memberAddress
                ? authMember.memberAddress
                : "no address"
            }
            value={memberUpdateInput.memberAddress || ""}
            name="memberAddress"
            onChange={memberAddressHandler}
          />
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Description</label>
          <textarea
            className={"spec-textarea mb-description"}
             placeholder={
              authMember?.memberDesc ? authMember.memberDesc : "no description"
            }
            value={memberUpdateInput.memberDesc || ""}
            name="memberDesc"
            onChange={memberDescriptionHandler}
          />
        </div>
      </Box>
      <Box className={"save-box"}>
        <Button variant={"contained"} onClick={handleSubmitButton}>
          Save
        </Button>
      </Box>
    </Box>
  );
}