export const APP_ROUTES = {
  LOGIN: '/',
  ORDER: '/order/:username',
} as const;

export const ADMIN_TABS = {
  ADD: 'add',
  EDIT: 'edit',
} as const;

export const DEFAULT_BURGER = {
  id: 0,
  title: '',
  image: '',
  price: 0,
};