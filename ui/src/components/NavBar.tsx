import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButton, IonRouterLink } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const NavBar: React.FC = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('favorite'); 
    localStorage.removeItem('email'); 
    history.push('/'); 
  };

  return (
    <IonHeader>
      <IonToolbar>
        {token ? (
          <IonRouterLink routerLink="/pokemon">
            <IonTitle>Pokedex</IonTitle>
          </IonRouterLink>
        ) : (
          <IonTitle>Pokedex</IonTitle>
        )}
        <IonButton slot="end" onClick={handleLogout}>
          Logout
        </IonButton>
      </IonToolbar>
    </IonHeader>
  );
};

export default NavBar;

