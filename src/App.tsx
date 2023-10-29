// App.tsx
import React from 'react';
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
import { home, camera, images, settings, person } from 'ionicons/icons';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Photo from './pages/Photo';
import Gallery from './pages/Gallery';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Login from './components/Login';
import Registration from './components/Registration';

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
  return (
    <IonApp>
      <Router>
        <IonMenu side="start" contentId="main-content">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem button routerLink="/photo">
                <IonIcon icon={camera} />
                <IonLabel>Camera</IonLabel>
              </IonItem>
              <IonItem button routerLink="/photo/gallery">
                <IonIcon icon={images} />
                <IonLabel>Gallery</IonLabel>
              </IonItem>
              <IonItem button routerLink="/settings">
                <IonIcon icon={settings} />
                <IonLabel>Settings</IonLabel>
              </IonItem>
              <IonItem button routerLink="/profile">
                <IonIcon icon={person} />
                <IonLabel>Profile</IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
        </IonMenu>
        <IonTabs>
          <IonRouterOutlet id="main-content">
            <Route path="/home" component={Home} exact />
            <Route path="/photo" component={Photo} exact />
            <Route path="/photo/gallery" component={Gallery} />
            <Route path="/settings" component={Settings} />
            <Route path="/profile" component={Profile} />
            <Route path="/" render={() => <Redirect to="/home" />} exact />
            <Route path="/login" component={Login} />
            <Route path="/registration" component={Registration} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={home} />
            </IonTabButton>
            <IonTabButton tab="photo" href="/photo">
              <IonIcon icon={camera} />
            </IonTabButton>
            <IonTabButton tab="gallery" href="/photo/gallery">
              <IonIcon icon={images} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </Router>
    </IonApp>
  );
};

export default App;
