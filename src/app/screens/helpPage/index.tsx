import React, { useState } from "react";
import { Box, Container, Stack, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import "../../../css/help.css";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";
import { sweetTopSmallSuccessAlert, sweetErrorHandling } from "../../../lib/sweetAlert";
import { sendContactEmail } from "../../../lib/emailService";
import { emailConfig } from "../../../lib/emailConfig";


  
export default function HelpPage() {
  const [value, setValue] = React.useState("1");
  const [formData, setFormData] = useState({
    memberNick: "",
    memberEmail: "",
    memberMsg: ""
  });

  /** HANDLERS **/
  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.memberNick.trim() || !formData.memberEmail.trim() || !formData.memberMsg.trim()) {
      await sweetErrorHandling("Please fill in all fields");
      return;
    }

    try {
      // Send email using email service
      const result = await sendContactEmail(formData);
      
      console.log("Email service result:", result);
      
      // Show small success alert
      await sweetTopSmallSuccessAlert(`Message sent to ${emailConfig.TO_EMAIL}!`, 1000);
      
      // Reset form
      setFormData({
        memberNick: "",
        memberEmail: "",
        memberMsg: ""
      });
    } catch (err) {
      console.log("Error sending message:", err);
      await sweetErrorHandling("Failed to send message. Please try again.");
    }
  };

  return (
    <div className={"help-page"}>
      <Container className={"help-container"}>
        <TabContext value={value}>
          <Box className={"help-menu"}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="lab API tabs example"
                className={"table_list"}
              >
                <Tab label="TERMS" value={"1"} />
                <Tab label="FAQ" value={"2"} />
                <Tab label="CONTACT" value={"3"} />
              </Tabs>
            </Box>
          </Box>
          <Stack>
            <Stack className={"help-main-content"}>
              <TabPanel value={"1"}>
                <Stack className={"rules-box"}>
                  <Box className={"rules-frame"}>
                    {terms.map((value, number) => {
                      return <p key={number}>{value}</p>;
                    })}
                  </Box>
                </Stack>
              </TabPanel>
              <TabPanel value={"2"}>
                <Stack className={"accordion-menu"}>
                  {faq.map((value, number) => {
                    return (
                      <Accordion key={number}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>{value.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{value.answer}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </Stack>
              </TabPanel>
              <TabPanel value={"3"}>
                <Stack className={"admin-letter-box"}>
                  <Stack className={"admin-letter-container"}>
                    <Box className={"admin-letter-frame"}>
                      <span>Contact us!</span>
                      <p>Fill out below form to send a message!</p>
                    </Box>
                    <form
                      onSubmit={handleSubmit}
                      className={"admin-letter-frame"}
                    >
                      <div className={"admin-input-box"}>
                        <label>Your name</label>
                        <input
                          type={"text"}
                          name={"memberNick"}
                          placeholder={"Type your name here"}
                          value={formData.memberNick}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className={"admin-input-box"}>
                        <label>Your email</label>
                        <input
                          type={"email"}
                          name={"memberEmail"}
                          placeholder={"Type your email here"}
                          value={formData.memberEmail}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className={"admin-input-box"}>
                        <label>Message</label>
                        <textarea
                          name={"memberMsg"}
                          placeholder={"Your message"}
                          value={formData.memberMsg}
                          onChange={handleInputChange}
                          required
                        ></textarea>
                      </div>
                      <Box
                        display={"flex"}
                        justifyContent={"flex-end"}
                        sx={{ mt: "30px" }}
                      >
                        <Button type={"submit"} variant="contained">
                          Send
                        </Button>
                      </Box>
                    </form>
                  </Stack>
                </Stack>
              </TabPanel>
            </Stack>
          </Stack>
        </TabContext>
      </Container>
    </div>
  );
}