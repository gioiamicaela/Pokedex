import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Pokemon from './pages/Pokemon';
import PokemonDetail from './pages/PokemonDetail'; 
import LoginPage from './pages/Login';
import ProtectedRoute from './components/ProtectedRoutes'; 
import CreatePokemonPage from './pages/CreatePokemon';
import CustomPokemonDetail from './pages/CutsomPokemonDetail';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <ProtectedRoute exact path="/pokemon" component={Pokemon} />
          <ProtectedRoute exact path="/createPokemon" component={CreatePokemonPage} />
          <ProtectedRoute exact path="/pokemon/:name" component={PokemonDetail} />
          <ProtectedRoute exact path="/customPokemon/:id" component={CustomPokemonDetail} /> 
          <Redirect from="*" to="/" />
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
