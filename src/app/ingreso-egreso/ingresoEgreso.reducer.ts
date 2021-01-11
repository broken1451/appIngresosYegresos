import { createReducer, on } from '@ngrx/store';
import { setItem, unSetItem } from '../ingreso-egreso/ingresoEgreso.actions';
import { IngresoEgreso } from '../models/ingreso-egresos';

export interface State {
  items: IngresoEgreso[];
}

export const initialState: State = {
  items: [],
};

const _ingresoEgresoReducer = createReducer(
  initialState,
  on(setItem, (state, { items }) => ({ ...state, items: [...items] })),
  on(unSetItem, (state) => ({ ...state, items: [] }))
);

export function ingresoEgresoReducer(state, action) {
  return _ingresoEgresoReducer(state, action);
}
