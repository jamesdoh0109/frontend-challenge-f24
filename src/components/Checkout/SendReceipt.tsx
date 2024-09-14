import { useState } from "react";
import { Status } from "@/utils/types";
import Button from "@/components/common/Button";
import styles from "./SendReceipt.module.css";

export default function SendReceipt() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<Status>({ error: null, success: null });

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setIsValidEmail(validateEmail(inputEmail));
  };

  const sendEmail = async () => {
    setSending(true);

    const res = await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        receipt: localStorage.getItem("receipt"),
      }),
    });

    const data = await res.json();

    if (res.status === 201) {
      setStatus({ error: null, success: data.message });
    } else {
      setStatus({ error: data.message, success: null });
    }

    setSending(false);
  };

  return (
    <div className={styles.sendreceipt}>
      <div>
        <form className={styles.sendreceipt__form}>
          <input
            value={email}
            onChange={handleEmailChange}
            type="text"
            placeholder="Type your email"
            className={styles.sendreceipt__input}
          />
          <Button
            onClick={sendEmail}
            text={sending ? "Sending..." : "Send"}
            disabled={email === "" || !isValidEmail || sending}
          />
        </form>
      </div>

      {/* Validation error for invalid email */}
      {email !== "" && !isValidEmail && (
        <p className={styles.sendreceipt__error}>
          Please enter a valid email address.
        </p>
      )}

      {/* Error or success messages */}
      {status.error && (
        <p className={styles.sendreceipt__error}>{status.error}</p>
      )}
      {status.success && (
        <p className={styles.sendreceipt__success}>{status.success}</p>
      )}
    </div>
  );
}
