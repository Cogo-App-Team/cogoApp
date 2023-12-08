import React, { useEffect, useState } from 'react';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonContent,
  IonHeader,
  IonToolbar,
  IonMenu,
  IonList,
  IonItem,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
  setupIonicReact,
} from '@ionic/react';
import { home, camera, settings, person, logOut, chatbox, apps, add } from 'ionicons/icons';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Photo from './pages/Photo';
import Collections from './pages/Collections';
import Items from './pages/Items';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setIsAuthenticated(false);
    });

    const menuButton = document.querySelector('ion-menu-button');
    if (menuButton) {
      menuButton.click();
    }
  };

  return (
    <IonApp>
      <Router>
        <IonMenu side="start" contentId="main-content" type="overlay">
        <IonHeader>
            <IonToolbar>
              <h1>Menu</h1>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem button routerLink="/photo">
                <IonIcon icon={add} />
                <IonLabel>Add Item</IonLabel>
              </IonItem>
              <IonItem button routerLink="/collections">
                <IonIcon icon={apps} />
                <IonLabel>Collections</IonLabel>
              </IonItem>
              <IonItem button routerLink="/settings">
                <IonIcon icon={settings} />
                <IonLabel>Settings</IonLabel>
              </IonItem>
              <IonItem button routerLink="/profile">
                <IonIcon icon={person} />
                <IonLabel>Profile</IonLabel>
              </IonItem>
              {isAuthenticated && (
                <IonItem button onClick={handleLogout}>
                  <IonIcon icon={logOut} />
                  <IonLabel>Logout</IonLabel>
                </IonItem>
              )}
            </IonList>
          </IonContent>
          </IonMenu>

        <IonRouterOutlet id="main-content">
          <Route
            path="/home"
            render={() => (isAuthenticated ? <Home /> : <Redirect to="/login" />)}
            exact
          />
          <Route path="/login" component={Login} exact />
          <Route path="/login/forgot-password" component={ForgotPassword} exact />
          <Route path="/login/signup" component={Signup} exact />
          <Route path="/" render={() => <Redirect to="/home" />} exact />
        </IonRouterOutlet>
        
        {isAuthenticated && (
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/home" component={Home} exact />
              <Route path="/photo" component={Photo} exact />
              <Route path="/collections" component={Collections} exact />
              <Route path="/items" component={Items} exact />
              <Route path="/settings" component={Settings} exact />
              <Route path="/profile" component={Profile} exact />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/home">
                <IonIcon icon={home} />
                <IonLabel></IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/collections">
                <IonIcon icon={apps} />
                <IonLabel></IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/photo">
                <IonIcon icon={add} />
                <IonLabel></IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab4" href="/contact">
                <IonIcon icon={chatbox} />
                <IonLabel></IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab5" href="/profile">
                <IonIcon icon={person} />
                <IonLabel></IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        )}
      </Router>
    </IonApp>
  );
};

export default App;
