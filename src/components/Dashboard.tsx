import React, { useState } from "react";
import { IonCard, IonButton, IonAlert } from "@ionic/react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Dashboard: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = auth;
  const history = useHistory();

  const handleLogout = async () => {
    setError(null);

    try {
      await signOut(auth);
      history.push("/login");
    } catch (e) {
      setError("Failed to log out");
    }
  };

  return (
    <IonCard>
      <h2 className="ion-text-center">Profile</h2>
      {error && <IonAlert isOpen={true} header="Error" message={error} buttons={["OK"]} />}
      <strong>Email: {currentUser?.email}</strong>
      <Link to="/update-profile">
        <IonButton expand="full">Update Profile</IonButton>
      </Link>
      <IonButton expand="full" fill="clear" onClick={handleLogout}>
        Log Out
      </IonButton>
    </IonCard>
  );
};

export default Dashboard;
