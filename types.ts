export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  badge: string;
  title: string;
  description: string;
}

export interface FleetItem {
  id: string;
  name: string;
  badge: string;
  price: number;
  features: string[];
  image?: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  message: string;
}