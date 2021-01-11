import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as authReducer from './auth/auth.reducer';
import * as ingresoEgresoReducer from './ingreso-egreso/ingresoEgreso.reducer';

export interface AppState {
  ui: ui.State;
  user: authReducer.State;
  ingresoEgreso: ingresoEgresoReducer.State
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: authReducer.authReducer,
  ingresoEgreso: ingresoEgresoReducer.ingresoEgresoReducer
};
