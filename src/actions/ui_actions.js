export const ENABLE_MODAL = 'ENABLE_MODAL';
export const REMOVE_MODAL = 'REMOVE_MODAL';

export const enableModal = (mode) => ({
  type: ENABLE_MODAL,
  mode
});

export const removeModal = () => ({
  type: REMOVE_MODAL,
});