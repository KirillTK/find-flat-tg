interface OlxPhoto {
  id: number;
  filename: string;
}

interface Location {
  name?: string;
}

interface ApartmentParams {
  key: 'floor_select' | 'price';
  name: string;
  value: {
    key: string;
    label: string;
  };
}

export interface OlxApartment {
  url: string;
  title: string;
  created_time: string;
  photos: OlxPhoto[];
  location: {
    city: Location;
    district: Location;
  };
  valid_to_time: string;
  pushup_time: string;
  params: ApartmentParams[];
}
