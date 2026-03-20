'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Menu as MenuIcon, 
  X, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  Instagram,
  Mail,
  Coffee,
  Utensils,
  Cake,
  Wine,
  ChefHat,
  Leaf,
  Heart
} from 'lucide-react';

// ============================================
// DONNÉES COMPLÈTES - TOUTES LES PHOTOS UTILISÉES
// ============================================

// MENU DU ZÈBRE À POIS
// Note: Les images sont des approximations visuelles des plats réels
const plats = {
  plats: [
    { name: "Tarte chèvre saumon tomate", description: "Tarte salée au chèvre, saumon fumé et tomates fraîches", price: "14,80€", image: "/images/plats/tarte-fine-salee.jpg", signature: true },
    { name: "Cassolette de saumon chorizo", description: "Saumon poêlé, chorizo épicé, sauce onctueuse", price: "18,00€", image: "/images/plats/pave-poisson.jpg", signature: true },
    { name: "Burger du Zèbre", description: "Buns, steak haché, camembert pané, confit d'oignons, cornichons, salade", price: "19,50€", image: "/images/plats/steak-frites.jpg", signature: true },
    { name: "Risotto de légumes", description: "Riz arborio crémeux, légumes de saison, parmesan", price: "14,80€", image: "/images/plats/gratin-legumes.jpg" },
    { name: "Pluma de porc", description: "Sauce moutarde et miel, accompagnement du jour", price: "15,00€", image: "/images/plats/poulet-moutarde.jpg" },
    { name: "Formule", description: "P'tit croque + 1 cookie + 1 café", price: "13,50€", image: "/images/plats/croque-madame.jpg" },
  ],
  desserts: [
    { name: "Café sucré", description: "Café + cookie maison", price: "4,30€", image: "/images/desserts/cafe-gourmand.jpg" },
    { name: "Assiette de fromage", description: "Sélection de fromages affinés", price: "6,50€", image: "/images/desserts/toast-fromage.jpg" },
    { name: "Crème brûlée à la vanille", description: "Crème vanille, caramel croustillant", price: "6,00€", image: "/images/desserts/dessert-pot.jpg", signature: true },
    { name: "Tiramisu du moment", description: "Notre tiramisu revisité selon les saisons", price: "6,50€", image: "/images/desserts/tiramisu.jpg", signature: true },
    { name: "Fromage blanc", description: "Caramel ou fruits rouges au choix", price: "6,50€", image: "/images/desserts/cheesecake-framboise.jpg" },
    { name: "Cookies choco-noix", description: "Cookies moelleux chocolat et noix", price: "2,50€", image: "/images/desserts/mousse-chocolat.jpg" },
    { name: "Dame blanche", description: "Glace vanille, sauce chocolat, chantilly", price: "6,60€", image: "/images/desserts/tarte-pommes.jpg" },
    { name: "Caramel liégeois", description: "Glace vanille, sauce caramel, chantilly", price: "6,60€", image: "/images/desserts/tarte-ananas-1.jpg" },
    { name: "Chocolat liégeois", description: "Glace vanille, sauce chocolat, chantilly", price: "6,60€", image: "/images/desserts/tarte-ananas-2.jpg" },
    { name: "Coupe iceberg", description: "Menthe, chocolat et get 27", price: "9,00€", image: "/images/desserts/plateau-degustation.jpg" },
    { name: "Glace 1 boule", description: "Parfums au choix", price: "3,00€", image: "/images/desserts/tarte-pommes.jpg" },
    { name: "Glace 2 boules", description: "Parfums au choix", price: "5,50€", image: "/images/desserts/tarte-ananas-1.jpg" },
    { name: "Glace 3 boules", description: "Parfums au choix", price: "8,00€", image: "/images/desserts/tarte-ananas-2.jpg" },
  ]
};

// 6 PHOTOS INTÉRIEUR
const interieurPhotos = [
  { src: "/images/interieur/interieur-1.jpg", alt: "Notre salle principale", category: "interieur" },
  { src: "/images/interieur/interieur-2.jpg", alt: "L'ambiance chaleureuse", category: "interieur" },
  { src: "/images/interieur/interieur-3.jpg", alt: "Décoration thématique zèbre", category: "interieur" },
  { src: "/images/interieur/interieur-4.jpg", alt: "Espace convivial", category: "interieur" },
  { src: "/images/interieur/interieur-5.jpg", alt: "Notre bar", category: "interieur" },
  { src: "/images/interieur/interieur-6.jpg", alt: "Coin détente", category: "interieur" },
];

