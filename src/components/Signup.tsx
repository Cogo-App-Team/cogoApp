import React, { useRef, useState } from "react";
import { IonCard, IonButton, IonInput, IonAlert } from "@ionic/react";
import { Link, useHistory } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth, Auth } from "firebase/auth";
import { app } from "../firebase";

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
    <IonCard>
      <h2 className="ion-text-center">Sign Up</h2>
      {error && <IonAlert isOpen={true} header="Error" message={error} buttons={["OK"]} />}
      <IonInput type="email" ref={emailRef} placeholder="Email"></IonInput>
      <IonInput type="password" ref={passwordRef} placeholder="Password"></IonInput>
      <IonInput type="password" ref={passwordConfirmRef} placeholder="Password Confirmation"></IonInput>
      <IonButton expand="full" onClick={handleSubmit} disabled={loading}>
        Sign Up
      </IonButton>
      <p className="ion-text-center">
        Already have an account? <Link to="/login">Log In</Link>
      </p>

    </IonCard>
  );
};

export default Signup;
