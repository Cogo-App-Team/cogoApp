import React, { useRef, useState } from "react";
import { IonCard, IonButton, IonInput, IonAlert } from "@ionic/react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import logo from "/logo.png";


const ForgotPassword: React.FC = () => {
  const emailRef = useRef<HTMLIonInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (emailRef.current) {
      setMessage(null);
      setError(null);
      setLoading(true);
      try {
        await sendPasswordResetEmail(getAuth(), emailRef.current?.value?.toString() ?? "");
        setMessage("Check your inbox for further instructions");
      } catch {
        setError("Failed to reset password");
      }
      setLoading(false);
    }
  };

  return (
    <div className="custom-app">
      <IonCard className="forgot-password-page">
      <img src={logo} alt="Logo" className="logo2" />
        <div className="header-container">
          <h1 className="ion-text-center">Reset Password</h1>
          <p className="ion-text-center subtext2">Enter your email address to reset the password</p>
        </div>
        <div className="form-container">
          {error && <IonAlert isOpen={true} header="Error" message={error} buttons={["OK"]} />}
          {message && <IonAlert isOpen={true} header="Success" message={message} buttons={["OK"]} />}
          <IonInput type="email" ref={emailRef} placeholder="Email" className="custom-input"></IonInput>
          <IonButton expand="full" onClick={handleSubmit} disabled={loading} className="custom-button">
            Reset
          </IonButton>
        </div>
        <div className="footer-container">
  <p className="ion-text-center footer">
    Don't have an account? <Link to="/login/signup" className="signup-link">Sign Up</Link>
  </p>
</div>
      </IonCard>
    </div>
  );
};


export default ForgotPassword;
