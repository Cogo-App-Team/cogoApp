import React, { useEffect, useState } from 'react';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenu,
  IonList,
  IonItem,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
  IonMenuButton,
  setupIonicReact,
} from '@ionic/react';
import { homeOutline, cameraOutline, gridOutline, addOutline, chatbubbleEllipsesOutline, personOutline, informationCircleOutline, logOutOutline, settingsOutline, add } from 'ionicons/icons';
import { Redirect, Route, BrowserRouter as Router, useHistory, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Photo from './pages/Photo';
import Collections from './pages/Collections';
import Settings from './pages/Settings';
import About from './pages/About';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
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
import { Camera } from '@capacitor/camera';
import Items from './pages/Items';

setupIonicReact();

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const history = useHistory();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
  }, []);

  const handleLogout = async (): Promise<void> => {
    if (isAuthenticated) {
      const auth = getAuth();
      try {
        await signOut(auth);
        setIsAuthenticated(false);
        history.push('/login');
      } catch (error) {
        if (error instanceof Error) {
          console.error('Logout failed:', error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    }
  };

  return (
    <IonApp>
      <Router>
        {isAuthenticated === null ? (
          <div>Loading...</div>
        ) : isAuthenticated ? (
          <div className="app-container">
            <IonMenu side="start" contentId="main-content" type="overlay" className="menu-container">
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Menu</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonContent className="menu-list">
                <IonList>
                  <IonItem button routerLink="/home">
                    <IonIcon icon={homeOutline} />
                    <IonLabel>Home</IonLabel>
                  </IonItem>
                  <IonItem button routerLink="/photo">
                    <IonIcon icon={add} />
                    <IonLabel>Create Item</IonLabel>
                  </IonItem>
                  <IonItem button routerLink="/collections">
                    <IonIcon icon={gridOutline} />
                    <IonLabel>Collections</IonLabel>
                  </IonItem>
                  <IonItem button routerLink="/profile">
                    <IonIcon icon={personOutline} />
                    <IonLabel>Profile</IonLabel>
                  </IonItem>
                  <IonItem button routerLink="/settings">
                    <IonIcon icon={settingsOutline} />
                    <IonLabel>Settings</IonLabel>
                  </IonItem>
                  <IonItem button routerLink="/about">
                    <IonIcon icon={informationCircleOutline} />
                    <IonLabel>About</IonLabel>
                  </IonItem>
                  {isAuthenticated && (
                    <IonItem button onClick={handleLogout}>
                      <IonIcon icon={logOutOutline} />
                      <IonLabel>Logout</IonLabel>
                    </IonItem>
                  )}
                </IonList>
              </IonContent>
            </IonMenu>

            <IonRouterOutlet id="main-content" className="main-content">
              <Route path="/home" component={Home} exact />
              <Route path="/collections" component={Collections} exact />
              <Route path="/photo" component={Photo} exact />
              <Route path="/contact" component={Contact} exact />
              <Route path="/profile" component={Profile} exact />
              <Route path="/settings" component={Settings} exact />
              <Route path="/about" component={About} exact />
              <Route path="/items" component={Items} exact />
              <Switch>
                <Route path="/login/signup" component={Signup} exact />
                <Route path="/login/forgot-password" component={ForgotPassword} exact />
                <Route path="/login" render={() => <Redirect to="/home" />} exact />
              </Switch>
            </IonRouterOutlet>

            {isAuthenticated && (
              <div className="tabs-container">
                <IonTabs className="custom-tabs">
                  <IonRouterOutlet>
                    <Route path="/home" component={Home} exact />
                    <Route path="/collections" component={Collections} exact />
                    <Route path="/photo" component={Photo} exact />
                    <Route path="/contact" component={Contact} exact />
                    <Route path="/profile" component={Profile} exact />
                    <Route path="/settings" component={Settings} exact />
                    <Route path="/about" component={About} exact />
                    <Route path="/" render={() => <Redirect to="/home" />} exact />
                  </IonRouterOutlet>
                  <IonTabBar slot="bottom" className="custom-tab-bar">
                    <IonTabButton tab="home" href="/home">
                      <IonIcon icon={homeOutline} />
                    </IonTabButton>
                    <IonTabButton tab="collections" href="/collections">
                      <IonIcon icon={gridOutline} />
                    </IonTabButton>
                    <IonTabButton tab="photo" href="/photo">
                      <IonIcon icon={addOutline} />
                    </IonTabButton>
                    <IonTabButton tab="contact" href="/contact">
                      <IonIcon icon={chatbubbleEllipsesOutline} />
                    </IonTabButton>
                    <IonTabButton tab="profile" href="/profile">
                      <IonIcon icon={personOutline} />
                    </IonTabButton>
                  </IonTabBar>
                </IonTabs>
              </div>
            )}
          </div>
        ) : (
          <Switch>
            <Route path="/login/signup" component={Signup} exact />
            <Route path="/login/forgot-password" component={ForgotPassword} exact />
            <Route path="/login" component={Login} exact />
            <Redirect to="/login" />
          </Switch>
        )}
      </Router>
    </IonApp>
  );
};

export default App;
