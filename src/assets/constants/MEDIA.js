const sMobile = 320;
const mobile = 480;
const tablet = 768;
const desktop = 1280;

export const SMOBILE_ONLY = { minWidth: sMobile, maxWidth: tablet - 1 };
export const SMOBILE = { minWidth: sMobile };
export const MOBILE_ONLY = { maxWidth: tablet - 1 };
export const MOBILE = { minWidth: mobile };
export const TABLET_ONLY = { minWidth: tablet, maxWidth: desktop - 1 };
export const TABLET = { minWidth: tablet };
export const DESKTOP = { minWidth: desktop };
export const NOT_DESKTOP = { maxWidth: desktop - 1 };