// 4 PHOTOS EXTÉRIEUR
const exterieurPhotos = [
  { src: "/images/exterieur/exterieur-1.jpg", alt: "Notre façade", category: "exterieur" },
  { src: "/images/exterieur/exterieur-2.jpg", alt: "Notre terrasse", category: "exterieur" },
  { src: "/images/exterieur/exterieur-3.jpg", alt: "En plein cœur de Rouen", category: "exterieur" },
  { src: "/images/exterieur/exterieur-4.jpg", alt: "Ambiance terrasse", category: "exterieur" },
];

// PLATS POUR GALERIE (toutes les catégories)
const platsGallery = [
  { src: "/images/plats/cote-boeuf.jpg", alt: "Côte de bœuf signature", category: "plats" },
  { src: "/images/plats/steak-frites.jpg", alt: "Steak frites classique", category: "plats" },
  { src: "/images/plats/blanquette-veau.jpg", alt: "Blanquette de veau", category: "plats" },
  { src: "/images/plats/poulet-moutarde.jpg", alt: "Poulet sauce moutarde", category: "plats" },
  { src: "/images/plats/salade-cesar-1.jpg", alt: "Salade César", category: "plats" },
  { src: "/images/plats/salade-cesar-2.jpg", alt: "Salade César généreuse", category: "plats" },
  { src: "/images/plats/salade-exotique.jpg", alt: "Salade exotique", category: "plats" },
  { src: "/images/plats/salade-parme.jpg", alt: "Salade parmigiana", category: "plats" },
  { src: "/images/plats/salade-composee.jpg", alt: "Salade composée", category: "plats" },
  { src: "/images/plats/couscous-saucisse.jpg", alt: "Couscous saucisse", category: "plats" },
  { src: "/images/plats/pave-poisson.jpg", alt: "Pavé de poisson", category: "plats" },
  { src: "/images/plats/pave-poisson-riz.jpg", alt: "Poisson et riz", category: "plats" },
];

// DESSERTS POUR GALERIE
const dessertsGallery = [
  { src: "/images/desserts/cafe-gourmand.jpg", alt: "Café gourmand", category: "desserts" },
  { src: "/images/desserts/tiramisu.jpg", alt: "Tiramisu", category: "desserts" },
  { src: "/images/desserts/cheesecake-framboise.jpg", alt: "Cheesecake framboise", category: "desserts" },
  { src: "/images/desserts/mousse-chocolat.jpg", alt: "Mousse au chocolat", category: "desserts" },
  { src: "/images/desserts/tarte-pommes.jpg", alt: "Tarte aux pommes", category: "desserts" },
  { src: "/images/desserts/tarte-ananas-1.jpg", alt: "Tarte à l'ananas", category: "desserts" },
  { src: "/images/desserts/dessert-pot.jpg", alt: "Dessert du chef", category: "desserts" },
  { src: "/images/desserts/plateau-degustation.jpg", alt: "Plateau dégustation", category: "desserts" },
];

// SPÉCIALITÉS SIGNATURE (3 plats mis en avant)
const specialitesSignature = [
  { name: "Burger du Zèbre", description: "Buns, steak haché, camembert pané, confit d'oignons, cornichons, salade", price: "19,50€", image: "/images/plats/steak-frites.jpg" },
  { name: "Cassolette de saumon", description: "Saumon poêlé, chorizo épicé, sauce onctueuse", price: "18,00€", image: "/images/plats/pave-poisson.jpg" },
  { name: "Tiramisu du moment", description: "Notre tiramisu revisité selon les saisons", price: "6,50€", image: "/images/desserts/tiramisu.jpg" },
];

