export interface Item {
  productId: number;
  title: string;
  price: number | null;
  categoryTitle: string;
  location: string;
  chatRoomCount: number;
  watchListCount: number;
  isWatchlistChecked: boolean;
  productMainImgUrl: string;
  salesStatus: '판매중' | '예약중' | '판매완료';
  createAt: string;
  updatedAt: string;
  isSetEditOption?: boolean;
}

export interface Location {
  locationId: number;
  locationDetails: string;
  locationShortening: string;
  mainLocationState: boolean;
}

export interface Category {
  categoryId: number;
  title: string;
  categoryImgUrl: string;
}
