import React, { useRef, useState } from "react";
import { IonCard, IonButton, IonInput, IonAlert } from "@ionic/react";
import { Link, useHistory } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth, Auth } from "firebase/auth";
import { app } from "../firebase";
import logo from "/logo.png";

const Signup: React.FC = () => {
  const emailRef = useRef<HTMLIonInputElement | null>(null);
  const passwordRef = useRef<HTMLIonInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLIonInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async () => {
    if (
      emailRef.current?.value &&
      passwordRef.current?.value &&
      passwordConfirmRef.current?.value
    ) {
      if (passwordRef.current?.value.toString() !== passwordConfirmRef.current?.value.toString()) {
        setError("Passwords do not match");
      } else {
        setError(null);
        setLoading(true);

        try {
          const auth: Auth = getAuth(app);
          const user = await createUserWithEmailAndPassword(
            auth,
            emailRef.current?.value.toString(),
            passwordRef.current?.value.toString()
          );
          if (user) {
            history.push("/");
          }
        } catch (error: any) {
          setError(error.message);
        }
        setLoading(false);
      }
    }
  };

  return (
    <div className="custom-app">
      <IonCard className="signup-page custom-card">
        <img src={logo} alt="Logo" className="logo3" />
        <h1 className="ion-text-center">Sign Up</h1>
        <p className="ion-text-center subtext2">Fill in your information to sign up for Cogo</p>
        {error && <IonAlert isOpen={true} header="Error" message={error} buttons={["OK"]} />}
        <div className="form-container">
          <IonInput type="email" ref={emailRef} placeholder="Email" className="custom-input"></IonInput>
          <IonInput type="password" ref={passwordRef} placeholder="Password" className="custom-input"></IonInput>
          <IonInput type="password" ref={passwordConfirmRef} placeholder="Password Confirmation" className="custom-input"></IonInput>
          <IonButton expand="full" onClick={handleSubmit} disabled={loading} className="ion-button">
            Sign Up
          </IonButton>
        </div>
        <p className="ion-text-center footer">
          Already have an account? <Link to="/login" className="signup-link">Log In</Link>
        </p>
      </IonCard>
    </div>
  );
};

export default Signup;
