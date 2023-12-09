import React, { useRef, useState, useEffect } from "react";
import { IonCard, IonButton, IonInput, IonAlert, IonApp } from "@ionic/react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import logo from "/logo.png";

const Login: React.FC = () => {
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        history.push("/");
      }
    });

    return unsubscribe;
  }, [history]);

  const handleSubmit = async () => {
    if (emailRef.current?.value && passwordRef.current?.value) {
      setError(null);
      setLoading(true);
      try {
        const email = emailRef.current!.value as string;
        const password = passwordRef.current!.value as string;
        await signInWithEmailAndPassword(auth, email, password);
        history.push("/");
      } catch {
        setError("Failed to log in");
      }
      setLoading(false);
    }
  };
  

  return (
    <div className="custom-app">
    <IonCard className="custom-card">
      <img src={logo} alt="Logo" className="logo" />
          <h1 className="ion-text-center header">Login</h1>
          <p className="ion-text-center subtext">Log in to your Cogo account.</p>
          {error && <IonAlert isOpen={true} header="Error" message={error} buttons={["OK"]} />}
          <div className="form-container">
            <IonInput
              className="custom-input"
              type="email"
              ref={emailRef}
              placeholder="Email"
            ></IonInput>
            <IonInput
              className="custom-input"
              type="password"
              ref={passwordRef}
              placeholder="Password"
            ></IonInput>
            <IonButton
              className="ion-button"
              expand="full"
              onClick={handleSubmit}
              disabled={loading}
            >
               Login
          </IonButton>
          <p className="ion-text-center">
            <Link to="/login/forgot-password" className="forgot-password-link">Forgot Password?</Link>
          </p>
        </div>
        <p className="ion-text-center footer">
          Need an account? <Link to="/login/signup" className="signup-link">Sign Up</Link>
        </p>
      </IonCard>
    </div>
  );
};

export default Login;