const hours = [
  { day: "Mardi", midi: "08:30 - 20:30", soir: "" },
  { day: "Mercredi", midi: "08:30 - 20:30", soir: "" },
  { day: "Jeudi", midi: "08:30 - 20:30", soir: "" },
  { day: "Vendredi", midi: "08:30 - 20:30", soir: "" },
  { day: "Samedi", midi: "08:30 - 20:30", soir: "" },
  { day: "Dimanche", midi: "Fermé", soir: "" },
  { day: "Lundi", midi: "Fermé", soir: "" },
];

const avis = [
  { name: "Romane B.", rating: 5, text: "Lieu très sympathique, serveurs souriants et aimables, plats savoureux. Tarifs raisonnables. On reviendra !", date: "Février 2025" },
  { name: "Bertrand H.", rating: 5, text: "Le Zèbre à Pois est un vrai bijou ! L'accueil est super chaleureux et la décoration magnifique. Mention spéciale au serveur.", date: "Février 2025" },
  { name: "Emmanuel S.", rating: 5, text: "Un délicieux déjeuner pro. Service efficace de Damien le patron et une délicieuse Blanquette de veau. Musique top !", date: "Décembre 2024" },
];

// ============================================
// NAVIGATION (Style Chez l'Gros avec effet scroll)
// ============================================
function Navigation({ onMenuClick }: { onMenuClick: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navItems = [
    { label: "Accueil", href: "#accueil" },
    { label: "Notre Histoire", href: "#histoire" },
    { label: "Menu", href: "#carte" },
    { label: "Galerie", href: "#galerie" },
    { label: "Avis", href: "#avis" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a 
            href="#accueil" 
            onClick={(e) => { e.preventDefault(); scrollTo('#accueil'); }} 
            className="flex items-center gap-3 group"
          >
            <h1 className={`text-xl font-serif font-bold transition-colors ${
              isScrolled 
                ? 'text-[#D4A574] hover:text-[#B8956A]' 
                : 'text-white hover:text-[#D4A574]'
            }`}>
              Le Zèbre à pois
            </h1>
          </a>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                className={`text-sm font-medium transition-colors hover:text-[#D4A574] ${
                  isScrolled ? 'text-[#1A1A1A]' : 'text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            {/* Phone Button */}
            <a 
              href="tel:+33235007673"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-9 px-4 py-2 bg-[#D4A574] hover:bg-[#B8956A] text-[#1A1A1A] shadow-sm"
            >
              <Phone className="w-4 h-4" />
              02 35 00 76 73
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={onMenuClick}
            className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all size-9 lg:hidden hover:bg-white/10 ${
              isScrolled ? 'text-[#D4A574]' : 'text-white'
            }`}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

// ============================================
// MENU MOBILE (Style Chez l'Gros - Sheet)
// ============================================
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navItems = [
    { label: "Accueil", href: "#accueil" },
    { label: "Notre Histoire", href: "#histoire" },
    { label: "Menu", href: "#carte" },
    { label: "Galerie", href: "#galerie" },
    { label: "Avis", href: "#avis" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[300px] sm:w-[350px] bg-[#1A1A1A] border-white/10 p-0">
        {/* Header du Sheet */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-lg font-serif font-bold text-white">Le Zèbre à pois</h2>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex flex-col p-6 gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
              className="text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/10 hover:text-[#D4A574] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        
        {/* Footer du Sheet */}
        <div className="p-6 border-t border-white/10 space-y-4">
          <a 
            href="tel:+33235007673"
            className="flex items-center gap-3 text-[#D4A574] hover:text-[#B8956A] transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span className="font-semibold">02 35 00 76 73</span>
          </a>
          <a 
            href="https://www.google.com/maps/place/17+Rue+aux+Ours,+76000+Rouen"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
          >
            <MapPin className="w-5 h-5" />
            <span>17 Rue aux Ours, Rouen</span>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ============================================
// HERO SECTION (Style Chez l'Gros)
// ============================================
function HeroSection() {
  const scrollToMenu = () => {
    document.querySelector('#carte')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/exterieur/exterieur-1.jpg"
          alt="Façade du restaurant Le Zèbre à pois à Rouen"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 animate-fade-in-up">
          Le Zèbre à pois
        </h1>
        
        {/* Subtitles */}
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4 font-light animate-fade-in-up animation-delay-100">
          Bar • Brasserie au cœur de Rouen
        </p>
        <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-200">
          Un lieu convivial où déguster des plats préparés avec passion et produits frais.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
          <a 
            href="tel:+33235007673"
            className="inline-flex items-center justify-center gap-2 bg-[#D4A574] hover:bg-[#B8956A] text-[#1A1A1A] font-semibold px-8 py-4 text-lg rounded-full shadow-lg transition-all"
          >
            <Phone className="w-5 h-5" />
            Réserver au 02 35 00 76 73
          </a>
          <button 
            onClick={scrollToMenu}
            className="bg-white/10 backdrop-blur border border-white/30 text-white hover:bg-white/20 font-semibold px-8 py-4 text-lg rounded-full transition-all"
          >
            Voir le menu
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 animate-fade-in-up animation-delay-400">
          <div className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
            <ChefHat className="w-6 h-6 mb-2 text-[#D4A574]" />
            <span className="text-sm text-white/90">Cuisine Maison</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
            <Wine className="w-6 h-6 mb-2 text-[#D4A574]" />
            <span className="text-sm text-white/90">Vins & Bières</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
            <Coffee className="w-6 h-6 mb-2 text-[#D4A574]" />
            <span className="text-sm text-white/90">Café Gourmand</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
            <MapPin className="w-6 h-6 mb-2 text-[#D4A574]" />
            <span className="text-sm text-white/90">Rue aux Ours</span>
          </div>
        </div>
      </div>

      {/* Scroll Down Button */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => document.querySelector('#histoire')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-white/60 hover:text-white/80 transition-colors"
          aria-label="Défiler vers le bas"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
}

// ============================================
// SECTION NOTRE HISTOIRE (inspiré de Chez l'Gros)
// ============================================
function HistoireSection() {
  return (
    <section id="histoire" className="py-20 bg-[#FDF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium bg-[#D4A574]/20 text-[#B8956A] mb-4">
            Notre Histoire
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A]">
            Un Bar-Brasserie Authentique à Rouen
          </h2>
          <div className="w-20 h-1 bg-[#D4A574] mx-auto rounded-full mt-4" />
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Images - Left Side */}
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col gap-4">
              {/* Large Image */}
              <div className="relative h-[300px] lg:h-[320px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/interieur/interieur-2.jpg"
                  alt="L'intérieur chaleureux du Zèbre à pois"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Two Small Images */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-[180px] lg:h-[200px] rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/histoire-plat.jpg"
                    alt="Plat signature du Zèbre à pois"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative h-[180px] lg:h-[200px] rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/histoire-dessert.jpg"
                    alt="Dessert gourmand"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text - Right Side */}
          <div className="w-full lg:w-1/2">
            <p className="text-[#4A4A4A] leading-relaxed mb-4 text-lg">
              Niché au cœur de Rouen, Le Zèbre à pois est bien plus qu&apos;un simple bar-brasserie. C&apos;est un lieu de vie où l&apos;authenticité française rencontre une ambiance chaleureuse et conviviale.
            </p>
            <p className="text-[#4A4A4A] leading-relaxed mb-4 text-lg">
              Depuis son ouverture, notre établissement s&apos;est fait une réputation grâce à sa cuisine sincère et généreuse. Ici, pas de fioritures inutiles, juste des produits de qualité sublimés par un savoir-faire artisanal.
            </p>
            <p className="text-[#4A4A4A] leading-relaxed mb-4 text-lg">
              Notre équipe accueille chaque convive comme un ami. Entre les rayures et les pois de notre décoration emblématique, vous découvrirez un univers unique au <strong className="text-[#1A1A1A]">17 Rue aux Ours</strong>.
            </p>

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D4A574]/10 flex items-center justify-center flex-shrink-0">
                  <ChefHat className="w-5 h-5 text-[#B8956A]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A]">Cuisine Maison</h4>
                  <p className="text-sm text-[#4A4A4A]">Plats préparés sur place</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D4A574]/10 flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5 text-[#B8956A]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A]">Produits Frais</h4>
                  <p className="text-sm text-[#4A4A4A]">Ingrédients de qualité</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D4A574]/10 flex items-center justify-center flex-shrink-0">
                  <Wine className="w-5 h-5 text-[#B8956A]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A]">Vins & Bières</h4>
                  <p className="text-sm text-[#4A4A4A]">Belle sélection française</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D4A574]/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-[#B8956A]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A]">Fait Maison</h4>
                  <p className="text-sm text-[#4A4A4A]">Recettes authentiques</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION SPÉCIALITÉS SIGNATURE (FOND JAUNE/CREME)
// ============================================
function SignatureSection() {
  return (
    <section id="signature" className="py-20 bg-[#D4A574]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#1A1A1A]/70 font-semibold uppercase tracking-wider text-sm">Nos créations</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#1A1A1A] mt-2 mb-4">
            Nos Spécialités Signature
          </h2>
          <div className="w-16 h-1 bg-[#1A1A1A]/30 mx-auto mb-6" />
          <p className="text-[#1A1A1A]/80 text-lg max-w-2xl mx-auto">
            Découvrez nos plats les plus emblématiques, préparés avec passion et produits frais.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {specialitesSignature.map((dish, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-[#1A1A1A] text-white font-bold px-3 py-1 rounded-full text-sm">
                  {dish.price}
                </div>
                <div className="absolute top-4 left-4 bg-[#D4A574] text-[#1A1A1A] font-semibold px-3 py-1 rounded-full text-xs flex items-center gap-1">
                  <ChefHat className="w-3 h-3" />
                  Signature
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-xl font-semibold text-[#1A1A1A] mb-2">
                  {dish.name}
                </h3>
                <p className="text-[#4A4A4A] text-sm">
                  {dish.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button 
            onClick={() => document.querySelector('#carte')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#1A1A1A] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#4A4A4A] transition-colors"
          >
            Voir toute la carte
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION LA CARTE (inspiré de Chez l'Gros)
// ============================================
function CarteSection() {
  const [activeCategory, setActiveCategory] = useState<'plats' | 'desserts'>('plats');

  const categories = [
    { id: 'plats' as const, label: 'Plats' },
    { id: 'desserts' as const, label: 'Desserts' },
  ];

  const currentItems = plats[activeCategory];

  return (
    <section id="carte" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium bg-[#D4A574]/20 text-[#B8956A] mb-4">
            Notre Carte
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A]">
            Nos Spécialités
          </h2>
          <div className="w-20 h-1 bg-[#D4A574] mx-auto rounded-full mt-4 mb-6" />
          <p className="text-[#4A4A4A] max-w-2xl mx-auto">
            Des plats faits maison avec des produits frais du marché, préparés dans le respect des traditions.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium shadow-sm h-9 rounded-full px-6 py-2 transition-all ${
                activeCategory === cat.id 
                  ? 'bg-[#1A1A1A] text-white hover:bg-[#4A4A4A]' 
                  : 'border border-[#D4A574]/30 text-[#B8956A] hover:bg-[#D4A574]/10 bg-transparent'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((item, index) => (
            <div
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-[#1A1A1A] flex flex-col gap-6 rounded-xl py-6 h-full overflow-hidden border-0 shadow-lg bg-white hover:shadow-xl transition-shadow group">
                {/* Image Area */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Badge */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    {'signature' in item && item.signature ? (
                      <span className="inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium bg-[#D4A574] text-[#1A1A1A]">
                        <ChefHat className="w-3 h-3 mr-1" />
                        Chef
                      </span>
                    ) : null}
                    {index === 2 && activeCategory === 'plats' && (
                      <span className="inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium bg-[#D4A574] text-[#1A1A1A]">
                        <Star className="w-3 h-3 mr-1" />
                        Populaire
                      </span>
                    )}
                  </div>
                </div>
                {/* Content */}
                <div className="px-6">
                  {/* Title and Price in same row */}
                  <div className="flex justify-between items-start pb-2">
                    <div className="font-semibold text-lg">{item.name}</div>
                    <span className="text-lg font-bold text-[#B8956A]">{item.price}</span>
                  </div>
                  {/* Description */}
                  <p className="text-[#4A4A4A] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-[#4A4A4A] mb-4">
            Menu du jour disponible — Demandez nos suggestions du jour !
          </p>
          <a 
            href="tel:+33235007673"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium shadow-sm h-9 py-2 bg-[#1A1A1A] hover:bg-[#4A4A4A] text-white rounded-full px-8 transition-all"
          >
            <Phone className="w-4 h-4 mr-2" />
            Réserver au 02 35 00 76 73
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION GALERIE
// ============================================
function GalerieSection() {
  const [activeFilter, setActiveFilter] = useState<'tout' | 'plats' | 'desserts' | 'interieur' | 'exterieur'>('tout');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filters = [
    { id: 'tout' as const, label: 'Tout' },
    { id: 'plats' as const, label: 'Plats' },
    { id: 'desserts' as const, label: 'Desserts' },
    { id: 'interieur' as const, label: 'Intérieur' },
    { id: 'exterieur' as const, label: 'Extérieur' },
  ];

  const allImages = [
    ...platsGallery,
    ...dessertsGallery,
    ...interieurPhotos,
    ...exterieurPhotos,
  ];

  const filteredImages = activeFilter === 'tout' 
    ? allImages 
    : allImages.filter(img => img.category === activeFilter);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <section id="galerie" className="py-20 bg-[#FDF8F3]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#D4A574] font-semibold uppercase tracking-wider text-sm">Découvrez</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#1A1A1A] mt-2 mb-4">
            Notre Galerie
          </h2>
          <div className="w-16 h-1 bg-[#D4A574] mx-auto mb-6" />
          <p className="text-[#4A4A4A] text-lg max-w-2xl mx-auto">
            Découvrez l&apos;ambiance de notre restaurant et nos créations culinaires
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                activeFilter === filter.id 
                  ? 'bg-[#D4A574] text-[#1A1A1A]' 
                  : 'bg-white text-[#4A4A4A] hover:bg-[#D4A574]/20'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                <span className="text-white font-medium p-3 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                  {image.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl w-full bg-[#1A1A1A]/95 border-none p-0">
          <div className="relative h-[80vh]">
            <Image
              src={filteredImages[currentIndex]?.src || ''}
              alt={filteredImages[currentIndex]?.alt || ''}
              fill
              className="object-contain"
            />
            
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full transition-colors"
            >
              <ChevronLeft className="text-white" size={28} />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full transition-colors"
            >
              <ChevronRight className="text-white" size={28} />
            </button>
            
            <button 
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors"
            >
              <X className="text-white" size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full">
              <p className="text-white text-sm">{filteredImages[currentIndex]?.alt}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

// ============================================
// SECTION AVIS
// ============================================
function AvisSection() {
  return (
    <section id="avis" className="py-20 bg-[#1A1A1A]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#D4A574] font-semibold uppercase tracking-wider text-sm">Témoignages</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            Ce Que Disent Nos Clients
          </h2>
          <div className="w-16 h-1 bg-[#D4A574] mx-auto mb-6" />
          
          <div className="flex items-center justify-center gap-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star}
                  className={`w-6 h-6 ${star <= 4 ? 'fill-[#D4A574] text-[#D4A574]' : 'fill-[#D4A574]/50 text-[#D4A574]'}`}
                />
              ))}
            </div>
            <span className="text-2xl font-bold text-white">4,3/5</span>
            <span className="text-white/60">basé sur 417 avis Google</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {avis.map((avisItem, index) => (
            <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#D4A574] rounded-full flex items-center justify-center text-[#1A1A1A] font-bold text-lg">
                  {avisItem.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-white">{avisItem.name}</h4>
                  <p className="text-sm text-white/60">{avisItem.date}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    className={`w-4 h-4 ${star <= avisItem.rating ? 'fill-[#D4A574] text-[#D4A574]' : 'text-[#D4A574]'}`}
                  />
                ))}
              </div>
              <p className="text-white/80 leading-relaxed">
                &quot;{avisItem.text}&quot;
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a 
            href="https://www.google.com/maps/place/Le+Z%C3%A8bre+%C3%A0+pois/@49.4402008,1.0899485,17z/data=!4m8!3m7!1s0x47e0de781827f2cd:0x69cc626e0dd15f88!8m2!3d49.4402008!4d1.0925234!9m1!1b1!16s%2Fg%2F1tj9smqm?entry=ttu&g_ep=EgoyMDI2MDMxNy4wIKXMDSoASAFQAw%3D%3D" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#D4A574] hover:text-[#B8956A] font-medium transition-colors"
          >
            Voir tous les avis sur Google →
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION CONTACT (inspiré de Chez l'Gros)
// ============================================
function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-[#FDF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium bg-[#D4A574]/10 text-[#B8956A] mb-4">
            Nous Trouver
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A]">
            Contact & Horaires
          </h2>
          <div className="w-20 h-1 bg-[#D4A574] mx-auto rounded-full mt-4 mb-6" />
        </div>

        {/* Grid: Horaires + Map */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Horaires Card */}
          <div className="flex flex-col gap-6 rounded-xl py-6 border-0 shadow-lg bg-white lg:col-span-1">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Clock className="h-5 w-5 text-[#D4A574]" />
                <h3 className="font-semibold text-lg">Horaires</h3>
              </div>
              <div className="space-y-3">
                {hours.map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center justify-between py-2 ${index < hours.length - 1 ? 'border-b border-[#E8E0D8]/50' : ''}`}
                  >
                    <span className={`font-medium ${item.midi === 'Fermé' ? 'text-[#4A4A4A]/60' : 'text-[#1A1A1A]'}`}>
                      {item.day}
                    </span>
                    <div className="text-right">
                      {item.midi === 'Fermé' ? (
                        <span className="text-[#4A4A4A]">Fermé</span>
                      ) : (
                        <span className="text-[#D4A574] font-medium">{item.midi}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#4A4A4A] mt-4 pt-4 border-t border-[#E8E0D8]/50">
                * Réservation recommandée
              </p>
            </div>
          </div>

          {/* Google Maps */}
          <div className="lg:col-span-2">
            <div className="bg-white flex flex-col gap-6 rounded-xl py-6 overflow-hidden shadow-lg border-0 h-full">
              <div className="relative h-full min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=17%20Rue%20aux%20Ours%2C%2076000%20Rouen"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Carte du restaurant Le Zèbre à pois"
                  className="absolute inset-0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          {/* Téléphone */}
          <a 
            href="tel:+33235007673"
            className="flex items-center gap-4 p-5 bg-[#1A1A1A] rounded-xl hover:bg-[#4A4A4A] transition-colors group text-white"
          >
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-medium text-white/80 text-sm">Réservations</p>
              <p className="text-white font-bold text-lg">02 35 00 76 73</p>
            </div>
          </a>

          {/* Adresse */}
          <a 
            href="https://www.google.com/maps/place/17+Rue+aux+Ours,+76000+Rouen"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 bg-white rounded-xl hover:bg-white/80 transition-colors group shadow-md"
          >
            <div className="w-14 h-14 rounded-full bg-[#D4A574]/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="h-6 w-6 text-[#D4A574]" />
            </div>
            <div>
              <p className="font-medium text-[#4A4A4A] text-sm">Adresse</p>
              <p className="text-[#1A1A1A] font-semibold">17 Rue aux Ours, 76000 Rouen</p>
            </div>
          </a>
        </div>

        {/* Info Badges */}
        <div className="flex flex-wrap gap-6 justify-center mt-8 text-sm text-[#4A4A4A]">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#D4A574]">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>
            </svg>
            <span>Parking à proximité</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#D4A574]">
              <circle cx="16" cy="4" r="1"/>
              <path d="m18 19 1-7-6 1"/>
              <path d="m5 8 3-3 5.5 3-2.36 3.5"/>
              <path d="M4.24 14.5a5 5 0 0 0 6.88 6"/>
              <path d="M13.76 17.5a5 5 0 0 0-6.88-6"/>
              <path d="M4.24 14.5a5 5 0 0 0 6.88 6"/>
              <path d="M13.76 17.5a5 5 0 0 0-6.88-6"/>
            </svg>
            <span>Accessible PMR</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// FOOTER (Style Chez l'Gros)
// ============================================
function Footer() {
  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerHours = [
    { day: "Mardi", hours: "08:30 - 20:30", closed: false },
    { day: "Mercredi", hours: "08:30 - 20:30", closed: false },
    { day: "Jeudi", hours: "08:30 - 20:30", closed: false },
    { day: "Vendredi", hours: "08:30 - 20:30", closed: false },
    { day: "Samedi", hours: "08:30 - 20:30", closed: false },
    { day: "Dimanche", hours: "Fermé", closed: true },
    { day: "Lundi", hours: "Fermé", closed: true },
  ];

  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo + Description */}
          <div className="lg:col-span-1">
            <a 
              href="#accueil" 
              onClick={(e) => { e.preventDefault(); scrollTo('#accueil'); }}
              className="inline-block"
            >
              <span className="text-3xl font-serif font-bold text-[#D4A574]">
                Le Zèbre à pois
              </span>
            </a>
            <p className="mt-4 text-white/60 text-sm leading-relaxed">
              Un bar-brasserie convivial au cœur de Rouen, où déguster des plats préparés avec des produits frais du marché.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-[#D4A574] font-semibold mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#accueil" 
                  onClick={(e) => { e.preventDefault(); scrollTo('#accueil'); }}
                  className="text-white/60 hover:text-[#D4A574] transition-colors text-sm"
                >
                  Accueil
                </a>
              </li>
              <li>
                <a 
                  href="#carte" 
                  onClick={(e) => { e.preventDefault(); scrollTo('#carte'); }}
                  className="text-white/60 hover:text-[#D4A574] transition-colors text-sm"
                >
                  Menu
                </a>
              </li>
              <li>
                <a 
                  href="#galerie" 
                  onClick={(e) => { e.preventDefault(); scrollTo('#galerie'); }}
                  className="text-white/60 hover:text-[#D4A574] transition-colors text-sm"
                >
                  Galerie
                </a>
              </li>
              <li>
                <a 
                  href="#avis" 
                  onClick={(e) => { e.preventDefault(); scrollTo('#avis'); }}
                  className="text-white/60 hover:text-[#D4A574] transition-colors text-sm"
                >
                  Avis
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
                  className="text-white/60 hover:text-[#D4A574] transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#D4A574] font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#D4A574]/80 flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">17 Rue aux Ours, 76000 Rouen</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#D4A574]/80 flex-shrink-0" />
                <a 
                  href="tel:+33235007673" 
                  className="text-white/60 hover:text-[#D4A574] transition-colors text-sm"
                >
                  02 35 00 76 73
                </a>
              </li>
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="text-[#D4A574] font-semibold mb-4">Horaires</h3>
            <ul className="space-y-2">
              {footerHours.map((item, index) => (
                <li key={index} className="flex items-center justify-between text-sm">
                  <span className="text-white/60">{item.day}</span>
                  {item.closed ? (
                    <span className="text-white/40">{item.hours}</span>
                  ) : (
                    <span className="text-[#D4A574]">{item.hours}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Le Zèbre à pois. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.instagram.com/le_zebre_a_pois_rouen?igsh=b2dzbzAzc3l4MHl1" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#D4A574] hover:text-[#1A1A1A] transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// CTA MOBILE STICKY
// ============================================
function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setIsVisible(window.scrollY > heroBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-white/95 backdrop-blur-md border-t border-[#E8E0D8] lg:hidden">
      <a 
        href="tel:+33235007673"
        className="flex items-center justify-center gap-2 w-full bg-[#D4A574] text-[#1A1A1A] py-4 rounded-lg font-semibold text-lg"
      >
        <Phone className="w-5 h-5" />
        Réserver au 02 35 00 76 73
      </a>
    </div>
  );
}


// ============================================
// PAGE PRINCIPALE
// ============================================
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main id="main-content" className="min-h-screen">
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-[#D4A574] focus:text-[#1A1A1A] focus:px-4 focus:py-2 focus:rounded-md focus:font-medium"
      >
        Aller au contenu principal
      </a>
      
      <Navigation onMenuClick={() => setMobileMenuOpen(true)} />
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      <HeroSection />
      <HistoireSection />
      <SignatureSection />
      <CarteSection />
      <GalerieSection />
      <AvisSection />
      <ContactSection />
      <Footer />
      
      <MobileStickyCTA />
    </main>
  );
}
