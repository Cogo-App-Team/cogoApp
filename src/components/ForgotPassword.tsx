import React, { useRef, useState } from "react";
import { IonCard, IonButton, IonInput, IonAlert } from "@ionic/react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

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
    <IonCard>
      <h2 className="ion-text-center">Password Reset</h2>
      {error && <IonAlert isOpen={true} header="Error" message={error} buttons={["OK"]} />}
      {message && <IonAlert isOpen={true} header="Success" message={message} buttons={["OK"]} />}
      <IonInput type="email" ref={emailRef} placeholder="Email"></IonInput>
      <IonButton expand="full" onClick={handleSubmit} disabled={loading}>
        Reset Password
      </IonButton>
      <p className="ion-text-center">
        <Link to="/login">Login</Link>
      </p>
    </IonCard>
  );
};

export default ForgotPassword;
