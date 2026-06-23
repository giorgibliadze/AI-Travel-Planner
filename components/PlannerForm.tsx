"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Calendar, Banknote, Users, Compass, Sparkles,
  Clock, ArrowRight, Coffee, Utensils, Camera, Moon,
  Car, Train, ChevronDown, ChevronUp, CloudSun, Wind,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface FormData {
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  travelers: string;
  style: string;
}

interface TimelineItem {
  time: string;
  type: "food" | "sight" | "transport" | "leisure";
  title: string;
  location: string;
  description: string;
  duration: string;
  cost: string;
  tip?: string;
}

interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  weather: string;
  totalDayBudget: number;
  timeline: TimelineItem[];
}

// ── Destination data ──────────────────────────────────────────────────────────

type DestinationKey = "paris" | "rome" | "dubai" | "tbilisi" | "cappadocia" | "bali" | "default";

const destinationAttractions: Record<DestinationKey, TimelineItem[][]> = {
  paris: [
    [
      { time: "08:00", type: "food", title: "პარიზული საუზმე", location: "Café de Flore, Saint-Germain", description: "კრუასანი, კაფე ო ლე და ახალი ბაგეტი. პარიზის ყველაზე ლეგენდარული კაფე, სადაც სიმონ დე ბოვუარი წერდა.", duration: "1 საათი", cost: "18€", tip: "დაჯექი გარეთ — პარიზელები ყველა ხალხს ათვალიერებენ" },
      { time: "09:30", type: "sight", title: "ეიფელის კოშკი", location: "Champ de Mars, 7e", description: "ადრე დილით ყველაზე ნაკლები რიგია. II სართულიდან ხედი მთელ პარიზზე გამოდის.", duration: "2 საათი", cost: "26€", tip: "Summit ბილეთი წინასწარ გამოიწერე — online 50%-ით იაფია" },
      { time: "12:00", type: "sight", title: "ლუვრის მუზეუმი", location: "Rue de Rivoli, 1er", description: "მონა ლიზა, ვენერა დე მილო, ნიკე სამოთრაკელი. 35,000 ნამუშევარი 60,000 მ²-ზე.", duration: "2.5 საათი", cost: "22€", tip: "შედი Richelieu wing-იდან — ბევრი ვერ იცის, რიგი მცირეა" },
      { time: "14:30", type: "food", title: "სადილი Le Jules Verne-ში", location: "ეიფელის კოშკი, II სართული", description: "მიშელინ-ვარსკვლავიანი რესტორანი ეიფელის კოშკზე. Alain Ducasse-ის სამზარეულო ქალაქის ფონზე.", duration: "1.5 საათი", cost: "120€", tip: "1 თვით ადრე დაჯავში — ეს მაგიდა ყოველთვის სავსეა" },
      { time: "16:30", type: "leisure", title: "სენაზე კრუიზი", location: "Port de la Bourdonnais", description: "75-წუთიანი ნავ-ტური. ნოტრ-დამი, Musée d'Orsay, Pont Neuf — ქალაქი სხვა კუთხიდან.", duration: "1.5 საათი", cost: "15€", tip: "დასასვენებელი სავარძელი სთხოვე — upper deck მზიანია" },
      { time: "19:00", type: "food", title: "ვახშამი მონმარტრზე", location: "Rue des Abbesses, 18e", description: "ბოჰემური ქვარტლის პატარა ბისტრო. Duck confit, რატატუი, ბურგუნდიული ღვინო.", duration: "2 საათი", cost: "55€" },
      { time: "21:30", type: "leisure", title: "საღამოს გასეირნება", location: "Pont Alexandre III", description: "პარიზის ყველაზე ულამაზესი ხიდი ღამის განათებაში. ეიფელი ყოველ საათში ციმციმდება.", duration: "1 საათი", cost: "უფასო", tip: "21:45-ზე ეიფელის ციმციმი იწყება — ნუ გამოტოვებ" },
    ],
    [
      { time: "08:30", type: "food", title: "საუზმე Angelina-ში", location: "226 Rue de Rivoli", description: "1903 წლის ლეგენდარული სალონი. Mont-Blanc ნამცხვარი და ცხელი შოკოლადი — პარიზის საუკეთესო.", duration: "45 წუთი", cost: "22€" },
      { time: "09:30", type: "sight", title: "ვერსალის სასახლე", location: "Place d'Armes, Versailles", description: "სარკეების დარბაზი, სამეფო ბაღები, Marie Antoinette-ის Petit Trianon. ბაროკოს მწვერვალი.", duration: "4 საათი", cost: "20€", tip: "RER C მატარებლით 35 წუთი — Versailles Château სადგური" },
      { time: "14:00", type: "food", title: "ლანჩი ბაღებში", location: "Versailles Gardens Café", description: "ბაღის კაფეში ადგილობრივი ფრანგული სენდვიჩები ვერსალის ბაღში.", duration: "45 წუთი", cost: "18€" },
      { time: "16:00", type: "sight", title: "მარე ქვარტალი", location: "Le Marais, 3e-4e", description: "ებრაული ბაზარი, გალერეები, Place des Vosges. ყველაზე ჰიპსტერული და ისტორიული ნაწილი.", duration: "2 საათი", cost: "უფასო" },
      { time: "18:30", type: "food", title: "ღვინო L'As du Fallafel-ის გვერდით", location: "Rue des Rosiers", description: "Marais-ს ლეგენდარული ფალაფელი + ლოკალური ბარი ნატურის ღვინოთი.", duration: "1.5 საათი", cost: "30€" },
      { time: "20:30", type: "leisure", title: "Moulin Rouge შოუ", location: "82 Blvd de Clichy, 18e", description: "1889 წლის კაბარე — კამბური, ფეხი, ბრჭყვიალა კოსტუმები. პარიზის ყველაზე ვარსკვლავური შოუ.", duration: "2.5 საათი", cost: "87€", tip: "შამპანური პაკეტი ღირს — show + champagne ყველაზე პოპულარულია" },
    ],
    [
      { time: "09:00", type: "sight", title: "ნოტრ-დამის კათედრალი", location: "Île de la Cité, 4e", description: "2024-ში ხელახლა გაიხსნა რეკონსტრუქციის შემდეგ. გოთური შედევრი, ვარდის ვიტრაჟი.", duration: "1.5 საათი", cost: "უფასო" },
      { time: "11:00", type: "sight", title: "მუზეი დ'ორსე", location: "1 Rue de la Légion d'Honneur", description: "მსოფლიოს საუკეთესო იმპრესიონიზმის კოლექცია. მონე, რენუარი, ვან გოგი.", duration: "2 საათი", cost: "16€" },
      { time: "13:30", type: "food", title: "ლანჩი Brasserie Lipp-ში", location: "151 Blvd Saint-Germain", description: "Saint-Germain-ის ლეგენდარული ბრასერი. Choucroute garnie, პარიზული სტეიკი.", duration: "1.5 საათი", cost: "48€" },
      { time: "15:30", type: "sight", title: "ლუქსემბურგის ბაღი", location: "6e Arrondissement", description: "სენატის სასახლის ბაღი. ფრანგი სტუდენტები, ჭადრაკი, ბავშვების გემი ტბაზე.", duration: "1 საათი", cost: "უფასო" },
      { time: "17:00", type: "transport", title: "Metro Line 4", location: "Saint-Placide → Montparnasse", description: "პარიზის მეტრო — ყველაზე ეფექტური ტრანსპორტი.", duration: "10 წუთი", cost: "2€" },
      { time: "17:30", type: "sight", title: "მონმარტრი + საკრე-ქერი", location: "Butte Montmartre, 18e", description: "ბოჰემური მხატვართა ქვარტალი. ბაზილიკა, Place du Tertre, Dalí მუზეუმი.", duration: "2 საათი", cost: "უფასო" },
      { time: "20:00", type: "food", title: "ვახშამი Le Relais de l'Entrecôte", location: "20 Rue Saint-Benoît", description: "მხოლოდ ერთი კერძი: steak-frites — მაგრამ საუკეთესო. საიდუმლო სოუსი.", duration: "1.5 საათი", cost: "35€" },
    ],
    [
      { time: "08:00", type: "food", title: "ადგილობრივი ბაკალია", location: "Marché d'Aligre, 12e", description: "პარიზელების ბაზარი — ახალი ყველი, ზეთისხილი, ხმელი ხილი. ნამდვილი პარიზი.", duration: "1 საათი", cost: "15€" },
      { time: "09:30", type: "sight", title: "ცენტრ პომპიდუ", location: "Place Georges-Pompidou, 4e", description: "თანამედროვე ხელოვნების მუზეუმი. Kandinsky, Picasso, Warhol. გარე ესკალატორი — ქალაქის ხედი.", duration: "2 საათი", cost: "15€" },
      { time: "12:00", type: "food", title: "ლანჩი Frenchie-ში", location: "5 Rue du Nil, 2e", description: "მიშელინ-ბიბ განმა. ბიო-პროდუქტები, contemporary french — ნუ გამოტოვო.", duration: "1.5 საათი", cost: "55€", tip: "2 კვირით ადრე დაჯავshi — ყოველთვის სავსეა" },
      { time: "14:30", type: "sight", title: "პალე-რუაიალი", location: "Place du Palais Royal, 1er", description: "XVIII საუკუნის სასახლე. Buren-ის სვეტები, ანტიკვარიატი, მყუდრო ბაღი.", duration: "1 საათი", cost: "უფასო" },
      { time: "16:00", type: "leisure", title: "Opéra Garnier", location: "8 Rue Scribe, 9e", description: "ნაპოლეონ III-ის ოპერა. ჭაღი, ოქრო, Marc Chagall-ის ჭერი. Grand Foyer — ბალი.", duration: "1 საათი", cost: "14€" },
      { time: "19:30", type: "food", title: "ვახშამი Guy Savoy-ში", location: "11 Quai de Conti, 6e", description: "3 მიშელინ-ვარსკვლავი. Artichoke soup with black truffle — პარიზის გაზრდილი სამზარეულო.", duration: "3 საათი", cost: "350€", tip: "ეს გამოცდილება, არა კვება — წელიწადში ერთხელ" },
    ],
    [
      { time: "09:00", type: "sight", title: "Arc de Triomphe", location: "Place Charles de Gaulle, 8e", description: "ნაპოლეონის გამარჯვების თაღი. სახურავიდან ხედი 12 გამზირზე და მთელ ჩამდინარე Champs.", duration: "1 საათი", cost: "13€" },
      { time: "10:30", type: "leisure", title: "Champs-Élysées-ზე სეირნობა", location: "Avenue des Champs-Élysées", description: "მსოფლიოს ყველაზე ცნობილი გამზირი. Louis Vuitton, Ladurée macarons, Apple Store Paris.", duration: "1.5 საათი", cost: "ვარირებს" },
      { time: "12:30", type: "food", title: "ლანჩი Ladurée-ში", location: "75 Champs-Élysées", description: "1862 წლის სამეფო კონდიტერი. მაკარონი, croque-monsieur, rose lemonade.", duration: "1 საათი", cost: "35€" },
      { time: "14:30", type: "sight", title: "Rodin მუზეუმი", location: "77 Rue de Varenne, 7e", description: "მოაზროვნე, კალე მოქალაქეები, Kiss — ბაღში და შიგნით. ყველაზე ლამაზი მუზეუმის ბაღი.", duration: "1.5 საათი", cost: "13€" },
      { time: "17:00", type: "sight", title: "Sainte-Chapelle", location: "8 Blvd du Palais, 1er", description: "XIII საუკუნის სამეფო სამლოცველო. 15 მ სიმაღლის ვიტრაჟი — განათება, ფერი, სული.", duration: "1 საათი", cost: "13€" },
      { time: "19:30", type: "food", title: "ვახშამი Le Comptoir du Relais", location: "9 Carrefour de l'Odéon", description: "Yves Camdeborde-ის ბისტრო. Foie gras terrine, magret de canard — პარიზის სული.", duration: "2 საათი", cost: "60€" },
      { time: "22:00", type: "leisure", title: "ბოლო ღამე ქალაქში", location: "Pont des Arts", description: "სიყვარულის ხიდი. ბოთლი შამპანური, ეიფელის ციმციმი, პარიზის ბოლო ხედი.", duration: "1 საათი", cost: "20€" },
    ],
  ],

  rome: [
    [
      { time: "07:30", type: "food", title: "Cornetto e Caffè", location: "Bar San Calisto, Trastevere", description: "რომაელი ბარმენი, 1€ espresso, cornetto alla crema. ყოველი რომელი დღე ამ ყავით იწყება.", duration: "30 წუთი", cost: "3€" },
      { time: "09:00", type: "sight", title: "კოლიზეუმი", location: "Piazza del Colosseo, 1", description: "72 წ.ე. ამფითეატრი — 80,000 მაყურებელი, გლადიატორები, ლომები. სახელმწიფოს სიმბოლო.", duration: "2.5 საათი", cost: "16€", tip: "Online ბილეთი + Forum Romanum + Palatine ერთ ფასში" },
      { time: "12:00", type: "sight", title: "ფორუმ რომანუმი", location: "Via Sacra, Roma", description: "ძველი რომის გული. ვესტალური ქალწულები, სენატი, Caesar-ის ტაძარი — ისტორია ფეხქვეშ.", duration: "1.5 საათი", cost: "კოლ. ბილეთშია" },
      { time: "14:00", type: "food", title: "სადილი Osteria da Fortunata", location: "Via del Pellegrino 14", description: "Cacio e pepe, carbonara, amatriciana — ნამდვილი რომაული pasta. შეფი ბებია.", duration: "1.5 საათი", cost: "28€" },
      { time: "16:00", type: "sight", title: "ტრევის შადრევანი", location: "Piazza di Trevi", description: "1762 წ. ბაროკოს შედევრი. სამი მონეტა — გარანტია, რომ დაბრუნდები.", duration: "45 წუთი", cost: "უფასო", tip: "დილა-ადრე ნაკლები ხალხია — 06:30 ტურისტი არ არის" },
      { time: "17:00", type: "sight", title: "პანთეონი", location: "Piazza della Rotonda", description: "125 წ.ე. ყველაზე შემონახული ანტიკური ნაგებობა. Raphael-ის საფლავი. ოქროს კუპოლი.", duration: "1 საათი", cost: "5€" },
      { time: "20:00", type: "food", title: "ვახშამი Trastevere-ში", location: "Piazza Santa Maria in Trastevere", description: "ბოჰემური ქვარტალი. Supplì, pizza al taglio, tiramisu — ქუჩის სუფრა ვარდებლ სინათლეში.", duration: "2 საათი", cost: "40€" },
    ],
    [
      { time: "08:00", type: "food", title: "საუზმე ბაზარში", location: "Campo de' Fiori Market", description: "ყოველ დილას ბაზარი. ახალი ხილი, ყავა, ადგილობრივი ყველი. XV საუკუნის მოედანი.", duration: "1 საათი", cost: "10€" },
      { time: "09:30", type: "sight", title: "ვატიკანის მუზეუმები", location: "Viale Vaticano", description: "Raphael Rooms, Sistine Chapel — Michelangelo-ს ჭერი. 70,000 ნამუშევარი.", duration: "3.5 საათი", cost: "20€", tip: "Skip-the-line ბილეთი სავალდებულოა — 2-3 საათი ლოდინი ნორმაა" },
      { time: "13:30", type: "food", title: "ლანჩი ვატიკანის გვერდით", location: "Pizzarium, Via della Meloria 43", description: "Gabriele Bonci-ს პიცა — რომის საუკეთესო pizza al taglio. ზემოდან ყველაფერი.", duration: "45 წუთი", cost: "12€" },
      { time: "15:00", type: "sight", title: "წმ. პეტრეს ბაზილიკა", location: "Piazza San Pietro", description: "Michelangelo-ს გუმბათი, Bernini-ს სვეტები, Pietà. მსოფლიოს უდიდესი ეკლესია.", duration: "2 საათი", cost: "უფასო (გუმბათი 8€)" },
      { time: "18:00", type: "sight", title: "Castel Sant'Angelo", location: "Lungotevere Castello 50", description: "123 წ.ე. იმპერატორ Hadrian-ის მავზოლეუმი, შემდეგ პაპის ციხესიმაგრე. ტევერეს ხედი.", duration: "1.5 საათი", cost: "14€" },
      { time: "20:30", type: "food", title: "ვახშამი Prati-ში", location: "Ristorante Il Sorpasso", description: "ვატიკანის სამეზობლო. Coda alla vaccinara, არტიშოკი alla Romana, tiramisu.", duration: "2 საათი", cost: "45€" },
    ],
    [
      { time: "09:00", type: "sight", title: "ბორგეზეს გალერეა", location: "Piazzale Scipione Borghese 5", description: "Bernini, Caravaggio, Raphael — პრივატულ ვილაში. 2 საათი მხოლოდ — ბილეთი წინასწარ.", duration: "2 საათი", cost: "13€", tip: "სავალდებულო ჯავshა — 1 კვირით ადრე, 2-საათიანი სლოტი" },
      { time: "11:30", type: "leisure", title: "Villa Borghese ბაღი", location: "Borghese Gardens, Roma", description: "რომის Central Park. ნავი ტბაზე, ველოსიპედი, Pincian Hill — ქალაქის პანორამა.", duration: "1.5 საათი", cost: "5€ (ნავი)" },
      { time: "13:30", type: "food", title: "ლანჩი Roscioli-ში", location: "Via dei Giubbonari 21", description: "ბაკალია + ოსტერია ერთად. Burrata, Guanciale, pasta all'amatriciana — ინგრედიენტები სახლში.", duration: "1.5 საათი", cost: "35€" },
      { time: "15:30", type: "sight", title: "ავენტინის ბორცვი", location: "Giardino degli Aranci", description: "ფორთოხლის ბაღი — რომის საუკეთესო პანორამა. Knights of Malta-ს ჭვრეტი სწ. პეტრეს გუმბათზე.", duration: "1 საათი", cost: "უფასო", tip: "Piazza dei Cavalieri di Malta-ს გასაღები დახურულ კარს — კარის ხვრელი" },
      { time: "17:30", type: "sight", title: "ჭეშმარიტების პირი", location: "Basilica di Santa Maria in Cosmedin", description: "I საუკ. კომის ფარდული, Bocca della Verità — ტყუილებმდე ხელი", duration: "30 წუთი", cost: "2€" },
      { time: "19:00", type: "food", title: "Aperitivo Testaccio-ში", location: "Piazza di Testaccio", description: "რომის Aperol spritz ტრადიცია + ადგილობრივი snacks. ყველაზე ლოკალური სამეზობლო.", duration: "1 საათი", cost: "15€" },
      { time: "20:30", type: "food", title: "ვახშამი Settimio all'Arancio", location: "Via dell'Arancio 50", description: "1940-ებიდან. Carciofi alla giudia, abbacchio, panna cotta — კლასიკური რომი.", duration: "2 საათი", cost: "50€" },
    ],
  ],

  dubai: [
    [
      { time: "08:00", type: "food", title: "საუზმე Burj Al Arab-ში", location: "Jumeirah Beach Road", description: "7-ვარსკვლავიანი სასტუმრო, breakfast with sea view. Mezze, fresh juices, ოქრო-ქვეშ ყავა.", duration: "1.5 საათი", cost: "120 AED", tip: "Dress code — არ შეხვიდე შორტებში" },
      { time: "10:00", type: "sight", title: "Burj Khalifa", location: "Downtown Dubai", description: "828 მ — მსოფლიოს ყველაზე მაღალი შენობა. 124-ე სართული At the Top — 360° ხედი.", duration: "2 საათი", cost: "149 AED", tip: "Sunset Ticket 50%-ით ძვირია მაგრამ ამირჩიე — ხედი შეუდარებელია" },
      { time: "12:30", type: "sight", title: "Dubai Mall", location: "Financial Centre Road", description: "მსოფლიოს უდიდესი სავაჭრო ცენტრი. Aquarium, Ice Rink, ვირტუალური სამყარო.", duration: "2 საათი", cost: "50 AED (aquarium)" },
      { time: "15:00", type: "food", title: "სადილი Nobu Dubai", location: "Atlantis, The Palm", description: "Nobu Matsuhisa-ს ფლაგმანი. Black cod miso, yellowtail jalapeño — Dubai-ს პრემიუმ სამზარეულო.", duration: "2 საათი", cost: "400 AED" },
      { time: "18:00", type: "sight", title: "Dubai Fountain Show", location: "Burj Khalifa Lake", description: "მსოფლიოს უდიდესი შადრევანი — 900 მ წყლის ბალეტი Umm Kulthum-ის მუსიკაზე.", duration: "30 წუთი", cost: "უფასო" },
      { time: "20:00", type: "leisure", title: "Desert Safari", location: "Dubai Desert Conservation Reserve", description: "Dune bashing, camel ride, belly dance, BBQ ვახშამი ვარსკვლავების ქვეშ.", duration: "6 საათი", cost: "350 AED", tip: "სტანდარტული ტური — VIP ჯამი ცალკე ჯდება, ღირს" },
    ],
    [
      { time: "07:30", type: "sight", title: "Dubai Creek & Old Souks", location: "Al Fahidi Historical Neighbourhood", description: "ძველი Dubai-ი. Abra ნავი (1 AED), Gold Souk — 10 ტონა ოქრო, Spice Souk — სუნელები.", duration: "2.5 საათი", cost: "5 AED" },
      { time: "10:30", type: "sight", title: "Dubai Frame", location: "Zabeel Park", description: "150 მ სიმაღლის ოქროს 'ჩარჩო' — ერთი ფანჯარა ძველ და ახალ Dubai-ზე.", duration: "1.5 საათი", cost: "50 AED" },
      { time: "13:00", type: "food", title: "ლანჩი Al Fanar-ში", location: "Festival City Mall", description: "ტრადიციული ემირატული სამზარეულო — Machboos, Harees, Luqaimat. ოჯახური ატმოსფერო.", duration: "1.5 საათი", cost: "120 AED" },
      { time: "15:30", type: "leisure", title: "Ski Dubai", location: "Mall of the Emirates", description: "თოვლი +50°C-ის გარეთ. სრული თოვლის სამყარო, -4°C. პინგვინები. სახლის გატეხვა.", duration: "2 საათი", cost: "180 AED" },
      { time: "19:00", type: "sight", title: "Palm Jumeirah Monorail", description: "Palm-ის მონორელი + Palm-ის ხეობა. Atlantis-ი, ვილები, Marina-ს ხედი.", location: "Palm Jumeirah Monorail Station", duration: "1 საათი", cost: "25 AED" },
      { time: "21:00", type: "food", title: "ვახშამი Pierchic-ში", location: "Al Qasr Hotel, Madinat Jumeirah", description: "ზღვაში შეწეული პიერი — Burj Al Arab-ის ხედი. ტუნა tartare, lobster.", duration: "2.5 საათი", cost: "350 AED" },
    ],
    [
      { time: "08:00", type: "leisure", title: "Sunrise Yacht Tour", location: "Dubai Marina", description: "4-საათიანი ყიჟინა. Palm Jumeirah, Burj Al Arab, Atlantis — ზღვიდან. საუზმე გემზე.", duration: "4 საათი", cost: "500 AED" },
      { time: "13:00", type: "food", title: "ლანჩი Zuma Dubai", location: "Gate Village, DIFC", description: "Robata grill, Japanese izakaya. ერთ-ერთი Dubai-ს Top-5 რესტორანი.", duration: "1.5 საათი", cost: "300 AED" },
      { time: "15:30", type: "sight", title: "Dubai Design District (d3)", location: "Al Meydan Road", description: "ხელოვნება, გალერეები, სტრიტ-არტი. Creative hub — Dubai-ს Soho.", duration: "1.5 საათი", cost: "უფასო" },
      { time: "18:00", type: "sight", title: "Global Village", location: "Sheikh Mohammed Bin Zayed Road", description: "90+ ქვეყნის პავილიონი — კულტურა, სამზარეულო, ხელოვნება ერთ ადგილზე (სეზონი: Oct-Apr).", duration: "2.5 საათი", cost: "20 AED" },
      { time: "21:00", type: "food", title: "ვახშამი Nusr-Et Steakhouse", location: "Four Seasons Resort DIFC", description: "Salt Bae-ს ფლაგმანი. Ottomanelli wagyu ribeye, gold-leaf steak. Instagram-ის სამოთხე.", duration: "2.5 საათი", cost: "600 AED" },
    ],
  ],

  tbilisi: [
    [
      { time: "08:00", type: "food", title: "საუზმე ძველ თბილისში", location: "ფაბრიკა, ბოჭორმის 8", description: "სახელოვანი ყოფილი სეხსნაწარმოები — ყვავილოვანი ეზო, hipster კაფეები. ჰაჩაპური, ნადუღი, მჭადი.", duration: "1 საათი", cost: "15₾" },
      { time: "09:30", type: "sight", title: "ნარიყალას ციხე", location: "ნარიყალა, მეტეხის ქ.", description: "IV საუკ. ციხე-სიმაგრე. ქალაქის პანორამა — კურა, მთაწმინდა, ძველი თბილისი 360°.", duration: "1.5 საათი", cost: "3₾ (საბაგირო)" },
      { time: "11:30", type: "sight", title: "აბანოთუბანი", location: "გოგებაშვილის ქ.", description: "გოგირდოვანი აბანოების კვარტალი. გუმბათიანი ბანყები, ქაშვეთი, ილიას გარდენი.", duration: "1 საათი", cost: "20-50₾ (ბანება)" },
      { time: "13:30", type: "food", title: "სადილი ჭოღავ-ბჭე", location: "ჭოღავ-ბჭე, ორბელიანის ქ. 1", description: "ქინძმარაული, ჭკმერული, ხინკალი, ჩვილი ბატი. ქართული კლასიკა ორბელიანის მოედანზე.", duration: "2 საათი", cost: "45₾" },
      { time: "16:00", type: "sight", title: "შარდენის ქუჩა", location: "შარდენი, ძველი თბილისი", description: "თბილისის ყველაზე ევროპული ქუჩა. ბარები, გალერეები, ხელნაკეთობები. 'სევბარი' ლუდით.", duration: "1.5 საათი", cost: "20₾" },
      { time: "18:00", type: "sight", title: "მეტეხის ეკლესია", location: "მეტეხი, ავლაბარი", description: "V საუკ. ეკლესია კლდის კიდეზე. ვახტანგ გორგასლის ძეგლი. კურის ხედი მზის ჩასვლისას.", duration: "45 წუთი", cost: "უფასო" },
      { time: "20:00", type: "food", title: "ვახშამი Barbarestan-ში", location: "დავით აღმაშენებლის 132", description: "XIX საუკ. სამზარეულო. ბარბარე ჯორჯაძის ქართველი კულინარიის წიგნიდან — ორიგინალი რეცეპტები.", duration: "2.5 საათი", cost: "80₾", tip: "1-2 კვირით ადრე დაჯავshა — ყოველთვის სავსეა" },
    ],
    [
      { time: "09:00", type: "sight", title: "ეროვნული მუზეუმი", location: "რუსთაველის 3", description: "ოქრის ფონდი — კოლხური ოქრო, ჯვარი, ვახტანგ გორგასლი. ქართული სულის განძი.", duration: "2 საათი", cost: "10₾" },
      { time: "11:30", type: "sight", title: "სიონის ტაძარი", location: "სიონის ქ. 3", description: "V საუკ. ტაძარი — წმ. ნინოს ჯვარი, ქართული სიწმინდე. კათოლიკოსის სასახლე.", duration: "45 წუთი", cost: "უფასო" },
      { time: "13:00", type: "food", title: "ლანჩი Samikitno-ში", location: "რუსთაველი 18", description: "ქართული ტრადიციული სამზარეულო. ოჯახური. ლობიანი, ბადრიჯნები, სხვადასხვა ხაჭაპური.", duration: "1.5 საათი", cost: "35₾" },
      { time: "15:00", type: "transport", title: "მეტრო → ვარკეთილი", location: "თავისუფლების მოედნის მეტრო", description: "თბილისის მეტრო — 50 კოპ. + ბარათი 2₾. ყველაზე სწრაფი გადაადგილება.", duration: "20 წუთი", cost: "2₾" },
      { time: "15:30", type: "sight", title: "ღია ჰაერის მუზეუმი", location: "გარეთ-უბანი", description: "ეთნოგრაფიული მუზეუმი. ქართული სახლები, ეკლესიები, ხიდები ყველა კუთხიდან.", duration: "2 საათი", cost: "5₾" },
      { time: "18:30", type: "leisure", title: "ბოტანიკური ბაღი", location: "ბოტანიკური ქ. 1", description: "ნარიყალას ქვეშ. ჩანჩქერი, ხეობა, ზამთარ-ზაფხულ. ერთ-ერთი ყველაზე მშვიდი ადგილი.", duration: "1.5 საათი", cost: "2₾" },
      { time: "20:30", type: "food", title: "ვახშამი Azarphesha-ში", location: "ერეკლე II-ის 2", description: "ქართულ-სპარსული სამზარეულო. pomegranate sauce, walnut dishes, ბროწეულის ლუდი.", duration: "2 საათი", cost: "55₾" },
    ],
    [
      { time: "09:00", type: "leisure", title: "მთაწმინდა", location: "მთაწმინდის პარკი", description: "ფუნიკულიორით 3 წუთი. პანთეონი — გრიბოედოვი, ილია ჭავჭავაძე, გურამ რჩეულიშვილი.", duration: "2 საათი", cost: "5₾ (ფუნიკ.)" },
      { time: "11:30", type: "food", title: "ყავა Entree-ში", location: "კოტე მარჯანიშვილი 8", description: "თბილისის ყველაზე კარგი third-wave specialty კაფე. Ethiopian single origin, tulip latte art.", duration: "45 წუთი", cost: "12₾" },
      { time: "12:30", type: "sight", title: "მარჯანიშვილის მოედანი", location: "მარჯანიშვილი", description: "ბელვუ, ხიდი, Zurab Tsereteli-ს ქანდაკება. ადგილობრივი ქართველების ბულვარი.", duration: "1 საათი", cost: "უფასო" },
      { time: "14:00", type: "food", title: "ხინკლის ოსტატი", location: "დუშეთი, ან Wine House Tbilisi", description: "ხინკალი — 10 ცალი, ბარამ, მდნარი ყველი. ქართული ეთიკეტი: კბენ ქვედა ნაწილში, სვამენ წვენს.", duration: "1.5 საათი", cost: "20₾", tip: "ხინკალი ხელით იჭამება — ჩანგლით მხოლოდ უცხოელები ჭამენ" },
      { time: "16:00", type: "leisure", title: "ეზოები და ბალკონები", location: "კლდისუბანი", description: "ძველი თბილისის ოდეიერი ეზოები, ფერადი ბალკონები, ვაზი, ქვა. ფოტო-სეირნობა.", duration: "2 საათი", cost: "უფასო" },
      { time: "19:00", type: "leisure", title: "ღვინის სახლი", location: "G.Wine, მელიქ-ქართველოვი 2", description: "100+ ქართული ღვინო — ქვევრი, ახალი. ადგილობრივი სომელიე. Wine tasting + cheese.", duration: "2 საათი", cost: "60₾" },
      { time: "21:30", type: "food", title: "ვახშამი Cafe Littera-ში", location: "მაჩაბელი 13 (Writers' House)", description: "მწერალთა სახლი. ქართული seasonal menu, ეზოში ვახshami. ყველაზე romantic spot.", duration: "2 საათი", cost: "90₾" },
    ],
  ],

  cappadocia: [
    [
      { time: "04:45", type: "leisure", title: "ჰაერ-ბუშტი", location: "Göreme National Park", description: "Sunrise hot air balloon — 60-90 წუთი მოფრენა კარადოკიის ქვემეხებზე. 20+ ბუშტი ერთდროულად.", duration: "3 საათი", cost: "€180-220", tip: "ადრე დაჯავshა — პოპულარული პერიოდი ყოველდღე სავსეა" },
      { time: "08:30", type: "food", title: "Turkish Breakfast", location: "Topdeck Cave Restaurant, Göreme", description: "სრული თურქული საუზმე — 30+ სახეობა. Menemen, börek, bal-kaymak, çay. გამოქვაბულ რესტორანში.", duration: "1.5 საათი", cost: "€15" },
      { time: "10:30", type: "sight", title: "Göreme ღია მუზეუმი", location: "Göreme National Park", description: "VI-XI სს. კლდეში გამოჭრილი ეკლესიები. Dark Church — Byzantine frescoes, Apple Church.", duration: "2 საათი", cost: "€9" },
      { time: "13:30", type: "food", title: "ლანჩი Dibek Bahçesi", location: "Güzelyurt Village", description: "ტრადიციული კაპადოქიური სამზარეულო. Testi kebab — ჭიქაში გამომცხვარი, ფახრულ-ყელში.", duration: "1.5 საათი", cost: "€20" },
      { time: "15:30", type: "sight", title: "Love Valley", location: "Göreme Panorama Hill", description: "ფალოსებრი კლდე-სვეტები, 40 მ სიმაღლე. Panorama point — ბუშტები ჰაერზე ჩანს.", duration: "2 საათი", cost: "უფასო" },
      { time: "18:30", type: "leisure", title: "Sunset at Uçhisar Castle", location: "Uçhisar, Nevşehir", description: "კაპადოქიის ყველაზე მაღალი წერტილი. Sunset — ვარდისფერი-ნარინჯისფერი ლანდშაფტი.", duration: "1.5 საათი", cost: "€3" },
      { time: "21:00", type: "food", title: "ვახshami Seki Restaurant", location: "Museum Hotel, Uçhisar", description: "Fine dining cave restaurant. Lamb tandir, trüffel risotto, Turkish dessert spread.", duration: "2.5 საათი", cost: "€65" },
    ],
    [
      { time: "08:00", type: "food", title: "Cave Hotel Breakfast", location: "Local Cave Hotel", description: "კლდეში გამოჭრილ სასტუმროში საუზმე. Tahini, pomegranate molasses, ბოლოკები, ფეტა.", duration: "1 საათი", cost: "შეყვანილია" },
      { time: "09:30", type: "sight", title: "Derinkuyu Underground City", location: "Derinkuyu, Nevşehir", description: "VIII სს. 85 მ სიღრმის მიწისქვეშა ქალაქი. 20,000 ადამიანი ცხოვრობდა. 18 სართული.", duration: "2 საათი", cost: "€9" },
      { time: "12:00", type: "food", title: "ლანჩი Avanos-ში", location: "Avanos, Nevşehir", description: "Kızılırmak მდინარის ნაპირა. Pottery village — Testi kebab ჭიქაში. წითელი ღვინო.", duration: "1.5 საათი", cost: "€18" },
      { time: "14:00", type: "leisure", title: "Avanos Pottery Class", location: "Chez Galip, Avanos", description: "ლაგამბურის ჭურჭელი — 4000 წ. ტრადიცია. მაღაზია + Master-class, სახლში ჩაიქვა.", duration: "2 საათი", cost: "€25" },
      { time: "17:00", type: "sight", title: "Pasabag (Monks Valley)", location: "Zelve Road, Cappadocia", description: "Double и triple-headed fairy chimneys. ბერმონაზვნების ჭვრეტი. Mushroom rocks.", duration: "1.5 საათი", cost: "€5" },
      { time: "20:00", type: "food", title: "ვახshami Ziggy's Cafe", location: "Göreme Town Center", description: "Rooftop with valley view. Meze, lamb, local wine, apricot dessert. Balloon view at sunset.", duration: "2 საათი", cost: "€30" },
    ],
  ],

  bali: [
    [
      { time: "07:00", type: "leisure", title: "Sunrise Yoga", location: "Campuhan Ridge Walk, Ubud", description: "Sunrise-ს ხედი Rice Terraces-ზე. 9 კმ ბილიკი — ბალის ყველაზე სულიერი სვლა.", duration: "2 საათი", cost: "უფასო" },
      { time: "09:30", type: "food", title: "საუზმე Locavore NXT", location: "Jalan Dewi Sita, Ubud", description: "Farm-to-table — ბალური produktები. Avocado toast, dragon fruit bowl, kopi luwak.", duration: "1 საათი", cost: "IDR 120,000" },
      { time: "11:00", type: "sight", title: "Monkey Forest", location: "Jalan Monkey Forest, Ubud", description: "Sacred Monkey Forest Sanctuary — 700+ მაკაკი. 3 ძველი ტაძარი XIV საუკ. ტყეში.", duration: "1.5 საათი", cost: "IDR 80,000", tip: "ჩანთა გამოიღე — მაიმუნები ქურდები არიან" },
      { time: "13:30", type: "food", title: "სადილი Naughty Nuri's", location: "Jalan Raya Sanggingan", description: "ბალის Pork Ribs — ლეგენდა. BBQ ribs + margarita + nasi goreng. ყოველი გამვლელი ჩერდება.", duration: "1.5 საათი", cost: "IDR 150,000" },
      { time: "15:30", type: "sight", title: "Tegallalang Rice Terraces", location: "Tegallalang, Gianyar", description: "ბალის კულტურის სიმბოლო. Subak სარწყავი სისტემა — UNESCO. Swing over the terraces.", duration: "2 საათი", cost: "IDR 50,000" },
      { time: "18:30", type: "sight", title: "Tanah Lot Sunset", location: "Beraban, Tabanan", description: "ზღვის კლდეზე XVI სს. ტაძარი. Sunset — ბალის ყველაზე ფოტოგრაფირებული მომენტი.", duration: "2 საათი", cost: "IDR 75,000", tip: "1 საათით ადრე მოდი — parking nightmare sunset-ზე" },
      { time: "21:00", type: "food", title: "ვახshami Locavore", location: "Jalan Dewi Sita 21, Ubud", description: "Asia-ს Top 50 Restaurants. Tasting menu — 8 კერძი ბალური ინგრედიენტებით.", duration: "3 საათი", cost: "IDR 700,000", tip: "3+ თვით ადრე დაჯავshა — Asia-ს ლეგენდა" },
    ],
    [
      { time: "06:00", type: "leisure", title: "Mount Batur Sunrise Trek", location: "Kintamani, Bangli", description: "1717 მ ვულკანი. 2-საათიანი ღამის ლაშქრობა — Sunrise summit-ზე. კრატერის ხედი.", duration: "6 საათი", cost: "IDR 350,000", tip: "Guide სავალდებულოა — 04:00 start" },
      { time: "13:00", type: "food", title: "ლანჩი Warung Babi Guling", location: "Ubud Market Area", description: "Suckling Pig — ბალის ეროვნული კერძი. Crispy skin, yellow rice, lawar. Local warung.", duration: "1 საათი", cost: "IDR 50,000" },
      { time: "15:00", type: "leisure", title: "Tirta Empul Temple", location: "Tampaksiring, Gianyar", description: "IX სს. წმინდა წყაროს ტაძარი. Purification ritual — 30 fountain pool. სულის განახლება.", duration: "2 საათი", cost: "IDR 50,000", tip: "სარონგი 5,000 IDR-ად ქირაობ შესასვლელთან" },
      { time: "18:00", type: "leisure", title: "Traditional Kecak Dance", location: "Uluwatu Temple, Badung", description: "კლდეზე მაჩვენებელი. Sunset Kecak Fire Dance — Ramayana ეპოსი. 100+ მამაკაცი.", duration: "2 საათი", cost: "IDR 150,000" },
      { time: "21:00", type: "food", title: "ვახshami Rock Bar Bali", location: "Ayana Resort, Jimbaran", description: "კლდეზე 14 მ ოკეანის თავზე. Ahi tuna, lobster, ocean view. Sunset cocktails.", duration: "2.5 საათი", cost: "IDR 400,000" },
    ],
    [
      { time: "08:00", type: "leisure", title: "Private Villa Pool Morning", location: "Your Villa, Seminyak", description: "Private pool, tropical breakfast, frangipani petals. ბალის ლუქსი — villa life.", duration: "2 საათი", cost: "შეყვანილია" },
      { time: "10:30", type: "leisure", title: "Spa at COMO Shambhala", location: "Banjar Begawan, Ubud", description: "Asia-ს No.1 Spa. Balinese massage, flower bath, chakra healing.", duration: "3 საათი", cost: "IDR 800,000" },
      { time: "14:30", type: "food", title: "ლანჩი Mozaic Restaurant", location: "Jalan Raya Sanggingan, Ubud", description: "Chris Salans-ის Fine Dining. French-Indonesian fusion. Tasting menu 6 courses.", duration: "2 საათი", cost: "IDR 600,000" },
      { time: "17:30", type: "sight", title: "Seminyak Beach & Sunset", location: "Seminyak, Badung", description: "Double-Six Beach — surfing, sand bars, Potato Head Beach Club sunset.", duration: "2 საათი", cost: "IDR 100,000 (sunbed)" },
      { time: "20:30", type: "food", title: "Farewell Dinner La Lucciola", location: "Jalan Petitenget, Seminyak", description: "Beachfront Italian — ოკეანის ტალღები ფეხქვეშ. Linguine vongole, Branzino, tiramisu.", duration: "2.5 საათი", cost: "IDR 450,000" },
    ],
  ],

  default: [
    [
      { time: "08:30", type: "food", title: "დილის საუზმე", location: "ადგილობრივი კაფე", description: "ადგილობრივი სამზარეულო — ფოლადი ყავა, ახალი პური, ხილი.", duration: "1 საათი", cost: "₾15-20" },
      { time: "10:00", type: "sight", title: "მთავარი ღირსშესანიშნაობა", location: "ქალაქის ცენტრი", description: "ქალაქის ყველაზე ცნობილი ადგილი — ისტორია, არქიტექტურა, კულტურა.", duration: "2 საათი", cost: "₾10-20" },
      { time: "13:00", type: "food", title: "ლანჩი", location: "ადგილობრივი რესტორანი", description: "ტრადიციული ეროვნული სამზარეულო.", duration: "1.5 საათი", cost: "₾25-40" },
      { time: "15:30", type: "sight", title: "მუზეუმი ან გალერეა", location: "ქალაქის ისტ. ცენტრი", description: "კულტურული ისტორიის კოლექცია.", duration: "2 საათი", cost: "₾8-15" },
      { time: "18:30", type: "leisure", title: "სეირნობა ქალაქში", location: "ისტორიული ქუჩები", description: "ადგილობრივი ატმოსფერო, ბაზარი, ბოლოკები.", duration: "1.5 საათი", cost: "უფასო" },
      { time: "20:30", type: "food", title: "ვახshami", location: "ძირითადი სასადილო", description: "ვახshami ადგილობრივ პრემიუმ რესტორანში.", duration: "2 საათი", cost: "₾50-80" },
    ],
  ],
};

