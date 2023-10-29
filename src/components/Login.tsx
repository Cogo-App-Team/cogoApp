import React, { useState } from "react";
import {
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonAlert,
} from "@ionic/react";
import { useUserAuth } from "../context/UserAuthContext";
import { FirebaseError } from "firebase/app";


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<string>("");
  const { logIn, googleSignIn } = useUserAuth();

  const handleLogin = async () => {
    setError(""); // Clear previous errors
    try {
      await logIn(email, password);
      // Navigate to home page upon successful login
      // You can use IonRouterLink if you have a route set up
    } catch (err) {
      const errorText = (err as Error).message || "An error occurred";
      setError(errorText);
      setShowError(true);
    }
  };
  
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      // Navigate to home page upon successful Google sign-in
      // You can use IonRouterLink if you have a route set up
    } catch (error) {
      const errorText = (error as FirebaseError).message || "An error occurred";
      console.log(errorText);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="p-4 box">
          <h2 className="mb-3">Firebase Auth Login</h2>
          {error && (
            <IonAlert
              isOpen={showError}
              onDidDismiss={() => setShowError(false)}
              header="Error"
              message={error}
              buttons={["OK"]}
            />
          )}
          <IonItem>
            <IonLabel position="floating">Email address</IonLabel>
            <IonInput
              type="email"
              onIonChange={(e) => setEmail(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type="password"
              onIonChange={(e) => setPassword(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <div className="d-grid gap-2">
            <IonButton expand="full" onClick={handleLogin}>
              Log In
            </IonButton>
          </div>
        </div>
        <div className="p-4 box mt-3 text-center">
          <p>Don't have an account? Sign up</p>
          <IonButton fill="clear" routerLink="/signup">
            Sign up
          </IonButton>
        </div>
        <div className="p-4 box mt-3 text-center">
          <IonButton
            expand="full"
            onClick={handleGoogleSignIn}
            className="g-btn"
          >
            Sign in with Google
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
