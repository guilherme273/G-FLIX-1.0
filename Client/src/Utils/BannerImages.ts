export const imagesbanner = [
  { prevImg: "image1", url: "/assets/banner-home.png" },
  { prevImg: "image2", url: "/assets/banner-favoritos.png" },
];
export const imagesbannerfavorites = [
  { prevImg: "image1", url: "/assets/banner-home.png" },
  { prevImg: "image2", url: "/assets/banner-favoritos.png" },
  { prevImg: "image2", url: "/assets/banner-assistir.png" },
];

export interface BannerProps {
  prevImg: string;
  url: string;
}