const weatherOptions = ["☀️", "🌤", "🌥", "🌦", "🌈"];

function getDestinationKey(dest: string): DestinationKey {
  const d = dest.toLowerCase();
  if (d.includes("paris") || d.includes("პარიზ")) return "paris";
  if (d.includes("rome") || d.includes("roma") || d.includes("რომ")) return "rome";
  if (d.includes("dubai") || d.includes("დუბა")) return "dubai";
  if (d.includes("tbilisi") || d.includes("თბილის")) return "tbilisi";
  if (d.includes("cappadoc") || d.includes("კაპადო")) return "cappadocia";
  if (d.includes("bali") || d.includes("ბალი")) return "bali";
  return "default";
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("ka-GE", { day: "numeric", month: "short" });
}

function buildItinerary(form: FormData, dayTitles: string[], arrival: string, departure: string): ItineraryDay[] {
  const start = new Date(form.startDate);
  const end = new Date(form.endDate);
  const diffTime = end.getTime() - start.getTime();
  const tripDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1);
  const totalBudget = Number(form.budget) || 0;
  const dailyBudget = totalBudget > 0 ? Math.round(totalBudget / tripDays) : 0;

  const key = getDestinationKey(form.destination);
  const pool = destinationAttractions[key];

  return Array.from({ length: tripDays }, (_, i) => {
    const dayDate = new Date(start);
    dayDate.setDate(start.getDate() + i);
    const dayPlan = pool[i % pool.length];
    return {
      day: i + 1,
      date: formatDate(dayDate.toISOString().split("T")[0]),
      title: i === 0 ? arrival : i === tripDays - 1 ? departure : dayTitles[i % dayTitles.length],
      weather: weatherOptions[i % weatherOptions.length],
      totalDayBudget: dailyBudget,
      timeline: dayPlan,
    };
  });
}

