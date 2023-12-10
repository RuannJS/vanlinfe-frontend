export enum VanType {
  RUGGED = 'rugged',
  SIMPLE = 'simple',
  LUXURY = 'luxury',
}

export interface Van {
  id: string;
  price: number;
  name: string;
  type: VanType;
  description: string;
  host: {
    name: string;
  };
  imageUrl: string;
}
