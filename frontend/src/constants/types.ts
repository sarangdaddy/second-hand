export interface Item {
  productId: number;
  title: string;
  price: number | null;
  categoryTitle: string;
  location: string;
  chatRoomCount: number;
  watchListCount: number;
  isWatchListChecked: boolean;
  productMainImgUrl: string;
  salesStatus: '판매중' | '예약중' | '판매완료';
  createAt: string;
  updatedAt: string;
  isSetEditOption?: boolean;
}

export interface ItemDetail {
  productId: number;
  createAt: string;
  title: string;
  contents: string;
  salesStatus: '판매중' | '예약중' | '판매완료';
  updatedAt: string;
  price: number | null;
  location: string;
  chatRoomCount: number;
  watchListCount: number;
  isWatchListChecked: boolean;
  imageList: string[];
  categoryTitle: string;
  memberId: number;
  memberNickName: string;
  lookupCount: number;
  isMine: boolean;
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

export interface Room {
  roomId: string;
  productId: string;
  sellerId: string;
  buyerId: string;
  sellerNickName: string;
  sellerProfileUrl: string;
}

export interface ChatHistoryProps {
  type: string;
  sender: string;
  message: string;
}