const typeConfigBase = {
  food: { icon: Utensils, bg: "bg-amber-500/10", text: "text-amber-500" },
  sight: { icon: Camera, bg: "bg-blue-500/10", text: "text-blue-500" },
  transport: { icon: Car, bg: "bg-purple-500/10", text: "text-purple-500" },
  leisure: { icon: Coffee, bg: "bg-teal-500/10", text: "text-teal-500" },
};

export default function PlannerForm() {
  const { t } = useLanguage();
  const pl = t.planner;

  const typeConfig = {
    food: { ...typeConfigBase.food, label: pl.typeLabels.food },
    sight: { ...typeConfigBase.sight, label: pl.typeLabels.sight },
    transport: { ...typeConfigBase.transport, label: pl.typeLabels.transport },
    leisure: { ...typeConfigBase.leisure, label: pl.typeLabels.leisure },
  };

  const travelStyles = pl.styles;

  const [form, setForm] = useState<FormData>({
    destination: "", startDate: "", endDate: "", budget: "", travelers: "2", style: "luxury",
  });
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [activeDay, setActiveDay] = useState(0);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const tripDays = itinerary.length;
  const totalBudget = Number(form.budget) || 0;
  const currentDay = itinerary[activeDay];

  const handleGenerate = async () => {
    if (!form.destination) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2200));
    const days = buildItinerary(form, pl.dayTitles, pl.dayArrival, pl.dayDeparture);
    setItinerary(days);
    setActiveDay(0);
    setExpandedItems(new Set());
    setLoading(false);
  };

  const toggleItem = (idx: number) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="space-y-8">
      {/* ── Form Card ── */}
      <div className="rounded-3xl dark:bg-[#0d1117]/80 bg-white border dark:border-white/5 border-slate-200/80 shadow-xl p-6 sm:p-8 backdrop-blur-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold dark:text-slate-300 text-slate-700 mb-2">{pl.destinationLabel}</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })}
                placeholder={pl.destinationPlaceholder}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl dark:bg-white/5 bg-slate-50 dark:border-white/10 border border-slate-200 dark:text-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold dark:text-slate-300 text-slate-700 mb-2">{pl.startDateLabel}</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl dark:bg-white/5 bg-slate-50 dark:border-white/10 border border-slate-200 dark:text-white text-slate-900 focus:ring-2 focus:ring-blue-500/50 transition-all text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold dark:text-slate-300 text-slate-700 mb-2">{pl.endDateLabel}</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl dark:bg-white/5 bg-slate-50 dark:border-white/10 border border-slate-200 dark:text-white text-slate-900 focus:ring-2 focus:ring-blue-500/50 transition-all text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold dark:text-slate-300 text-slate-700 mb-2">{pl.budgetLabel}</label>
            <div className="relative">
              <Banknote className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="number" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}
                placeholder={pl.budgetPlaceholder}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl dark:bg-white/5 bg-slate-50 dark:border-white/10 border border-slate-200 dark:text-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/50 transition-all text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold dark:text-slate-300 text-slate-700 mb-2">{pl.travelersLabel}</label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select value={form.travelers} onChange={(e) => setForm({ ...form, travelers: e.target.value })}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl dark:bg-[#0d1117] bg-slate-50 dark:border-white/10 border border-slate-200 dark:text-white text-slate-900 focus:ring-2 focus:ring-blue-500/50 transition-all text-sm appearance-none">
                {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {pl.travelersUnit}</option>)}
              </select>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold dark:text-slate-300 text-slate-700 mb-3">{pl.styleLabel}</label>
            <div className="flex flex-wrap gap-2.5">
              {travelStyles.map((style) => (
                <button key={style.value} type="button" onClick={() => setForm({ ...form, style: style.value })}
                  className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 border ${form.style === style.value ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20" : "dark:bg-white/5 bg-slate-100 dark:text-slate-300 text-slate-600 dark:border-white/10 border-slate-200 dark:hover:bg-white/10 hover:bg-slate-200"}`}>
                  {style.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button onClick={handleGenerate} disabled={loading || !form.destination}
          className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold text-base hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-3">
          {loading ? (
            <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />{pl.generatingBtn}</>
          ) : (
            <><Sparkles className="w-5 h-5" />{pl.generateBtn}</>
          )}
        </button>
      </div>

      {/* ── Generated Itinerary ── */}
      <AnimatePresence>
        {itinerary.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center flex-shrink-0">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold dark:text-white text-slate-900">{form.destination} — {pl.resultsTitle}</h3>
                <p className="text-sm dark:text-slate-400 text-slate-500">{tripDays}-{pl.resultsSub} · {travelStyles.find(s => s.value === form.style)?.label}</p>
              </div>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: pl.totalBudget, value: totalBudget > 0 ? `${totalBudget}₾` : "—", icon: Banknote },
                { label: pl.dailyBudget, value: currentDay?.totalDayBudget > 0 ? `${currentDay.totalDayBudget}₾` : "—", icon: Clock },
                { label: pl.travelers, value: `${form.travelers}`, icon: Users },
                { label: pl.totalDays, value: `${tripDays}`, icon: Calendar },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-2xl dark:bg-white/5 bg-slate-50 dark:border-white/5 border border-slate-200/80 text-center">
                  <stat.icon className="w-4 h-4 text-blue-500 mx-auto mb-1.5" />
                  <div className="text-base font-bold dark:text-white text-slate-900">{stat.value}</div>
                  <div className="text-xs dark:text-slate-400 text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Day tabs */}
            <div className="overflow-x-auto pb-2 mb-5 -mx-1 px-1">
              <div className="flex gap-2 w-max sm:w-auto sm:flex-wrap">
                {itinerary.map((day, i) => (
                  <button key={day.day} type="button" onClick={() => { setActiveDay(i); setExpandedItems(new Set()); }}
                    className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${activeDay === i ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "dark:bg-white/5 bg-slate-100 dark:text-slate-300 text-slate-600 dark:hover:bg-white/10 hover:bg-slate-200"}`}>
                    {pl.dayLabel} {day.day}
                    {day.date && <span className={`ml-1.5 text-xs ${activeDay === i ? "text-white/70" : "dark:text-slate-500 text-slate-400"}`}>{day.date}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Active day detail */}
            <AnimatePresence mode="wait">
              {currentDay && (
                <motion.div key={activeDay} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
                  className="rounded-3xl dark:bg-[#0d1117]/80 bg-white border dark:border-white/5 border-slate-200/80 shadow-xl overflow-hidden">

                  {/* Card header */}
                  <div className="p-5 sm:p-6 border-b dark:border-white/5 border-slate-100">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="text-xs font-semibold dark:text-slate-500 text-slate-400 uppercase tracking-wide mb-1">
                          {pl.dayLabel} {currentDay.day}{currentDay.date ? ` · ${currentDay.date}` : ""}
                        </div>
                        <h4 className="text-base sm:text-lg font-bold dark:text-white text-slate-900 leading-snug">{currentDay.title}</h4>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        {currentDay.totalDayBudget > 0 && (
                          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-bold">~{currentDay.totalDayBudget}₾</span>
                        )}
                        <span className="text-base">{currentDay.weather}</span>
                      </div>
                    </div>
                    {/* Legend */}
                    <div className="flex flex-wrap gap-3">
                      {Object.entries(typeConfig).map(([k, v]) => (
                        <span key={k} className="flex items-center gap-1.5 text-xs dark:text-slate-400 text-slate-500">
                          <span className={`w-5 h-5 rounded-lg ${v.bg} flex items-center justify-center`}>
                            <v.icon className={`w-3 h-3 ${v.text}`} />
                          </span>
                          {v.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="p-5 sm:p-6">
                    <div className="relative">
                      {/* Vertical line */}
                      <div className="absolute left-[18px] top-0 bottom-0 w-px dark:bg-white/5 bg-slate-200" />

                      <div className="space-y-2">
                        {currentDay.timeline.map((item, idx) => {
                          const cfg = typeConfig[item.type];
                          const Icon = cfg.icon;
                          const isExpanded = expandedItems.has(idx);
                          const isLast = idx === currentDay.timeline.length - 1;

                          return (
                            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.06, duration: 0.3 }}>
                              <button type="button" onClick={() => toggleItem(idx)} className="w-full text-left">
                                <div className={`flex items-start gap-3 p-3 rounded-2xl transition-all duration-200 ${isExpanded ? "dark:bg-white/5 bg-slate-50" : "hover:dark:bg-white/3 hover:bg-slate-50/50"}`}>
                                  {/* Icon dot */}
                                  <div className={`relative z-10 w-9 h-9 rounded-xl ${cfg.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                    <Icon className={`w-4 h-4 ${cfg.text}`} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                      <div className="min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                          <span className="text-xs font-bold dark:text-slate-400 text-slate-400 tabular-nums">{item.time}</span>
                                          <span className="text-sm font-semibold dark:text-white text-slate-900 truncate">{item.title}</span>
                                        </div>
                                        <div className="flex items-center gap-1 mt-0.5">
                                          <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                                          <span className="text-xs dark:text-slate-500 text-slate-400 truncate">{item.location}</span>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2 flex-shrink-0">
                                        <span className="text-xs font-semibold dark:text-teal-400 text-teal-600">{item.cost}</span>
                                        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                                      </div>
                                    </div>

                                    <AnimatePresence>
                                      {isExpanded && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                                          <div className="pt-3 space-y-2.5">
                                            <p className="text-sm dark:text-slate-300 text-slate-600 leading-relaxed">{item.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg dark:bg-white/5 bg-slate-100 text-xs dark:text-slate-300 text-slate-600">
                                                <Clock className="w-3 h-3" />{item.duration}
                                              </span>
                                              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg dark:bg-teal-500/10 bg-teal-50 text-xs dark:text-teal-400 text-teal-700 font-semibold">
                                                <Banknote className="w-3 h-3" />{item.cost}
                                              </span>
                                              {item.type === "transport" && (
                                                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg dark:bg-purple-500/10 bg-purple-50 text-xs dark:text-purple-400 text-purple-700">
                                                  <Train className="w-3 h-3" />{pl.typeLabels.transport}
                                                </span>
                                              )}
                                            </div>
                                            {item.tip && (
                                              <div className="flex items-start gap-2 p-2.5 rounded-xl dark:bg-amber-500/5 bg-amber-50 border dark:border-amber-500/10 border-amber-200/50">
                                                <Wind className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-xs dark:text-amber-400/80 text-amber-700">{item.tip}</span>
                                              </div>
                                            )}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </div>
                              </button>

                              {/* Connector arrow */}
                              {!isLast && (
                                <div className="flex items-center gap-3 py-0.5 pl-3">
                                  <div className="w-9 flex justify-center flex-shrink-0">
                                    <ArrowRight className="w-3 h-3 text-slate-300 rotate-90" />
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Map preview card */}
                    <div className="mt-5 p-4 rounded-2xl dark:bg-white/3 bg-slate-50 border dark:border-white/5 border-slate-200/60 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <CloudSun className="w-5 h-5 text-blue-500" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold dark:text-slate-400 text-slate-500 mb-0.5">{pl.aiTipLabel}</div>
                        <div className="text-sm dark:text-slate-300 text-slate-600">
                          {currentDay.weather.includes("☀️") ? pl.aiTipSunny :
                           currentDay.weather.includes("🌦") ? pl.aiTipRainy :
                           pl.aiTipDefault}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Prev / Next */}
                  <div className="px-5 sm:px-6 pb-5 flex items-center justify-between gap-3 border-t dark:border-white/5 border-slate-100 pt-4">
                    <button type="button" disabled={activeDay === 0} onClick={() => { setActiveDay((d) => d - 1); setExpandedItems(new Set()); }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold dark:bg-white/5 bg-slate-100 dark:text-slate-300 text-slate-600 disabled:opacity-30 hover:dark:bg-white/10 hover:bg-slate-200 transition-colors">
                      {pl.prevDay}
                    </button>
                    <span className="text-xs dark:text-slate-500 text-slate-400">{activeDay + 1} / {tripDays}</span>
                    <button type="button" disabled={activeDay === tripDays - 1} onClick={() => { setActiveDay((d) => d + 1); setExpandedItems(new Set()); }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold dark:bg-white/5 bg-slate-100 dark:text-slate-300 text-slate-600 disabled:opacity-30 hover:dark:bg-white/10 hover:bg-slate-200 transition-colors">
                      {pl.nextDay}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
