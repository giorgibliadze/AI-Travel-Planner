export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  destination: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "ნინო ჩიქოვანი",
    role: "ტრაველ ბლოგერი",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    text: "TripNova AI-მ სრულად შეცვალა ჩემი მოგზაურობის გეგმვა. პარიზის 7-დღიანი მარშრუტი 30 წამში შექმნა — ყველა ჩემი სურვილი გაითვალისწინა!",
    destination: "პარიზი, საფრანგეთი",
  },
  {
    id: "2",
    name: "გიორგი მამულაშვილი",
    role: "ფოტოგრაფი",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    text: "კაპადოკიაში ჩემი პირველი ვიზიტი იდეალური გახდა TripNova-ს გეგმის წყალობით. ყველა ლოკაცია, სასტუმრო, რესტორანი — ზუსტად ჩემი სტილი!",
    destination: "კაპადოკია, თურქეთი",
  },
  {
    id: "3",
    name: "მარიამ ბერიძე",
    role: "ოჯახის დედა",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    rating: 5,
    text: "4 ადამიანის ოჯახური ტური ბალიში — ბიუჯეტის ფარგლებში, ბავშვებისთვის განსაკუთრებული ატრაქციებით. საოცარია!",
    destination: "ბალი, ინდონეზია",
  },
  {
    id: "4",
    name: "დავით კვარაცხელია",
    role: "ბიზნესმენი",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    rating: 5,
    text: "დუბაიში სამუშაო ვიზიტი+დასვენების კომბინაცია AI-მ ბრწყინვალედ დაგეგმა. 5 ვარსკვლავიანი სასტუმრო + საქმიანი შეხვედრები — ყველაფერი სრულყოფილი!",
    destination: "დუბაი, არაბეთი",
  },
];
