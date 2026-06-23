export interface Destination {
  id: string;
  name: string;
  nameGe: string;
  country: string;
  countryGe: string;
  description: string;
  image: string;
  priceFrom: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  featured?: boolean;
}

export const destinations: Destination[] = [
  {
    id: "paris",
    name: "Paris",
    nameGe: "პარიზი",
    country: "France",
    countryGe: "საფრანგეთი",
    description: "სიყვარულის ქალაქი, სადაც ეიფელის კოშკი, ხელოვნება და კულინარია ერთ სიმფონიად ერწყმის.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    priceFrom: 1200,
    rating: 4.9,
    reviewCount: 2847,
    tags: ["რომანტიული", "კულტურა", "გასტრონომია"],
    featured: true,
  },
  {
    id: "bali",
    name: "Bali",
    nameGe: "ბალი",
    country: "Indonesia",
    countryGe: "ინდონეზია",
    description: "ღმერთების კუნძული — ტროპიკული ბუნება, სულიერი ტაძრები და ოკეანის ამოსვლა.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    priceFrom: 980,
    rating: 4.8,
    reviewCount: 3421,
    tags: ["სამოთხე", "სპა", "ბუნება"],
    featured: true,
  },
  {
    id: "rome",
    name: "Rome",
    nameGe: "რომი",
    country: "Italy",
    countryGe: "იტალია",
    description: "მარადიული ქალაქი, სადაც ყოველ ნაბიჯზე ისტორია, ხელოვნება და გასაოცარი სამზარეულო გელოდება.",
    image: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=800&q=80",
    priceFrom: 1050,
    rating: 4.7,
    reviewCount: 2156,
    tags: ["ისტორია", "ხელოვნება", "კულინარია"],
    featured: true,
  },
  {
    id: "cappadocia",
    name: "Cappadocia",
    nameGe: "კაპადოკია",
    country: "Turkey",
    countryGe: "თურქეთი",
    description: "ზღაპრული პეიზაჟი — ჰაერის ბუშტები ცაში, კლდეში გამოქვაბული სასტუმროები, ველური ბუნება.",
    image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?w=800&q=80",
    priceFrom: 750,
    rating: 4.9,
    reviewCount: 1893,
    tags: ["თავგადასავალი", "ფოტოგრაფია", "უნიკალური"],
    featured: true,
  },
  {
    id: "dubai",
    name: "Dubai",
    nameGe: "დუბაი",
    country: "UAE",
    countryGe: "არაბეთი",
    description: "მომავლის ქალაქი — ცათამბჯენები, ოქროს ბაზრები, უდაბნოს საფარი და ულტრა-ლუქსი.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    priceFrom: 1400,
    rating: 4.8,
    reviewCount: 3102,
    tags: ["ლუქსი", "თანამედროვე", "შოპინგი"],
    featured: false,
  },
  {
    id: "tbilisi",
    name: "Tbilisi",
    nameGe: "თბილისი",
    country: "Georgia",
    countryGe: "საქართველო",
    description: "კავკასიის მარგალიტი — ძველი ქალაქი, ღვინო, სიყვარული და გულუხვი სტუმართმოყვარეობა.",
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
    priceFrom: 450,
    rating: 4.9,
    reviewCount: 1567,
    tags: ["კულტურა", "ღვინო", "ისტორია"],
    featured: false,
  },
];
