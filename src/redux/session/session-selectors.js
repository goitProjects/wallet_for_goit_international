export const tokenSelector = (state) => state.session.token;
export const isAuthSelector = (state) => state.session.isAuth;
export const getIsButtonShown = (state) => state.session.isShown;
export const modalIsOpenSelector = (state) => state.session.modal.isOpen;
export const modalTypeSelector = (state) => state.session.modal.type;
export const modalDataSelector = (state) => state.session.modal.data;
