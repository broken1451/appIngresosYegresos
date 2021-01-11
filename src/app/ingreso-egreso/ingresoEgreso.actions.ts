import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egresos';

export const unSetItem = createAction('[IngresoEgreso Component] unSetItem');
export const setItem = createAction(
  '[IngresoEgreso Component] setItem',
  props<{ items: IngresoEgreso[] }>()
);
