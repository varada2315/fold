import { useState, useEffect } from 'react';
import { 
  Package, 
  Coffee, 
  ShoppingBag, 
  Eye, 
  Printer, 
  Sparkles, 
  Phone, 
  Mail, 
  Menu, 
  X, 
  Star, 
  Award, 
  Settings, 
  Clock, 
  Leaf, 
  MessageSquare, 
  PenTool, 
  Truck,
  CheckCircle,
  ArrowRight,
  Search,
  Filter,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import './App.css';

// Import local assets
import heroBoxes from './assets/hero_boxes.png';
import serviceCorrugated from './assets/service_corrugated.png';
import serviceMugs from './assets/service_mugs.png';
import servicePaperBag from './assets/service_paper_bag.png';
import serviceEmbossing from './assets/service_embossing.png';
import servicePrinting from './assets/service_printing.png';
import serviceFoil from './assets/service_foil.png';
import ctaMockup from './assets/cta_mockup.png';

// Products Data Catalog
const PRODUCTS = [
  {
    id: 'corrugated-boxes',
    title: 'Premium Corrugated Box',
    category: 'Boxes',
    badge: 'BESTSELLER',
    rating: 4.9,
    reviewsCount: 38,
    price: 'From $0.45 / unit',
    moq: '250 units',
    description: 'Double-walled corrugated cardboard boxes, perfect for heavy-duty shipping and custom retail packaging.',
    image: serviceCorrugated,
    specs: {
      'Material': 'Recycled Kraft Cardboard',
      'Thickness': '3-Ply / 5-Ply options',
      'Sizes': 'Custom dimensions available',
      'Print Style': 'Flexography / Digital printing',
      'Eco Status': '100% Recyclable & Biodegradable',
      'Lead Time': '7-10 Business Days'
    }
  },
  {
    id: 'ceramic-mugs',
    title: 'Branded Ceramic Mug',
    category: 'Custom Prints',
    badge: 'POPULAR',
    rating: 4.8,
    reviewsCount: 24,
    price: 'From $2.20 / unit',
    moq: '50 units',
    description: 'Premium ceramic mugs printed with high-durability inks, ideal for corporate gifts and brand merchandise.',
    image: serviceMugs,
    specs: {
      'Material': 'Grade-A Ceramic',
      'Volume': '11oz / 325ml',
      'Dishwasher Safe': 'Yes, lab-tested',
      'Print Style': 'Sublimation / Screen Print',
      'Eco Status': 'Reusable, Lead-free glaze',
      'Lead Time': '5-7 Business Days'
    }
  },
  {
    id: 'luxury-paper-bags',
    title: 'Luxury Paper Shopping Bag',
    category: 'Bags',
    badge: 'ECO-FRIENDLY',
    rating: 4.9,
    reviewsCount: 42,
    price: 'From $0.65 / unit',
    moq: '500 units',
    description: 'Elegant shopping bags with reinforced base and maroon ribbon handles. High-end retail feel.',
    image: servicePaperBag,
    specs: {
      'Material': '210gsm Art Card / Kraft Paper',
      'Handles': 'Maroon Ribbon / Twisted paper',
      'Base Support': 'Cardboard reinforced bottom',
      'Print Style': 'Offset printing / Foil stamping',
      'Eco Status': 'Recyclable, FSC Certified',
      'Lead Time': '10-12 Business Days'
    }
  },
  {
    id: 'embossed-gift-box',
    title: 'Embossed Gift Box',
    category: 'Boxes',
    badge: 'PREMIUM CHOICE',
    rating: 5.0,
    reviewsCount: 18,
    price: 'From $1.80 / unit',
    moq: '100 units',
    description: 'Rigid luxury gift boxes featuring blind or registered embossing for an ultra-premium texture.',
    image: serviceEmbossing,
    specs: {
      'Material': '1200gsm Rigid Chipboard',
      'Finishing': 'High-texture embossed paper wrap',
      'Closure': 'Magnetic flap / Lid & Base',
      'Print Style': 'Blind emboss / Debossing',
      'Eco Status': 'Sustainably sourced board',
      'Lead Time': '12-14 Business Days'
    }
  },
  {
    id: 'printing-solutions',
    title: 'Full-Color Printed Packaging',
    category: 'Printing',
    badge: 'SHARP DETAILS',
    rating: 4.7,
    reviewsCount: 29,
    price: 'From $0.35 / unit',
    moq: '200 units',
    description: 'Offset and digital full-color printed cartons and packaging sleeves. CMYK & Pantone matching.',
    image: servicePrinting,
    specs: {
      'Material': '350gsm Duplex Board / Kraft paper',
      'Lamination': 'Gloss / Matte lamination',
      'Color Space': 'CMYK / Pantone matching',
      'Print Style': 'High-speed offset lithography',
      'Eco Status': 'Soy-based inks used',
      'Lead Time': '6-8 Business Days'
    }
  },
  {
    id: 'gold-foil-bag',
    title: 'Gold Foil Stamped Bag',
    category: 'Bags',
    badge: 'HOT CHOICE',
    rating: 4.9,
    reviewsCount: 31,
    price: 'From $0.85 / unit',
    moq: '300 units',
    description: 'Kraft and coated paper bags with hot foil stamping in gold, silver, or metallic rose gold.',
    image: serviceFoil,
    specs: {
      'Material': '250gsm Kraft Paper / Premium Card',
      'Foil Color': 'Gold / Silver / Rose Gold / Bronze',
      'Foil Area': 'Up to 30% coverage included',
      'Print Style': 'Hot foil stamping / Deboss',
      'Eco Status': 'Foil is recyclable-compatible',
      'Lead Time': '8-10 Business Days'
    }
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Products page search & filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: 'Corrugated Boxes', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle header scroll background trigger
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on navigation change
  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setFormSubmitted(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setFormSubmitted(false);
        setFormData({ name: '', email: '', phone: '', service: 'Corrugated Boxes', message: '' });
      }, 3000);
    }, 1000);
  };

  // WhatsApp prefilled message builder
  const handleWhatsAppInquiry = (productName) => {
    const text = `Hi Fold Theory! I am interested in custom packaging details and pricing for: ${productName}. Could you share more information?`;
    window.open(`https://wa.me/918502987098?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleGeneralWhatsApp = () => {
    window.open('https://wa.me/918502987098?text=Hi%20Fold%20Theory,%20I%20have%20a%20packaging%20project%20in%20mind!', '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:hello@foldtheory.com?subject=Packaging%20Inquiry';
  };

  // Custom WhatsApp Icon SVG
  const WhatsAppIcon = ({ size = 20, className = "" }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );

  // Filter products by category and search term
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app-container">
      {/* HEADER SECTION */}
      <header className={`header ${scrolled || currentPage !== 'home' ? 'header-scrolled' : ''}`}>
        <div className="header-inner">
          <button onClick={() => navigateTo('home')} className="logo-container">
            <div className="logo-icon">
              <span className="logo-box"></span>
              <span className="logo-box-inner"></span>
            </div>
            <div className="logo-text">
              <span className="logo-top">FOLD</span>
              <span className="logo-bottom">THEORY</span>
            </div>
          </button>

          {/* Navigation links mapped to page state */}
          <nav className="desktop-nav">
            <button onClick={() => navigateTo('home')} className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}>Home</button>
            <button onClick={() => navigateTo('about')} className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}>About Us</button>
            <button onClick={() => navigateTo('products')} className={`nav-link ${currentPage === 'products' ? 'active' : ''}`}>Products</button>
            <button onClick={() => navigateTo('contact')} className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}>Contact Us</button>
          </nav>

          <div className="header-actions">
            <button className="btn-get-touch" onClick={() => {
              if (currentPage === 'contact') {
                window.scrollTo({ top: 300, behavior: 'smooth' });
              } else {
                navigateTo('contact');
              }
            }}>
              <span className="icon-circle">
                <Phone size={14} className="icon-phone" />
              </span>
              <span className="btn-text">Get in Touch</span>
            </button>

            {/* Mobile Menu Button */}
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-overlay animate-fade-in" onClick={() => setMobileMenuOpen(false)}>
            <nav className="mobile-nav" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => navigateTo('home')} className={`mobile-nav-link ${currentPage === 'home' ? 'active-mobile' : ''}`}>Home</button>
              <button onClick={() => navigateTo('about')} className={`mobile-nav-link ${currentPage === 'about' ? 'active-mobile' : ''}`}>About Us</button>
              <button onClick={() => navigateTo('products')} className={`mobile-nav-link ${currentPage === 'products' ? 'active-mobile' : ''}`}>Products</button>
              <button onClick={() => navigateTo('contact')} className={`mobile-nav-link ${currentPage === 'contact' ? 'active-mobile' : ''}`}>Contact Us</button>
              <button className="mobile-nav-btn btn-get-touch" onClick={() => { setMobileMenuOpen(false); navigateTo('contact'); }}>
                <span className="icon-circle">
                  <Phone size={14} />
                </span>
                <span className="btn-text">Get in Touch</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* DYNAMIC PAGE RENDER CONTAINER */}
      <main className="main-content">
        
        {/* ========================================================
            1. HOME PAGE VIEW
            ======================================================== */}
        {currentPage === 'home' && (
          <>
            {/* HERO SECTION */}
            <section className="hero-section">
              <div className="hero-container">
                <div className="hero-content animate-slide-left">
                  <span className="hero-subtitle">CUSTOM PACKAGING, PERFECTLY YOURS</span>
                  <h1 className="hero-title">
                    Designed to <br />
                    <span className="text-light">Protect.</span> <br />
                    Made to <br />
                    <span className="text-highlight">Impress.</span>
                  </h1>
                  <p className="hero-description">
                    Premium custom packaging solutions that elevate your brand and leave a lasting impact.
                  </p>
                  
                  <div className="hero-buttons">
                    <button className="btn-whatsapp" onClick={handleGeneralWhatsApp}>
                      <WhatsAppIcon className="btn-icon-wa" />
                      <span>Chat on WhatsApp</span>
                    </button>
                    <button className="btn-email" onClick={handleEmailClick}>
                      <Mail size={18} className="btn-icon-mail" />
                      <span>Email Us</span>
                    </button>
                  </div>

                </div>

                <div className="hero-image-wrapper animate-slide-right">
                  <div className="hero-image-bg-glow"></div>
                  <span className="decor-leaf hero-decor-leaf"></span>
                  <img src={heroBoxes} alt="Custom boxes by Fold Theory" className="hero-image" />
                </div>
              </div>
            </section>

            {/* STATS & BRAND SECTION */}
            <section className="stats-brand-section">
              <div className="stats-inner-container">
                <div className="stats-grid">
                  <div className="stat-card">
                    <span className="stat-number">250+</span>
                    <span className="stat-label">Orders Delivered</span>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-card">
                    <span className="stat-number">120+</span>
                    <span className="stat-label">Happy Clients</span>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-card">
                    <span className="stat-number">5+</span>
                    <span className="stat-label">Years Experience</span>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-card">
                    <span className="stat-number">98%</span>
                    <span className="stat-label">Client Satisfaction</span>
                  </div>
                </div>

                <div className="brand-trust-container">
                  <span className="brand-trust-title">Trusted by brands that trust quality.</span>
                  <div className="brand-logos">
                    <span className="brand-logo-item font-serif">URBAN STYLE</span>
                    <span className="brand-logo-item font-serif">BEAN CRAFT</span>
                    <span className="brand-logo-item font-serif">LUXE & CO.</span>
                    <span className="brand-logo-item font-serif">MOON VIBE</span>
                  </div>
                </div>
              </div>
            </section>

            {/* PRODUCT RANGE TEASER (E-commerce Teaser) */}
            <section className="services-section">
              <div className="section-header">
                <span className="section-subtitle">OUR PRODUCTS</span>
                <h2 className="section-title">Explore Custom Packaging Categories</h2>
                <span className="section-title-line"></span>
              </div>

              <div className="services-grid">
                {PRODUCTS.slice(0, 3).map((product) => (
                  <div key={product.id} className="service-card">
                    <div className="service-icon-floating">
                      {product.category === 'Boxes' ? <Package size={20} /> : product.category === 'Bags' ? <ShoppingBag size={20} /> : <Coffee size={20} />}
                    </div>
                    <div className="service-image-container">
                      <img src={product.image} alt={product.title} className="service-card-img" />
                      <span className="service-price-badge">{product.price}</span>
                    </div>
                    <div className="service-card-content">
                      <span className="service-cat">{product.category}</span>
                      <h3>{product.title}</h3>
                      <p>{product.description}</p>
                      <button onClick={() => navigateTo('products')} className="teaser-link-btn">
                        <span>View Details</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="teaser-footer-btn-container">
                <button onClick={() => navigateTo('products')} className="btn-whatsapp btn-view-catalog">
                  <span>Browse Full Catalog</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </section>

            {/* WHY CHOOSE US SECTION */}
            <section className="why-choose-section">
              <div className="why-choose-container">
                <span className="why-choose-header-text">WHY CHOOSE FOLD THEORY?</span>
                <div className="why-choose-grid">
                  <div className="why-choose-item">
                    <div className="why-icon-circle">
                      <Award size={20} />
                    </div>
                    <div className="why-text-content">
                      <h4>Premium Quality</h4>
                      <p>Finest materials and impeccable finishing</p>
                    </div>
                  </div>

                  <div className="why-choose-item">
                    <div className="why-icon-circle">
                      <Settings size={20} />
                    </div>
                    <div className="why-text-content">
                      <h4>Custom Solutions</h4>
                      <p>Tailored designs that match your brand</p>
                    </div>
                  </div>

                  <div className="why-choose-item">
                    <div className="why-icon-circle">
                      <Clock size={20} />
                    </div>
                    <div className="why-text-content">
                      <h4>Timely Delivery</h4>
                      <p>On-time, every time with reliable service</p>
                    </div>
                  </div>

                  <div className="why-choose-item">
                    <div className="why-icon-circle">
                      <Leaf size={20} />
                    </div>
                    <div className="why-text-content">
                      <h4>Sustainable Choice</h4>
                      <p>Eco-friendly materials for a better tomorrow</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* PROCESS SECTION */}
            <section className="process-section">
              <div className="section-header">
                <span className="section-subtitle">OUR PROCESS</span>
                <h2 className="section-title">Simple Steps, Exceptional Results</h2>
                <span className="section-title-line"></span>
              </div>

              <div className="process-flow-container">
                <div className="process-steps">
                  <div className="process-step">
                    <div className="step-icon-outer">
                      <div className="step-icon-inner">
                        <MessageSquare size={24} />
                      </div>
                      <div className="step-number-badge">01</div>
                    </div>
                    <h4>Consult</h4>
                    <p>Share your ideas and requirements</p>
                  </div>
                  <div className="process-connector"></div>
                  <div className="process-step">
                    <div className="step-icon-outer">
                      <div className="step-icon-inner">
                        <PenTool size={24} />
                      </div>
                      <div className="step-number-badge">02</div>
                    </div>
                    <h4>Design & Customize</h4>
                    <p>We create & customize your packaging</p>
                  </div>
                  <div className="process-connector"></div>
                  <div className="process-step">
                    <div className="step-icon-outer">
                      <div className="step-icon-inner">
                        <Eye size={24} />
                      </div>
                      <div className="step-number-badge">03</div>
                    </div>
                    <h4>Preview</h4>
                    <p>Review in 3D and request changes</p>
                  </div>
                  <div className="process-connector"></div>
                  <div className="process-step">
                    <div className="step-icon-outer">
                      <div className="step-icon-inner">
                        <Package size={24} />
                      </div>
                      <div className="step-number-badge">04</div>
                    </div>
                    <h4>Produce</h4>
                    <p>High-quality production with perfection</p>
                  </div>
                  <div className="process-connector"></div>
                  <div className="process-step">
                    <div className="step-icon-outer">
                      <div className="step-icon-inner">
                        <Truck size={24} />
                      </div>
                      <div className="step-number-badge">05</div>
                    </div>
                    <h4>Deliver</h4>
                    <p>On-time delivery to your doorstep</p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA SECTION */}
            <section className="cta-section">
              <div className="cta-container">
                <div className="cta-background-decorations">
                  <span className="decor-leaf left-decor"></span>
                  <span className="decor-leaf right-decor"></span>
                </div>
                <div className="cta-inner-grid">
                  <div className="cta-image-wrapper">
                    <img src={ctaMockup} alt="Bags and Boxes Mockup" className="cta-image" />
                  </div>
                  <div className="cta-content-wrapper">
                    <h2 className="cta-title">Have a project in mind?</h2>
                    <p className="cta-subtitle">Let's create packaging that speaks for your brand.</p>
                    <div className="cta-actions">
                      <button className="cta-btn-whatsapp" onClick={handleGeneralWhatsApp}>
                        <WhatsAppIcon className="cta-btn-icon-wa" />
                        <span>Chat on WhatsApp</span>
                      </button>
                      <button className="cta-btn-email" onClick={handleEmailClick}>
                        <Mail size={18} className="cta-btn-icon-mail" />
                        <span>Email Us</span>
                      </button>
                    </div>
                    <div className="cta-contact-details">
                      <a href="tel:8502987098" className="cta-contact-item">
                        <span className="cta-contact-icon"><Phone size={16} /></span>
                        <span className="cta-contact-text">8502987098</span>
                      </a>
                      <a href="mailto:hello@foldtheory.com" className="cta-contact-item">
                        <span className="cta-contact-icon"><Mail size={16} /></span>
                        <span className="cta-contact-text">hello@foldtheory.com</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ========================================================
            2. ABOUT US PAGE VIEW
            ======================================================== */}
        {currentPage === 'about' && (
          <div className="page-about animate-fade-in">
            <section className="page-hero">
              <div className="page-hero-container">
                <span className="page-subtitle">OUR STORY</span>
                <h1 className="page-title font-serif">About Fold Theory</h1>
                <div className="page-title-line"></div>
              </div>
            </section>

            <section className="about-details-section">
              <div className="about-details-grid">
                <div className="about-text-content">
                  <h2 className="about-heading font-serif">Crafting Brand Identities through Custom Packaging</h2>
                  <p className="about-para">
                    At Fold Theory, we believe packaging is not just a container; it's a statement. It is the first tangible touchpoint between your brand and your customers. Our mission is to blend engineering strength with exquisite aesthetics to deliver packaging that protects your products while magnifying your brand's presence.
                  </p>
                  <p className="about-para">
                    Based on years of technical printing expertise and material design, we create customized solutions tailored to each brand's specific values. From local craft shops to massive corporate supply lines, our production line handles orders with extreme precision and dedicated quality checks.
                  </p>
                  
                  <div className="about-quote-box">
                    <p className="quote-text font-serif">"Our craft lies in translating your brand's voice into textures, structures, and unforgettable unboxing moments."</p>
                    <span className="quote-author">— Founders, Fold Theory</span>
                  </div>
                </div>
                <div className="about-image-column">
                  <div className="about-image-blob-mask">
                    <img src={ctaMockup} alt="Crafting custom boxes" className="about-mockup-img" />
                  </div>
                </div>
              </div>
            </section>

            {/* CORE VALUE PILLARS */}
            <section className="why-choose-section">
              <div className="why-choose-container">
                <span className="why-choose-header-text">OUR MANUFACTURING PILLARS</span>
                <div className="why-choose-grid">
                  <div className="why-choose-item">
                    <div className="why-icon-circle"><Award size={20} /></div>
                    <div className="why-text-content">
                      <h4>Flawless Calibrations</h4>
                      <p>Symmetric crease cuts and perfect alignments on fold paths.</p>
                    </div>
                  </div>
                  <div className="why-choose-item">
                    <div className="why-icon-circle"><Leaf size={20} /></div>
                    <div className="why-text-content">
                      <h4>Eco Materials</h4>
                      <p>FSC paper boards, soy inks, and 100% recyclable foil details.</p>
                    </div>
                  </div>
                  <div className="why-choose-item">
                    <div className="why-icon-circle"><Settings size={20} /></div>
                    <div className="why-text-content">
                      <h4>High Scalability</h4>
                      <p>Optimized logistics built to scale from small runs to cargo shipments.</p>
                    </div>
                  </div>
                  <div className="why-choose-item">
                    <div className="why-icon-circle"><Clock size={20} /></div>
                    <div className="why-text-content">
                      <h4>Punctual Supply</h4>
                      <p>Precise delivery windows backed by reliable carrier systems.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* TEAM / QUALITY FACTORY BANNER */}
            <section className="about-quality-seal-section">
              <div className="quality-seal-container">
                <h2 className="font-serif">Tested & Certified Craftsmanship</h2>
                <p>Every single product batch undergoes detailed drop tests, compression resistance evaluations, and color consistency reviews before leaving our facility.</p>
                <button onClick={() => navigateTo('contact')} className="btn-get-touch btn-get-quote-about">
                  <span>Discuss Your Project Specifications</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================
            3. PRODUCTS CATALOG PAGE VIEW (E-COMMERCE TOUCH)
            ======================================================== */}
        {currentPage === 'products' && (
          <div className="page-products animate-fade-in">
            <section className="page-hero">
              <div className="page-hero-container">
                <span className="page-subtitle">OUR COLLECTION</span>
                <h1 className="page-title font-serif">Product Catalog</h1>
                <div className="page-title-line"></div>
              </div>
            </section>

            {/* CATALOG CONTROLS */}
            <section className="catalog-controls-section">
              <div className="controls-container">
                {/* Search Bar */}
                <div className="search-box-wrapper">
                  <Search size={18} className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search custom boxes, bags, printed mugs..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="search-clear-btn">
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* Category Filters */}
                <div className="category-filters-scroll">
                  <div className="category-filters-container">
                    {['All', 'Boxes', 'Bags', 'Custom Prints', 'Printing'].map((cat) => (
                      <button 
                        key={cat} 
                        onClick={() => setActiveCategory(cat)}
                        className={`filter-tab-btn ${activeCategory === cat ? 'active-filter' : ''}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* PRODUCTS GRID */}
            <section className="products-grid-section">
              <div className="products-grid-container">
                {filteredProducts.length > 0 ? (
                  <div className="products-ecommerce-grid">
                    {filteredProducts.map((product) => (
                      <div key={product.id} className="prod-card">
                        {/* Image container with e-commerce features */}
                        <div className="prod-img-wrapper">
                          <img src={product.image} alt={product.title} className="prod-img" />
                          <span className="prod-badge-overlay">{product.badge}</span>
                          <button 
                            onClick={() => setSelectedProduct(product)} 
                            className="prod-quick-view-floating"
                            title="Quick View Details"
                          >
                            <Eye size={18} />
                            <span>Quick View</span>
                          </button>
                        </div>

                        {/* Product details */}
                        <div className="prod-info-wrapper">
                          <div className="prod-cat-rating-row">
                            <span className="prod-cat-label">{product.category}</span>
                            <div className="prod-rating-box">
                              <Star size={13} fill="currentColor" className="star-icon" />
                              <span className="rating-score">{product.rating}</span>
                              <span className="reviews-count">({product.reviewsCount})</span>
                            </div>
                          </div>
                          <h3 className="prod-title-heading">{product.title}</h3>
                          <p className="prod-short-desc">{product.description}</p>
                          
                          {/* MOQ and Price row - E-commerce feel */}
                          <div className="prod-pricing-moq-row">
                            <div className="moq-col">
                              <span className="price-label">MOQ</span>
                              <span className="moq-value">{product.moq}</span>
                            </div>
                            <div className="price-col">
                              <span className="price-label">EST. PRICE</span>
                              <span className="price-value">{product.price.split('From ')[1]}</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="prod-actions-row">
                            <button 
                              onClick={() => handleWhatsAppInquiry(product.title)}
                              className="prod-btn-whatsapp"
                            >
                              <WhatsAppIcon size={16} />
                              <span>Enquire on WhatsApp</span>
                            </button>
                            <button 
                              onClick={() => setSelectedProduct(product)}
                              className="prod-btn-view"
                            >
                              <Info size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-products-container">
                    <div className="no-products-icon">
                      <Search size={40} />
                    </div>
                    <h3>No packaging products found</h3>
                    <p>We couldn't find matches for "{searchQuery}". Try clearing search or selecting a different tab.</p>
                    <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="btn-get-touch btn-reset-filters">
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* ========================================================
            4. CONTACT US PAGE VIEW
            ======================================================== */}
        {currentPage === 'contact' && (
          <div className="page-contact animate-fade-in">
            <section className="page-hero">
              <div className="page-hero-container">
                <span className="page-subtitle">GET IN TOUCH</span>
                <h1 className="page-title font-serif">Contact Us</h1>
                <div className="page-title-line"></div>
              </div>
            </section>

            <section className="contact-form-page-section">
              <div className="contact-form-grid">
                {/* Left Side: Inline Contact Form */}
                <div className="contact-form-card">
                  {formSubmitted ? (
                    <div className="form-success-message">
                      <div className="success-icon-circle">
                        <CheckCircle size={48} className="success-icon" />
                      </div>
                      <h2>Message Sent Successfully!</h2>
                      <p>Thank you for contacting Fold Theory. Our design team will reach out with preliminary layouts in 24 hours.</p>
                    </div>
                  ) : (
                    <>
                      <h3 className="form-section-title font-serif">Submit Your Specifications</h3>
                      <p className="form-section-desc">Fill in details about material choices, shapes, sizes, and quantities to receive an customized quote.</p>
                      
                      <form onSubmit={handleSubmit} className="contact-inline-form">
                        <div className="form-row-two">
                          <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input 
                              type="text" 
                              id="name" 
                              name="name" 
                              required 
                              value={formData.name} 
                              onChange={handleInputChange} 
                              placeholder="e.g. John Doe"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input 
                              type="tel" 
                              id="phone" 
                              name="phone" 
                              required 
                              value={formData.phone} 
                              onChange={handleInputChange} 
                              placeholder="e.g. 8502987098"
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="email">Email Address</label>
                          <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            placeholder="e.g. john@yourbrand.com"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="service">Packaging Category</label>
                          <select 
                            id="service" 
                            name="service" 
                            value={formData.service} 
                            onChange={handleInputChange}
                          >
                            <option value="Corrugated Boxes">Corrugated Boxes</option>
                            <option value="Glass / Mug Prints">Glass / Mug Prints</option>
                            <option value="Paper Bags">Paper Bags</option>
                            <option value="Embossing Finishes">Embossing Finishes</option>
                            <option value="Printing Solutions">Printing Solutions</option>
                            <option value="Foil Stamping">Foil Stamping</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label htmlFor="message">Project Description & Dimensions</label>
                          <textarea 
                            id="message" 
                            name="message" 
                            rows="5" 
                            required 
                            value={formData.message} 
                            onChange={handleInputChange} 
                            placeholder="Let us know size ratios, target quantities, number of printing colors, or special finishing details..."
                          ></textarea>
                        </div>

                        <button type="submit" className="form-submit-btn contact-page-submit-btn">
                          <span>Send Quote Request</span>
                          <ArrowRight size={16} />
                        </button>
                      </form>
                    </>
                  )}
                </div>

                {/* Right Side: Contact info details */}
                <div className="contact-info-column">
                  <div className="contact-card-box">
                    <div className="contact-icon-circle">
                      <Phone size={20} />
                    </div>
                    <div className="contact-card-text">
                      <h4>Direct Call Line</h4>
                      <p>Connect with a sales consultant immediately.</p>
                      <a href="tel:8502987098" className="contact-link font-serif">8502987098</a>
                    </div>
                  </div>

                  <div className="contact-card-box">
                    <div className="contact-icon-circle">
                      <Mail size={20} />
                    </div>
                    <div className="contact-card-text">
                      <h4>Email Support</h4>
                      <p>Send vector logos or spec files for feedback.</p>
                      <a href="mailto:hello@foldtheory.com" className="contact-link font-serif">hello@foldtheory.com</a>
                    </div>
                  </div>

                  <div className="contact-card-box">
                    <div className="contact-icon-circle">
                      <WhatsAppIcon size={20} />
                    </div>
                    <div className="contact-card-text">
                      <h4>WhatsApp Support</h4>
                      <p>Instant messages, spec photos, and quick chat.</p>
                      <button onClick={handleGeneralWhatsApp} className="contact-link text-whatsapp-green font-serif">
                        Open Chat Window
                      </button>
                    </div>
                  </div>

                  {/* FACTORY OFFICE DETAILS */}
                  <div className="contact-factory-card">
                    <h4 className="factory-title font-serif">Production & Factory Office</h4>
                    <p className="factory-detail">Plot No. 45, Industrial Development Area, Phase II, Sector 5</p>
                    <p className="factory-detail">Open: Mon - Sat | 9:00 AM - 6:00 PM</p>
                    <div className="factory-map-placeholder">
                      <div className="map-inner-decor">
                        <Package size={32} className="map-box-icon" />
                        <span className="map-pin-glow"></span>
                      </div>
                      <span className="map-caption">Factory Facility Location</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* FOOTER SECTION */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Column 1: Brand Info */}
            <div className="footer-col brand-col">
              <button onClick={() => navigateTo('home')} className="footer-logo">
                <div className="logo-icon logo-icon-gold">
                  <span className="logo-box"></span>
                  <span className="logo-box-inner"></span>
                </div>
                <div className="logo-text text-white">
                  <span className="logo-top">FOLD</span>
                  <span className="logo-bottom">THEORY</span>
                </div>
              </button>
              <p className="footer-brand-desc">
                Custom packaging that protects, presents, and promotes your brand.
              </p>
              <div className="social-links">
                <a href="https://instagram.com/fold.theory2" target="_blank" rel="noreferrer" className="social-link-item">
                  <svg size={18} fill="currentColor" viewBox="0 0 24 24" className="social-svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="footer-col">
              <h3>Navigation</h3>
              <ul className="footer-links">
                <li><button onClick={() => navigateTo('home')}>Home</button></li>
                <li><button onClick={() => navigateTo('about')}>About Us</button></li>
                <li><button onClick={() => navigateTo('products')}>Products</button></li>
                <li><button onClick={() => navigateTo('contact')}>Contact Us</button></li>
              </ul>
            </div>

            {/* Column 3: Custom Services */}
            <div className="footer-col">
              <h3>Our Services</h3>
              <ul className="footer-links">
                <li><button onClick={() => { navigateTo('products'); setActiveCategory('Boxes'); }}>Corrugated Boxes</button></li>
                <li><button onClick={() => { navigateTo('products'); setActiveCategory('Custom Prints'); }}>Glass / Mug Prints</button></li>
                <li><button onClick={() => { navigateTo('products'); setActiveCategory('Bags'); }}>Paper Bags</button></li>
                <li><button onClick={() => navigateTo('products')}>Embossing</button></li>
                <li><button onClick={() => navigateTo('products')}>Printing Solutions</button></li>
                <li><button onClick={() => navigateTo('products')}>Foil Stamping</button></li>
              </ul>
            </div>

            {/* Column 4: Contact details */}
            <div className="footer-col">
              <h3>Contact Details</h3>
              <ul className="footer-contact-info">
                <li>
                  <Phone size={14} className="info-icon" />
                  <a href="tel:8502987098">8502987098</a>
                </li>
                <li>
                  <Mail size={14} className="info-icon" />
                  <a href="mailto:hello@foldtheory.com">hello@foldtheory.com</a>
                </li>
                <li>
                  <svg size={14} fill="currentColor" viewBox="0 0 24 24" className="info-icon social-svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  <a href="https://instagram.com/fold.theory2" target="_blank" rel="noreferrer">fold.theory2</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} FOLD THEORY. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* ========================================================
          PRODUCT QUICK VIEW MODAL (E-COMMERCE DETAIL DIALOG)
          ======================================================== */}
      {selectedProduct && (
        <div className="modal-overlay animate-fade-in" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content quickview-modal animate-slide-left" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedProduct(null)}>
              <X size={20} />
            </button>
            
            <div className="quickview-grid">
              {/* Product Image Section */}
              <div className="quickview-img-col">
                <img src={selectedProduct.image} alt={selectedProduct.title} className="quickview-image" />
                <span className="quickview-badge-overlay">{selectedProduct.badge}</span>
              </div>

              {/* Product Details Section */}
              <div className="quickview-info-col">
                <span className="quickview-category">{selectedProduct.category}</span>
                <h2 className="quickview-title font-serif">{selectedProduct.title}</h2>
                
                {/* Rating details */}
                <div className="quickview-rating-row">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill={i < Math.floor(selectedProduct.rating) ? "currentColor" : "none"} className="star-icon" />
                    ))}
                  </div>
                  <span className="quickview-rating-text">{selectedProduct.rating} out of 5 stars ({selectedProduct.reviewsCount} reviews)</span>
                </div>

                <p className="quickview-desc">{selectedProduct.description}</p>
                
                {/* Pricing boxes */}
                <div className="quickview-pricing-strip">
                  <div className="pricing-box">
                    <span className="label">Estimated Price</span>
                    <span className="value">{selectedProduct.price}</span>
                  </div>
                  <div className="pricing-box">
                    <span className="label">Minimum Order</span>
                    <span className="value">{selectedProduct.moq}</span>
                  </div>
                </div>

                {/* Detailed Specifications Table */}
                <div className="quickview-specs-table-container">
                  <h4 className="specs-title">Technical Specifications</h4>
                  <table className="specs-table">
                    <tbody>
                      {Object.entries(selectedProduct.specs).map(([key, value]) => (
                        <tr key={key}>
                          <td className="spec-key">{key}</td>
                          <td className="spec-value">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Direct Action buttons */}
                <div className="quickview-actions">
                  <button 
                    onClick={() => {
                      handleWhatsAppInquiry(selectedProduct.title);
                      setSelectedProduct(null);
                    }}
                    className="btn-whatsapp quickview-btn-wa"
                  >
                    <WhatsAppIcon size={18} />
                    <span>Enquire on WhatsApp</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      setFormData(prev => ({ ...prev, service: selectedProduct.category === 'Custom Prints' ? 'Glass / Mug Prints' : selectedProduct.category === 'Bags' ? 'Paper Bags' : 'Corrugated Boxes', message: `Hi! I would like a quote for the "${selectedProduct.title}".` }));
                      setSelectedProduct(null);
                      navigateTo('contact');
                    }}
                    className="btn-email quickview-btn-quote"
                  >
                    <Mail size={16} />
                    <span>Request Quote</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
