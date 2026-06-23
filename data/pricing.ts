export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  notIncluded: string[];
  recommended?: boolean;
  cta: string;
  color: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "უფასო",
    period: "",
    description: "სცადე TripNova AI ყოველგვარი ვალდებულების გარეშე.",
    features: [
      "3 AI გეგმა თვეში",
      "5 მიმართულება",
      "ძირითადი მარშრუტი",
      "ელ-ფოსტის მხარდაჭერა",
      "ბიუჯეტის კალკულატორი",
    ],
    notIncluded: [
      "სასტუმროს ბუქინგი",
      "პრემიუმ მიმართულებები",
      "PDF ექსპორტი",
      "პრიორიტეტული მხარდაჭერა",
    ],
    cta: "დაიწყე უფასოდ",
    color: "blue",
  },
  {
    id: "pro",
    name: "Pro",
    price: "19₾",
    period: "/თვე",
    description: "პროფესიონალი მოგზაურებისთვის — სრული AI სიმძლავრე.",
    features: [
      "შეუზღუდავი AI გეგმები",
      "ყველა მიმართულება",
      "დეტალური დღიური მარშრუტი",
      "სასტუმროს რეკომენდაცია",
      "რესტორნების გიდი",
      "PDF ექსპორტი",
      "24/7 ჩეთ-მხარდაჭერა",
      "ოფლაინ წვდომა",
    ],
    notIncluded: [
      "API წვდომა",
      "White-label",
    ],
    recommended: true,
    cta: "დაიწყე Pro",
    color: "primary",
  },
  {
    id: "agency",
    name: "Agency",
    price: "79₾",
    period: "/თვე",
    description: "სატურისტო სააგენტოებისა და ბიზნესებისთვის.",
    features: [
      "ყველაფერი Pro-ში",
      "10 გუნდის წევრი",
      "API წვდომა",
      "White-label ბრენდინგი",
      "კლიენტების მართვა",
      "ანალიტიკის დაფა",
      "კუსტომ მარშრუტები",
      "სპეციალური მხარდაჭერა",
    ],
    notIncluded: [],
    cta: "დაუკავშირდი",
    color: "luxury",
  },
];
