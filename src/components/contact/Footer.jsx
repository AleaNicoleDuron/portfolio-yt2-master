import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { MdAlternateEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiOutlineMailOpen } from "react-icons/hi";
import { AiOutlineArrowUp } from "react-icons/ai";
import { FiMail, FiPhoneCall } from "react-icons/fi";
import { Slide, Fade } from "react-awesome-reveal";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef(null);
  const [sending, setSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [messageText, setMessageText] = useState("");

  // Read EmailJS config from env (may be empty). Leave empty to enable mailto fallback.
  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || "";
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "";
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "";

  // Initialize EmailJS once if public key available
  useEffect(() => {
    if (publicKey) {
      try {
        emailjs.init(publicKey);
        console.log("emailjs initialized");
      } catch (err) {
        console.warn("emailjs.init failed", err);
      }
    }
  }, [publicKey]);

  const scrollUp = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const sendEmail = (e) => {
  e.preventDefault();
    setSending(true);
    setStatusMessage(null);

    console.log("sendEmail invoked");

  // Collect form values from state
  const nameVal = name.trim();
  const user_email = userEmail.trim();
  const message = messageText.trim();

    // If EmailJS is configured (service & template present), use it. Otherwise fallback to mailto.
    const hasEmailJs = serviceId && templateId;

  if (!hasEmailJs) {
      // Fallback: open user's email client with a prefilled message
  const subject = `New message from ${nameVal || "website visitor"} via Portfolio`;
  const body = `Name: ${nameVal}\nEmail: ${user_email}\n\nMessage:\n${message}`;
      const ownerEmail = "aleanicoleduron@gmail.com"; // fallback recipient
      const mailto = `mailto:${ownerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      // small delay to show sending state
      setTimeout(() => {
        window.location.href = mailto;
        setStatusMessage({ type: "success", text: "Opened mail client — complete send there." });
        setSending(false);
      }, 300);
      return;
    }

    try {
      console.log("calling emailjs.send", { serviceId, templateId });

      const templateParams = {
        user_name: nameVal,
        user_email: user_email,
        message: message,
      };

      // Use emailjs.send with template params (more reliable than sendForm here)
      const sendPromise = publicKey
        ? emailjs.send(serviceId, templateId, templateParams, publicKey)
        : emailjs.send(serviceId, templateId, templateParams);

      sendPromise
        .then((result) => {
          console.log("emailjs send result:", result);
          setStatusMessage({ type: "success", text: "Message sent — thank you!" });
          // reset controlled inputs
          setName("");
          setUserEmail("");
          setMessageText("");
          if (form.current) form.current.reset();
        })
        .catch((error) => {
          console.error("EmailJS error:", error);
          setStatusMessage({ type: "error", text: "Failed to send message. Please try again later." });
        })
        .finally(() => setSending(false));
    } catch (err) {
      console.error("Unexpected error in sendEmail:", err);
      setStatusMessage({ type: "error", text: "Unexpected error. See console." });
      setSending(false);
    }
  };

  return (
    <Container id="contact">
      <Profile>
        <Slide direction="left" delay={1}>
          <h1>Contact</h1>
        </Slide>
        <div className="address">
          <Slide direction="left">
            <h1>Address:</h1>
          </Slide>
          <Slide direction="left">
            <p>Janipa-an East, Mina, Iloilo</p>
          </Slide>
        </div>
        <div className="links">
          <Slide direction="left">
            <h1>Contact me directly:</h1>
          </Slide>
          <div>
            <span>
              <FiPhoneCall />
            </span>
            <Slide direction="left">
              <a href="tel:+4733378901">09382055098</a>
            </Slide>
          </div>
          <div>
            <Slide direction="left">
              <span>
                <HiOutlineMailOpen />
              </span>
            </Slide>
            <Slide>
              <a href="mailto:miladamiri@gmail.com">aleanicoleduron@gmail.com</a>
            </Slide>
          </div>
        
        </div>
        <Fade>
          <ArrowUp onClick={scrollUp}>
            <AiOutlineArrowUp />
          </ArrowUp>
        </Fade>
      </Profile>
      <Form>
        <Slide direction="right">
          <form ref={form} onSubmit={sendEmail}>
            <div className="name">
              <span>
                <CgProfile />
              </span>
              <input name="user_name" type="text" placeholder="Fullname..." required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="email">
              <span>
                <MdAlternateEmail />
              </span>
              <input name="user_email" type="email" placeholder="Email..." required value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
            </div>
            <div className="message">
              <span className="messageIcon">
                <FiMail />
              </span>
              <textarea name="message" cols="30" rows="10" placeholder="Message..." required value={messageText} onChange={(e) => setMessageText(e.target.value)}></textarea>
            </div>
            <button type="submit" disabled={sending}>{sending ? "Sending..." : "Submit"}</button>
            {statusMessage && (
              <div
                style={{
                  marginTop: 10,
                  padding: "8px 10px",
                  borderRadius: 6,
                  color: statusMessage.type === "error" ? "#721c24" : "#155724",
                  background: statusMessage.type === "error" ? "#f8d7da" : "#d4edda",
                  border: statusMessage.type === "error" ? "1px solid #f5c6cb" : "1px solid #c3e6cb",
                  fontSize: 13,
                }}
              >
                {statusMessage.text}
              </div>
            )}
          </form>
        </Slide>
      </Form>
    </Container>
  );
};

export default Contact;

const Container = styled.div`
  margin-top: 2rem;
  position: relative;
  padding: 2rem 0;
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  @media (max-width: 840px) {
    width: 90%;
  }

  @media (max-width: 650px) {
    flex-direction: column;
    gap: 3rem;
  }
`;
const Profile = styled.div`
  flex: 1;
  .address {
    padding: 1rem 0;
    h1 {
      font-size: 1.2rem;
    }

    p {
      width: 60%;
      padding-top: 0.5rem;
      @media (max-width: 650px) {
        width: 100%;
      }
    }
  }

  .links {
    h1 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }

    div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      a {
        text-decoration: none;
        color: lightgray;
        :hover {
          color: orange;
        }
      }
    }
  }

  .profiles {
    h1 {
      font-size: 1.2rem;
      padding: 1rem 0;
    }

    .icons {
      display: flex;
      align-items: center;

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #000;
        width: 2rem;
        height: 2rem;
        margin-right: 0.5rem;
        border-radius: 50px;

        :hover {
          background-color: orange;
        }

        a {
          margin-top: 0.2rem;
          color: #fff;
        }
      }
    }
  }
`;
const ArrowUp = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: #ec386bff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: 700;
  margin-top: 2rem;
  @media (max-width: 650px) {
    position: absolute;
    right: 3rem;
    top: 16rem;
  }
`;
const Form = styled.div`
  flex: 1;
  h1 {
    font-size: 1.3rem;
    padding-bottom: 0.7rem;
  }

  form {
    background-color: #020202ff;
    padding: 0.8rem;
    border-radius: 5px;
    .name,
    .email,
    .message {
      display: flex;
      border: 1px solid gray;
      margin-bottom: 0.5rem;
      input,
      textarea {
        width: 100%;
        border: none;
        outline: none;
        color: #fff;
        background-color: transparent;
        padding: 1rem 0.5rem;
      }
      span {
        background-color: #050404ff;
        width: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .messageIcon {
        align-items: flex-start;
        padding-top: 0.5rem;
      }
    }

    button {
      width: 5rem;
      height: 1.8rem;
      background-color: #ec386bff;
      border: none;
      border-radius: 5px;
      filter: drop-shadow(0px 4px 5px #ec386bff);
      cursor: pointer;
      :hover {
        filter: drop-shadow(0px 6px 9px #ec386bff);
      }
    }
  }
`;
