import React, { useRef, useState, useEffect } from "react";
import { IonCard, IonButton, IonInput, IonAlert } from "@ionic/react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

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
    <IonCard>
      <h2 className="ion-text-center">Log In</h2>
      {error && <IonAlert isOpen={true} header="Error" message={error} buttons={["OK"]} />}
      <IonInput type="email" ref={emailRef} placeholder="Email"></IonInput>
      <IonInput type="password" ref={passwordRef} placeholder="Password"></IonInput>
      <IonButton expand="full" onClick={handleSubmit} disabled={loading}>
        Log In
      </IonButton>
      <p className="ion-text-center">
         <Link to="/login/forgot-password">Forgot Password?</Link>
      </p>
      <p className="ion-text-center">
           Need an account? <Link to="/login/signup">Sign Up</Link>
      </p>

    </IonCard>
  );
};

export default Login;
