import React from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonButtons,
  IonMenuButton,
  IonSearchbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
  IonRouterLink,
} from '@ionic/react';
import { camera, images, settings, person, heartOutline, starOutline, trendingUpOutline } from 'ionicons/icons';

const Home: React.FC = () => {

  return (
    <div className="custom-app home-page-wrapper">
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonMenuButton slot="start" />
            <IonTitle>Welcome back!</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="home-page-content">
          <div className="search-bar">
            <IonSearchbar></IonSearchbar>
          </div>

          <div className="big-card">
          <IonRouterLink href="/gallery">
  <IonCard className="custom-card">
    <div className="card-image-container">
      <img src="https://blog.crownandcaliber.com/wp-content/uploads/2015/03/Rolex-Submariner-L-40826-R-47525-5305-1024x683.jpg" alt="Big Card Image" />
    </div>
    <IonCardContent>
    Check out the latest collections from your fellow collectors!</IonCardContent>
  </IonCard>
  </IonRouterLink>
</div>

          <div className="small-cards">
            <IonGrid>
              <IonRow>
                <IonCol size="4">
                <IonRouterLink href="/gallery">
                  <IonCard className="custom-card">
                  <IonIcon icon={starOutline} className="ion-icon-custom" />
                    My Collection
                  </IonCard>
                  </IonRouterLink>
                </IonCol>
                <IonCol size="4">
                <IonRouterLink href="/gallery">
                  <IonCard className="custom-card">
                  <IonIcon icon={trendingUpOutline} className="ion-icon-custom" />
                    Trending
                  </IonCard>
                  </IonRouterLink>
                </IonCol>
                <IonCol size="4">
                <IonRouterLink href="/gallery">
                  <IonCard className="custom-card">
                  <IonIcon icon={heartOutline} className="ion-icon-custom" />
                    Favorites
                  </IonCard>
                  </IonRouterLink>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>

          <div className="medium-cards">
  <IonGrid>
    <IonRow>
      <IonCol size="6">
      <IonRouterLink href="/gallery">
        <IonCard className="custom-card">
          <div className="card-image-container">
            <img src="https://www.cleveland.com/resizer/Hhp5cJpzHpIN-ibf7wvh0rlCd44=/800x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/AOGHSAX6PJE4LCOTQBALIDEPUM.JPG" alt="Card 4" />
          </div>
          <IonCardContent>
            Cogo Highlights: Peanut Butter Jar Collection
          </IonCardContent>
        </IonCard>
        </IonRouterLink>
      </IonCol>
      <IonCol size="6">
      <IonRouterLink href="/gallery">
        <IonCard className="custom-card">
          <div className="card-image-container">
            <img src="https://assetsio.reedpopcdn.com/rare-pokemon-cards-pikachu-charizard-blastoise-chansey.jpg?width=848&quality=80&format=jpg&auto=webp" alt="Card 5" />
          </div>
          <IonCardContent>
            Cogo Highlights: Pokemon cards are IN!
          </IonCardContent>
        </IonCard>
        </IonRouterLink>
      </IonCol>
    </IonRow>
  </IonGrid>
</div>

        </IonContent>
      </IonPage>
    </div>
  );
};


export default Home;