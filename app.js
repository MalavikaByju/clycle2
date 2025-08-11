// ===== CLYCLE PLATFORM - MAIN APPLICATION SCRIPT =====
// Enhanced with cooler animations, interactions, and improved UX

// ===== GLOBAL VARIABLES AND CONFIGURATION =====
let currentUser = null;
let wishlist = JSON.parse(localStorage.getItem('clycle_wishlist')) || [];
let cart = JSON.parse(localStorage.getItem('clycle_cart')) || [];
let currentPage = 1;
let itemsPerPage = 12;
let filteredProducts = [];
let allProducts = [];

// ===== ENHANCED PRODUCT DATA =====
const PRODUCTS = [
    // Yoga Mats (5 items)
    {
        id: 'ym-001',
        name: 'Yoga Mat',
        category: 'yoga-mats',
        price: 800,
        condition: 'like-new',
        availability: 'available',
        specs: ['2mm thickness', 'Non-slip surface', 'Eco-friendly TPE material', '183cm x 61cm'],
        images: [
            'https://live.staticflickr.com/65535/54713638324_a1a659c4d3_w.jpg?text=Yoga+Mat',
            'https://live.staticflickr.com/65535/54713637659_dc7185bc43_w.jpg?text=Yoga+Mat+Detail+1',
            'https://live.staticflickr.com/65535/54713619933_7509bd8c7d_w.jpg?text=Yoga+Mat+Detail+2'
        ],
        alt: 'Premium pink yoga mat with non-slip surface',
        description: 'High-quality yoga mat perfect for all types of yoga practice. Features excellent grip and cushioning.',
        seller: 'Thaneswari',
        postedDate: '2025-07-20'
    },
    {
        id: 'ym-002',
        name: 'Premium Yoga Mat',
        category: 'yoga-mats',
        price: 1200,
        condition: 'good',
        availability: 'available',
        specs: ['6mm thickness', 'Lightweight', 'Foldable design', '173cm x 61cm'],
        images: [
            'https://live.staticflickr.com/65535/54713747590_eddfd7135a_w.jpg?text=Premium+Yoga+Mat',
            'https://live.staticflickr.com/65535/54712576887_69fbc257b8_w.jpg?text=Folded+Mat'
        ],
        alt: 'Compact foldable premium yoga mat in dark green',
        description: 'Perfect for students who practice yoga in dorms or travel frequently. Ultra-portable design.',
        seller: 'Sanjana',
        postedDate: '2025-07-18'
    },
    {
        id: 'ym-003',
        name: 'Meditation Set',
        category: 'yoga-mats',
        price: 950,
        condition: 'new',
        availability: 'available',
        specs: ['Organic cotton cover', 'Buckwheat hull filling', 'Washable cover', '33cm diameter'],
        images: [
            'https://live.staticflickr.com/65535/54712576872_37b404e386_w.jpg?text=Meditation+Set',
            'https://live.staticflickr.com/65535/54713638304_953d4b7a87_w.jpg?text=Cushion+Detail',
            'https://live.staticflickr.com/65535/54713748250_d9a9d284d3_w.jpg?text=Folded+Detail'
        ],
        alt: 'Round meditation cushion with organic cotton cover',
        description: 'Complete meditation set with cushion and mat. Perfect for mindfulness practice.',
        seller: 'Malavika',
        postedDate: '2025-07-15'
    },
    {
        id: 'ym-004',
        name: 'Yoga Block Set',
        category: 'yoga-mats',
        price: 450,
        condition: 'like-new',
        availability: 'available',
        specs: ['EVA foam blocks', 'Set of 2', 'Lightweight', '23cm x 15cm x 10cm each'],
        images: [
            'https://via.placeholder.com/600x400?text=Yoga+Block+Set',
            'https://via.placeholder.com/600x400?text=Blocks+in+Use'
        ],
        alt: 'Set of two purple yoga blocks made from EVA foam',
        description: 'Essential yoga props for beginners and advanced practitioners. Helps with alignment and support.',
        seller: 'Alex K.',
        postedDate: '2024-12-12'
    },
    {
        id: 'ym-005',
        name: 'Yoga Strap & Mat Bundle',
        category: 'yoga-mats',
        price: 1500,
        condition: 'good',
        availability: 'sold',
        specs: ['6mm yoga mat', 'Cotton yoga strap', 'Carrying bag included', 'Complete starter set'],
        images: [
            'https://via.placeholder.com/600x400?text=Yoga+Bundle+Set',
            'https://via.placeholder.com/600x400?text=Bundle+Contents'
        ],
        alt: 'Complete yoga starter bundle with mat, strap, and carrying bag',
        description: 'Everything you need to start your yoga journey. Great value bundle for beginners.',
        seller: 'Lisa P.',
        postedDate: '2024-12-10'
    },

    // Buckets & Containers (2 items)
    {
        id: 'bk-001',
        name: 'Storage Bucket Set',
        category: 'containers',
        price: 350,
        condition: 'good',
        availability: 'available',
        specs: ['Set of 3 buckets', 'Different sizes', 'Stackable design', 'Durable plastic'],
        images: [
            'https://via.placeholder.com/600x400?text=Storage+Bucket+Set',
            'https://via.placeholder.com/600x400?text=Stacked+Buckets'
        ],
        alt: 'Set of three colorful stackable storage buckets',
        description: 'Perfect for dorm room organization. Great for storing clothes, books, or cleaning supplies.',
        seller: 'Tom W.',
        postedDate: '2024-12-19'
    },
    {
        id: 'bk-002',
        name: 'Laundry Basket',
        category: 'containers',
        price: 280,
        condition: 'like-new',
        availability: 'available',
        specs: ['Large capacity', 'Ventilated design', 'Collapsible', 'Easy carry handles'],
        images: [
            'https://via.placeholder.com/600x400?text=Laundry+Basket',
            'https://via.placeholder.com/600x400?text=Collapsed+Basket'
        ],
        alt: 'Large white laundry basket with ventilation holes',
        description: 'Essential for any student. Collapsible design saves space when not in use.',
        seller: 'Jenny S.',
        postedDate: '2024-12-17'
    },

    // Clothing (10 items)
    {
        id: 'cl-001',
        name: 'University Hoodie',
        category: 'clothing',
        price: 850,
        condition: 'good',
        availability: 'available',
        size: 'M',
        specs: ['Cotton blend', 'University logo', 'Kangaroo pocket', 'Size M'],
        images: [
            'https://via.placeholder.com/600x400?text=University+Hoodie',
            'https://via.placeholder.com/600x400?text=Hoodie+Back'
        ],
        alt: 'Navy blue university hoodie with college logo',
        description: 'Official university merchandise. Comfortable and warm for campus life.',
        seller: 'David C.',
        postedDate: '2024-12-21'
    },
    {
        id: 'cl-002',
        name: 'Denim Jacket',
        category: 'clothing',
        price: 1200,
        condition: 'like-new',
        availability: 'available',
        size: 'L',
        specs: ['100% cotton denim', 'Classic fit', 'Button closure', 'Size L'],
        images: [
            'https://via.placeholder.com/600x400?text=Denim+Jacket',
            'https://via.placeholder.com/600x400?text=Jacket+Detail'
        ],
        alt: 'Classic blue denim jacket with button closure',
        description: 'Timeless denim jacket perfect for layering. Goes with everything in your wardrobe.',
        seller: 'Rachel G.',
        postedDate: '2024-12-20'
    },
    {
        id: 'cl-003',
        name: 'Formal Shirt',
        category: 'clothing',
        price: 650,
        condition: 'good',
        availability: 'available',
        size: 'M',
        specs: ['Cotton blend', 'Wrinkle-resistant', 'Regular fit', 'Size M'],
        images: [
            'https://via.placeholder.com/600x400?text=Formal+Shirt',
            'https://via.placeholder.com/600x400?text=Shirt+Collar'
        ],
        alt: 'White formal dress shirt with button-down collar',
        description: 'Perfect for presentations, interviews, and formal events. Professional appearance guaranteed.',
        seller: 'James H.',
        postedDate: '2024-12-19'
    },
    {
        id: 'cl-004',
        name: 'Winter Coat',
        category: 'clothing',
        price: 2500,
        condition: 'like-new',
        availability: 'available',
        size: 'L',
        specs: ['Water-resistant', 'Insulated lining', 'Hood included', 'Size L'],
        images: [
            'https://via.placeholder.com/600x400?text=Winter+Coat',
            'https://via.placeholder.com/600x400?text=Coat+Hood'
        ],
        alt: 'Black winter coat with insulated lining and hood',
        description: 'Essential for cold weather. Keeps you warm and dry during winter months.',
        seller: 'Anna B.',
        postedDate: '2024-12-18'
    },
    {
        id: 'cl-005',
        name: 'Casual T-Shirts Pack',
        category: 'clothing',
        price: 750,
        condition: 'good',
        availability: 'available',
        size: 'M',
        specs: ['Pack of 3 shirts', '100% cotton', 'Various colors', 'Size M'],
        images: [
            'https://via.placeholder.com/600x400?text=T-Shirt+Pack',
            'https://via.placeholder.com/600x400?text=Shirt+Colors'
        ],
        alt: 'Pack of three casual t-shirts in different colors',
        description: 'Basic wardrobe essentials. Three comfortable t-shirts in different colors.',
        seller: 'Chris M.',
        postedDate: '2024-12-17'
    },
    {
        id: 'cl-006',
        name: 'Sports Shorts',
        category: 'clothing',
        price: 400,
        condition: 'good',
        availability: 'available',
        size: 'L',
        specs: ['Moisture-wicking fabric', 'Elastic waistband', 'Side pockets', 'Size L'],
        images: [
            'https://via.placeholder.com/600x400?text=Sports+Shorts',
            'https://via.placeholder.com/600x400?text=Shorts+Detail'
        ],
        alt: 'Black athletic shorts with side pockets',
        description: 'Perfect for gym, running, or casual wear. Comfortable and breathable fabric.',
        seller: 'Kevin L.',
        postedDate: '2024-12-16'
    },
    {
        id: 'cl-007',
        name: 'Sweater',
        category: 'clothing',
        price: 950,
        condition: 'like-new',
        availability: 'available',
        size: 'S',
        specs: ['Wool blend', 'Cable knit pattern', 'Crew neck', 'Size S'],
        images: [
            'https://via.placeholder.com/600x400?text=Cable+Knit+Sweater',
            'https://via.placeholder.com/600x400?text=Sweater+Pattern'
        ],
        alt: 'Cream colored cable knit sweater with crew neck',
        description: 'Cozy and stylish sweater perfect for cooler days. Classic cable knit design.',
        seller: 'Sophie T.',
        postedDate: '2024-12-15'
    },
    {
        id: 'cl-008',
        name: 'Jeans',
        category: 'clothing',
        price: 1100,
        condition: 'good',
        availability: 'sold',
        size: 'M',
        specs: ['Slim fit', 'Stretch denim', '5-pocket design', 'Size M (32x32)'],
        images: [
            'https://via.placeholder.com/600x400?text=Slim+Fit+Jeans',
            'https://via.placeholder.com/600x400?text=Jeans+Detail'
        ],
        alt: 'Dark blue slim fit jeans with stretch fabric',
        description: 'Comfortable everyday jeans with stretch for better fit and movement.',
        seller: 'Mark D.',
        postedDate: '2024-12-14'
    },
    {
        id: 'cl-009',
        name: 'Dress Shoes',
        category: 'clothing',
        price: 1800,
        condition: 'like-new',
        availability: 'available',
        size: '9',
        specs: ['Leather upper', 'Formal style', 'Lace-up closure', 'Size 9'],
        images: [
            'https://via.placeholder.com/600x400?text=Dress+Shoes',
            'https://via.placeholder.com/600x400?text=Shoe+Detail'
        ],
        alt: 'Black leather dress shoes with lace-up closure',
        description: 'Professional dress shoes perfect for interviews, presentations, and formal events.',
        seller: 'Robert F.',
        postedDate: '2024-12-13'
    },
    {
        id: 'cl-010',
        name: 'Backpack',
        category: 'clothing',
        price: 1350,
        condition: 'good',
        availability: 'available',
        specs: ['Laptop compartment', 'Multiple pockets', 'Padded straps', 'Water-resistant'],
        images: [
            'https://via.placeholder.com/600x400?text=Student+Backpack',
            'https://via.placeholder.com/600x400?text=Backpack+Interior'
        ],
        alt: 'Black student backpack with laptop compartment',
        description: 'Essential student backpack with dedicated laptop compartment and plenty of storage.',
        seller: 'Maria V.',
        postedDate: '2024-12-12'
    },

    // Books (5 items)
    {
        id: 'bk-101',
        name: 'Organic Chemistry Textbook',
        category: 'books',
        price: 850,
        condition: 'good',
        availability: 'available',
        specs: ['Latest edition', 'Minimal highlighting', 'All chapters included', 'ISBN: 978-0321803221'],
        images: [
            'https://via.placeholder.com/600x400?text=Organic+Chemistry+Book',
            'https://via.placeholder.com/600x400?text=Book+Interior'
        ],
        alt: 'Organic Chemistry textbook with molecular structure on cover',
        description: 'Essential textbook for chemistry students. Latest edition with minimal wear.',
        seller: 'Dr. Smith Class',
        postedDate: '2024-12-21'
    },
    {
        id: 'bk-102',
        name: 'Calculus Study Guide',
        category: 'books',
        price: 450,
        condition: 'like-new',
        availability: 'available',
        specs: ['Step-by-step solutions', 'Practice problems', 'Formula reference', 'Spiral bound'],
        images: [
            'https://via.placeholder.com/600x400?text=Calculus+Study+Guide',
            'https://via.placeholder.com/600x400?text=Guide+Pages'
        ],
        alt: 'Calculus study guide with mathematical formulas on cover',
        description: 'Comprehensive study guide with worked examples and practice problems.',
        seller: 'Math Tutor',
        postedDate: '2024-12-20'
    },
    {
        id: 'bk-103',
        name: 'Psychology Textbook',
        category: 'books',
        price: 750,
        condition: 'good',
        availability: 'available',
        specs: ['13th edition', 'Some highlighting', 'Complete text', 'Access code used'],
        images: [
            'https://via.placeholder.com/600x400?text=Psychology+Textbook',
            'https://via.placeholder.com/600x400?text=Psychology+Content'
        ],
        alt: 'Introduction to Psychology textbook with brain illustration',
        description: 'Comprehensive introduction to psychology. Great for intro psych courses.',
        seller: 'Psych Student',
        postedDate: '2024-12-19'
    },
    {
        id: 'bk-104',
        name: 'Programming Book Set',
        category: 'books',
        price: 1200,
        condition: 'like-new',
        availability: 'available',
        specs: ['3 book set', 'Python, Java, C++', 'Latest editions', 'Excellent condition'],
        images: [
            'https://via.placeholder.com/600x400?text=Programming+Book+Set',
            'https://via.placeholder.com/600x400?text=Code+Examples'
        ],
        alt: 'Set of three programming books covering Python, Java, and C++',
        description: 'Complete programming reference set. Perfect for computer science students.',
        seller: 'CS Graduate',
        postedDate: '2024-12-18'
    },
    {
        id: 'bk-105',
        name: 'Literature Anthology',
        category: 'books',
        price: 600,
        condition: 'good',
        availability: 'sold',
        specs: ['Classic literature', 'Annotated edition', 'Multiple authors', 'Course required'],
        images: [
            'https://via.placeholder.com/600x400?text=Literature+Anthology',
            'https://via.placeholder.com/600x400?text=Classic+Texts'
        ],
        alt: 'Literature anthology with classic book covers collage',
        description: 'Required reading for English literature courses. Annotated for better understanding.',
        seller: 'English Major',
        postedDate: '2024-12-17'
    },

    // Stationery (5+ items)
    {
        id: 'st-001',
        name: 'Scientific Calculator',
        category: 'stationery',
        price: 1500,
        condition: 'like-new',
        availability: 'available',
        specs: ['Graphing capability', 'Programmable', 'Solar powered', 'Protective case included'],
        images: [
            'https://via.placeholder.com/600x400?text=Scientific+Calculator',
            'https://via.placeholder.com/600x400?text=Calculator+Display'
        ],
        alt: 'Advanced scientific calculator with graphing display',
        description: 'High-end scientific calculator perfect for advanced math and science courses.',
        seller: 'Engineering Student',
        postedDate: '2024-12-21'
    },
    {
        id: 'st-002',
        name: 'Art Supply Kit',
        category: 'stationery',
        price: 800,
        condition: 'good',
        availability: 'available',
        specs: ['Colored pencils', 'Sketching pads', 'Erasers and blenders', 'Carrying case'],
        images: [
            'https://via.placeholder.com/600x400?text=Art+Supply+Kit',
            'https://via.placeholder.com/600x400?text=Art+Materials'
        ],
        alt: 'Complete art supply kit with colored pencils and sketching materials',
        description: 'Everything needed for art classes. High-quality materials in organized case.',
        seller: 'Art Student',
        postedDate: '2024-12-20'
    },
    {
        id: 'st-003',
        name: 'Notebook Set',
        category: 'stationery',
        price: 250,
        condition: 'new',
        availability: 'available',
        specs: ['Pack of 5 notebooks', 'Ruled pages', 'A4 size', 'Durable covers'],
        images: [
            'https://via.placeholder.com/600x400?text=Notebook+Set',
            'https://via.placeholder.com/600x400?text=Notebook+Pages'
        ],
        alt: 'Set of five ruled notebooks with colorful covers',
        description: 'Essential notebooks for note-taking. High-quality paper and durable binding.',
        seller: 'Stationery Store',
        postedDate: '2024-12-19'
    },
    {
        id: 'st-004',
        name: 'Pen Collection',
        category: 'stationery',
        price: 180,
        condition: 'good',
        availability: 'available',
        specs: ['Ballpoint pens', 'Gel pens', 'Highlighters', 'Various colors'],
        images: [
            'https://via.placeholder.com/600x400?text=Pen+Collection',
            'https://via.placeholder.com/600x400?text=Pen+Colors'
        ],
        alt: 'Collection of various pens and highlighters in different colors',
        description: 'Complete writing instrument collection. Perfect for students who love variety.',
        seller: 'Office Supply',
        postedDate: '2024-12-18'
    },
    {
        id: 'st-005',
        name: 'Desk Organizer',
        category: 'stationery',
        price: 350,
        condition: 'like-new',
        availability: 'available',
        specs: ['Multiple compartments', 'Wooden construction', 'Compact design', 'Non-slip base'],
        images: [
            'https://via.placeholder.com/600x400?text=Desk+Organizer',
            'https://via.placeholder.com/600x400?text=Organized+Desk'
        ],
        alt: 'Wooden desk organizer with multiple compartments for supplies',
        description: 'Keep your study space organized. Multiple compartments for all your supplies.',
        seller: 'Organized Student',
        postedDate: '2024-12-17'
    },

    // Furniture (2+ items)
    {
        id: 'fn-001',
        name: 'Study Desk',
        category: 'furniture',
        price: 2500,
        condition: 'good',
        availability: 'available',
        specs: ['Wooden construction', 'Built-in drawers', 'Cable management', '120cm x 60cm'],
        images: [
            'https://via.placeholder.com/600x400?text=Study+Desk',
            'https://via.placeholder.com/600x400?text=Desk+Drawers'
        ],
        alt: 'Wooden study desk with built-in drawers and cable management',
        description: 'Perfect study desk for dorm or apartment. Plenty of storage and workspace.',
        seller: 'Graduating Senior',
        postedDate: '2024-12-16'
    },
    {
        id: 'fn-002',
        name: 'Bookshelf',
        category: 'furniture',
        price: 1800,
        condition: 'good',
        availability: 'available',
        specs: ['5 shelves', 'Adjustable height', 'Sturdy construction', '180cm height'],
        images: [
            'https://via.placeholder.com/600x400?text=Bookshelf',
            'https://via.placeholder.com/600x400?text=Books+on+Shelf'
        ],
        alt: 'Tall wooden bookshelf with five adjustable shelves',
        description: 'Spacious bookshelf perfect for textbooks and personal library. Very sturdy.',
        seller: 'Moving Student',
        postedDate: '2024-12-15'
    },

    // Miscellaneous (5 items)
    {
        id: 'mc-001',
        name: 'Coffee Maker',
        category: 'miscellaneous',
        price: 1200,
        condition: 'like-new',
        availability: 'available',
        specs: ['12-cup capacity', 'Programmable timer', 'Auto shut-off', 'Glass carafe'],
        images: [
            'https://via.placeholder.com/600x400?text=Coffee+Maker',
            'https://via.placeholder.com/600x400?text=Coffee+Brewing'
        ],
        alt: 'Black programmable coffee maker with glass carafe',
        description: 'Essential for coffee-loving students. Programmable for morning convenience.',
        seller: 'Caffeine Addict',
        postedDate: '2024-12-14'
    },
    {
        id: 'mc-002',
        name: 'Mini Fridge',
        category: 'miscellaneous',
        price: 3500,
        condition: 'good',
        availability: 'available',
        specs: ['Compact size', 'Energy efficient', 'Freezer compartment', 'Dorm approved'],
        images: [
            'https://via.placeholder.com/600x400?text=Mini+Fridge',
            'https://via.placeholder.com/600x400?text=Fridge+Interior'
        ],
        alt: 'Compact mini refrigerator with freezer compartment',
        description: 'Perfect for dorm rooms. Keeps drinks cold and snacks fresh.',
        seller: 'Dorm Resident',
        postedDate: '2024-12-13'
    },
    {
        id: 'mc-003',
        name: 'Desk Lamp',
        category: 'miscellaneous',
        price: 450,
        condition: 'like-new',
        availability: 'available',
        specs: ['LED bulb', 'Adjustable arm', 'Touch control', 'USB charging port'],
        images: [
            'https://via.placeholder.com/600x400?text=LED+Desk+Lamp',
            'https://via.placeholder.com/600x400?text=Lamp+Adjustable'
        ],
        alt: 'Modern LED desk lamp with adjustable arm and touch controls',
        description: 'Modern LED desk lamp with convenient USB charging port. Perfect for late-night studying.',
        seller: 'Tech Student',
        postedDate: '2024-12-12'
    },
    {
        id: 'mc-004',
        name: 'Bluetooth Speaker',
        category: 'miscellaneous',
        price: 850,
        condition: 'good',
        availability: 'available',
        specs: ['Wireless connectivity', 'Long battery life', 'Water resistant', 'Compact size'],
        images: [
            'https://via.placeholder.com/600x400?text=Bluetooth+Speaker',
            'https://via.placeholder.com/600x400?text=Speaker+Playing'
        ],
        alt: 'Portable Bluetooth speaker with wireless connectivity',
        description: 'Great sound quality in a portable package. Perfect for dorm parties or study music.',
        seller: 'Music Lover',
        postedDate: '2024-12-11'
    },
    {
        id: 'mc-005',
        name: 'Electric Kettle',
        category: 'miscellaneous',
        price: 650,
        condition: 'like-new',
        availability: 'sold',
        specs: ['Fast boiling', 'Auto shut-off', 'Cordless design', '1.7L capacity'],
        images: [
            'https://via.placeholder.com/600x400?text=Electric+Kettle',
            'https://via.placeholder.com/600x400?text=Kettle+Boiling'
        ],
        alt: 'Stainless steel electric kettle with cordless design',
        description: 'Quick and convenient way to boil water for tea, coffee, or instant meals.',
        seller: 'Tea Enthusiast',
        postedDate: '2024-12-10'
    }
];

// ===== ENHANCED UTILITY FUNCTIONS =====
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(price);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--white);
                border-radius: var(--radius-md);
                box-shadow: var(--shadow-xl);
                padding: var(--spacing-lg);
                z-index: 3000;
                transform: translateX(400px);
                transition: transform var(--transition-normal);
                border-left: 4px solid var(--success);
            }
            .notification.error {
                border-left-color: var(--error);
            }
            .notification.info {
                border-left-color: var(--accent-blue);
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);
            }
            .notification-icon {
                font-weight: bold;
                font-size: var(--font-size-lg);
            }
            .notification.success .notification-icon {
                color: var(--success);
            }
            .notification.error .notification-icon {
                color: var(--error);
            }
            .notification.info .notification-icon {
                color: var(--accent-blue);
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    requestAnimationFrame(animate);
}

// ===== ENHANCED DATA LOADING AND MANAGEMENT =====
function loadProducts() {
    allProducts = [...PRODUCTS];
    filteredProducts = [...allProducts];
    return allProducts;
}

function getProductById(id) {
    return allProducts.find(product => product.id === id);
}

function searchProducts(query) {
    if (!query.trim()) return filteredProducts;
    
    const searchTerm = query.toLowerCase();
    return filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.specs.some(spec => spec.toLowerCase().includes(searchTerm)) ||
        product.category.toLowerCase().includes(searchTerm)
    );
}

function filterProducts(filters) {
    let filtered = [...allProducts];
    
    if (filters.category && filters.category !== '') {
        filtered = filtered.filter(product => product.category === filters.category);
    }
    
    if (filters.condition && filters.condition !== '') {
        filtered = filtered.filter(product => product.condition === filters.condition);
    }
    
    if (filters.availability && filters.availability !== '') {
        filtered = filtered.filter(product => product.availability === filters.availability);
    }
    
    if (filters.minPrice !== undefined && filters.minPrice !== '') {
        filtered = filtered.filter(product => product.price >= parseInt(filters.minPrice));
    }
    
    if (filters.maxPrice !== undefined && filters.maxPrice !== '') {
        filtered = filtered.filter(product => product.price <= parseInt(filters.maxPrice));
    }
    
    return filtered;
}

function sortProducts(products, sortBy) {
    const sorted = [...products];
    
    switch (sortBy) {
        case 'newest':
            return sorted.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        case 'oldest':
            return sorted.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        default:
            return sorted;
    }
}

// ===== ENHANCED RENDERING FUNCTIONS =====
function renderProductCard(product, index = 0) {
    const isInWishlist = wishlist.includes(product.id);
    const isInCart = cart.some(item => item.id === product.id);
    
    return `
        <div class="product-card" style="animation-delay: ${index * 0.1}s" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.alt}" loading="lazy">
                <div class="product-overlay"></div>
                <div class="product-actions">
                    <button class="btn btn-secondary btn-sm wishlist-btn ${isInWishlist ? 'active' : ''}" 
                            data-product-id="${product.id}" 
                            aria-label="${isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}">
                        ${isInWishlist ? '❤️' : '🤍'}
                    </button>
                    <button class="btn btn-primary btn-sm cart-btn ${isInCart ? 'active' : ''}" 
                            data-product-id="${product.id}"
                            ${product.availability === 'sold' ? 'disabled' : ''}
                            aria-label="${isInCart ? 'Remove from cart' : 'Add to cart'}">
                        ${isInCart ? '✓ Added' : '🛒 Add'}
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">
                    <a href="product.html?id=${product.id}">${product.name}</a>
                </h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-badges">
                    <span class="product-condition badge-${product.condition}">${product.condition.replace('-', ' ')}</span>
                    <span class="product-availability badge-${product.availability}">${product.availability}</span>
                    ${product.size ? `<span class="product-size">Size: ${product.size}</span>` : ''}
                </div>
                <div class="product-specs">
                    ${product.specs.slice(0, 2).map(spec => `<span class="spec-item">• ${spec}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderProductGrid(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = products.map((product, index) => renderProductCard(product, index)).join('');
    
    // Add event listeners for wishlist and cart buttons
    container.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', handleWishlistToggle);
    });
    
    container.querySelectorAll('.cart-btn').forEach(btn => {
        btn.addEventListener('click', handleCartToggle);
    });
}

function renderFeaturedListings() {
    const trendingProducts = allProducts
        .filter(p => p.availability === 'available')
        .sort((a, b) => b.price - a.price)
        .slice(0, 6);
    
    const recentProducts = allProducts
        .sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
        .slice(0, 6);
    
    renderProductGrid(trendingProducts, 'trending-listings');
    renderProductGrid(recentProducts, 'recent-listings');
}

// ===== ENHANCED WISHLIST MANAGEMENT =====
function addToWishlist(productId) {
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('clycle_wishlist', JSON.stringify(wishlist));
        updateWishlistBadge();
        showNotification('Added to wishlist!');
        return true;
    }
    return false;
}

function removeFromWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        localStorage.setItem('clycle_wishlist', JSON.stringify(wishlist));
        updateWishlistBadge();
        showNotification('Removed from wishlist');
        return true;
    }
    return false;
}

function handleWishlistToggle(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const button = event.currentTarget;
    const productId = button.dataset.productId;
    const isInWishlist = wishlist.includes(productId);
    
    if (isInWishlist) {
        removeFromWishlist(productId);
        button.innerHTML = '🤍';
        button.classList.remove('active');
        button.setAttribute('aria-label', 'Add to wishlist');
    } else {
        addToWishlist(productId);
        button.innerHTML = '❤️';
        button.classList.add('active');
        button.setAttribute('aria-label', 'Remove from wishlist');
    }
    
    // Add animation
    button.style.transform = 'scale(1.2)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

function updateWishlistBadge() {
    const badges = document.querySelectorAll('#wishlist-badge');
    badges.forEach(badge => {
        badge.textContent = wishlist.length;
        badge.style.display = wishlist.length > 0 ? 'block' : 'none';
    });
}

function renderWishlistPage() {
    const container = document.getElementById('wishlist-content');
    const emptyState = document.getElementById('empty-wishlist');
    
    if (!container) return;
    
    if (wishlist.length === 0) {
        container.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    container.style.display = 'block';
    
    const wishlistProducts = wishlist.map(id => getProductById(id)).filter(Boolean);
    
    container.innerHTML = `
        <div class="wishlist-grid">
            ${wishlistProducts.map(product => `
                <div class="wishlist-item" data-product-id="${product.id}">
                    <div class="item-image">
                        <img src="${product.images[0]}" alt="${product.alt}">
                    </div>
                    <div class="item-info">
                        <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
                        <div class="item-price">${formatPrice(product.price)}</div>
                        <span class="item-condition">${product.condition.replace('-', ' ')}</span>
                        <div class="item-specs">
                            ${product.specs.slice(0, 2).join(' • ')}
                        </div>
                    </div>
                    <div class="item-actions">
                        <button class="btn btn-primary btn-sm move-to-cart-btn" 
                                data-product-id="${product.id}"
                                ${product.availability === 'sold' ? 'disabled' : ''}>
                            ${product.availability === 'sold' ? 'Sold Out' : 'Move to Cart'}
                        </button>
                        <button class="btn btn-outline btn-sm remove-wishlist-btn" 
                                data-product-id="${product.id}">
                            Remove
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    // Add event listeners
    container.querySelectorAll('.move-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId;
            addToCart(productId);
            removeFromWishlist(productId);
            renderWishlistPage();
        });
    });
    
    container.querySelectorAll('.remove-wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId;
            removeFromWishlist(productId);
            renderWishlistPage();
        });
    });
}

// ===== ENHANCED CART MANAGEMENT =====
function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product || product.availability === 'sold') return false;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id: productId, quantity });
    }
    
    localStorage.setItem('clycle_cart', JSON.stringify(cart));
    updateCartBadge();
    showNotification('Added to cart!');
    return true;
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
        cart.splice(index, 1);
        localStorage.setItem('clycle_cart', JSON.stringify(cart));
        updateCartBadge();
        showNotification('Removed from cart');
        return true;
    }
    return false;
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            localStorage.setItem('clycle_cart', JSON.stringify(cart));
            updateCartBadge();
        }
        return true;
    }
    return false;
}

function handleCartToggle(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const button = event.currentTarget;
    const productId = button.dataset.productId;
    const isInCart = cart.some(item => item.id === productId);
    
    if (isInCart) {
        removeFromCart(productId);
        button.innerHTML = '🛒 Add';
        button.classList.remove('active');
        button.setAttribute('aria-label', 'Add to cart');
    } else {
        addToCart(productId);
        button.innerHTML = '✓ Added';
        button.classList.add('active');
        button.setAttribute('aria-label', 'Remove from cart');
    }
    
    // Add animation
    button.style.transform = 'scale(1.2)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

function updateCartBadge() {
    const badges = document.querySelectorAll('#cart-badge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badges.forEach(badge => {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'block' : 'none';
    });
}

function calculateCartTotal() {
    return cart.reduce((total, item) => {
        const product = getProductById(item.id);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
}

function renderCartPage() {
    const container = document.getElementById('cart-content');
    const emptyState = document.getElementById('empty-cart');
    
    if (!container) return;
    
    if (cart.length === 0) {
        container.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    container.style.display = 'block';
    
    const cartProducts = cart.map(item => ({
        ...getProductById(item.id),
        quantity: item.quantity
    })).filter(item => item.id);
    
    const subtotal = calculateCartTotal();
    const shipping = subtotal > 2000 ? 0 : 100;
    const total = subtotal + shipping;
    
    container.innerHTML = `
        <div class="cart-grid">
            ${cartProducts.map(product => `
                <div class="cart-item" data-product-id="${product.id}">
                    <div class="item-image">
                        <img src="${product.images[0]}" alt="${product.alt}">
                    </div>
                    <div class="item-info">
                        <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
                        <div class="item-price">${formatPrice(product.price)}</div>
                        <span class="item-condition">${product.condition.replace('-', ' ')}</span>
                        <div class="quantity-controls">
                            <button class="quantity-btn decrease" data-product-id="${product.id}">-</button>
                            <span class="quantity">${product.quantity}</span>
                            <button class="quantity-btn increase" data-product-id="${product.id}">+</button>
                        </div>
                        <div class="item-subtotal">${formatPrice(product.price * product.quantity)}</div>
                    </div>
                    <div class="item-actions">
                        <button class="btn btn-outline btn-sm remove-cart-btn" 
                                data-product-id="${product.id}">
                            Remove
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="cart-summary">
            <h3>Order Summary</h3>
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>${formatPrice(subtotal)}</span>
            </div>
            <div class="summary-row">
                <span>Shipping:</span>
                <span>${shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div class="summary-row">
                <span>Total:</span>
                <span>${formatPrice(total)}</span>
            </div>
            <button class="btn btn-primary w-full checkout-btn">
                Proceed to Checkout
            </button>
            <a href="listings.html" class="btn btn-outline w-full">
                Continue Shopping
            </a>
        </div>
    `;
    
    // Add event listeners
    container.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId;
            const isIncrease = e.target.classList.contains('increase');
            const currentItem = cart.find(item => item.id === productId);
            
            if (currentItem) {
                const newQuantity = isIncrease ? currentItem.quantity + 1 : currentItem.quantity - 1;
                updateCartQuantity(productId, newQuantity);
                renderCartPage();
            }
        });
    });
    
    container.querySelectorAll('.remove-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId;
            removeFromCart(productId);
            renderCartPage();
        });
    });
    
    const checkoutBtn = container.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            showNotification('Checkout functionality coming soon!', 'info');
        });
    }
}

// ===== ENHANCED MODAL INTERACTIONS =====
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Focus management
        const firstFocusable = modal.querySelector('button, input, textarea, select, a[href]');
        if (firstFocusable) firstFocusable.focus();
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

function setupModalHandlers() {
    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Close modal with close button
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) closeModal(modal.id);
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) closeModal(activeModal.id);
        }
    });
}

// ===== ENHANCED PRODUCT DETAIL PAGE =====
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        window.location.href = 'listings.html';
        return;
    }
    
    const product = getProductById(productId);
    if (!product) {
        window.location.href = 'listings.html';
        return;
    }
    
    renderProductDetail(product);
}

function renderProductDetail(product) {
    const container = document.getElementById('product-details');
    if (!container) return;
    
    const isInWishlist = wishlist.includes(product.id);
    const isInCart = cart.some(item => item.id === product.id);
    
    container.innerHTML = `
        <div class="container">
            <div class="product-layout">
                <div class="product-gallery">
                    <div class="main-image">
                        <img src="${product.images[0]}" alt="${product.alt}" id="main-product-image">
                    </div>
                    ${product.images.length > 1 ? `
                        <div class="thumbnail-grid">
                            ${product.images.map((image, index) => `
                                <div class="thumbnail ${index === 0 ? 'active' : ''}" data-image="${image}">
                                    <img src="${image}" alt="${product.alt}">
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                
                <div class="product-details-info">
                    <h1 class="product-title">${product.name}</h1>
                    <div class="product-price-large">${formatPrice(product.price)}</div>
                    
                    <div class="product-badges">
                        <span class="badge-condition">${product.condition.replace('-', ' ')}</span>
                        <span class="badge-availability ${product.availability}">${product.availability}</span>
                        ${product.size ? `<span class="badge-size">Size: ${product.size}</span>` : ''}
                    </div>
                    
                    <div class="product-specs-list">
                        <h4>Specifications</h4>
                        <ul>
                            ${product.specs.map(spec => `<li>${spec}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="product-actions-buttons">
                        <button class="btn btn-secondary wishlist-btn ${isInWishlist ? 'active' : ''}" 
                                data-product-id="${product.id}">
                            ${isInWishlist ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
                        </button>
                        <button class="btn btn-primary cart-btn ${isInCart ? 'active' : ''}" 
                                data-product-id="${product.id}"
                                ${product.availability === 'sold' ? 'disabled' : ''}>
                            ${product.availability === 'sold' ? 'Sold Out' : isInCart ? '✓ In Cart' : '🛒 Add to Cart'}
                        </button>
                        <button class="btn btn-outline message-seller-btn" 
                                data-product-id="${product.id}"
                                ${product.availability === 'sold' ? 'disabled' : ''}>
                            💬 Message Seller
                        </button>
                    </div>
                    
                    <div class="product-tabs">
                        <button class="tab-btn active" data-tab="description">Description</button>
                        <button class="tab-btn" data-tab="history">Item History</button>
                        <button class="tab-btn" data-tab="seller">Seller Info</button>
                    </div>
                    
                    <div class="product-tab-content">
                        <div class="tab-panel active" id="description-panel">
                            <p>${product.description}</p>
                            <div class="disclaimer">
                                <p><small>Please inspect the item carefully before purchase. All sales are final. Meet in safe, public locations on campus.</small></p>
                            </div>
                        </div>
                        <div class="tab-panel" id="history-panel">
                            <p><strong>Posted:</strong> ${new Date(product.postedDate).toLocaleDateString()}</p>
                            <p><strong>Condition:</strong> ${product.condition.replace('-', ' ')}</p>
                            <p><strong>Category:</strong> ${product.category.replace('-', ' ')}</p>
                        </div>
                        <div class="tab-panel" id="seller-panel">
                            <p><strong>Seller:</strong> ${product.seller}</p>
                            <p><strong>Rating:</strong> ⭐⭐⭐⭐⭐ (4.8/5)</p>
                            <p><strong>Response Time:</strong> Usually within 2-3 hours</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setupProductDetailHandlers();
}

function setupProductDetailHandlers() {
    // Image gallery
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.addEventListener('click', (e) => {
            const imageUrl = e.currentTarget.dataset.image;
            const mainImage = document.getElementById('main-product-image');
            
            if (mainImage) {
                mainImage.src = imageUrl;
            }
            
            // Update active thumbnail
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });
    
    // Product tabs
    document.querySelectorAll('.product-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabId = e.target.dataset.tab;
            
            // Update active tab
            document.querySelectorAll('.product-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // Update active panel
            document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
            const targetPanel = document.getElementById(`${tabId}-panel`);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });
    
    // Action buttons
    const wishlistBtn = document.querySelector('.wishlist-btn');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', handleWishlistToggle);
    }
    
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', handleCartToggle);
    }
    
    const messageBtn = document.querySelector('.message-seller-btn');
    if (messageBtn) {
        messageBtn.addEventListener('click', () => {
            openModal('message-modal');
        });
    }
}

// ===== ENHANCED SEARCH AND FILTER FUNCTIONALITY =====
function setupSearchAndFilters() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const conditionFilter = document.getElementById('condition-filter');
    const availabilityFilter = document.getElementById('availability-filter');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const sortSelect = document.getElementById('sort-select');
    const clearFiltersBtn = document.getElementById('clear-filters');
    
    const debouncedSearch = debounce(() => {
        applyFiltersAndSearch();
    }, 300);
    
    if (searchInput) {
        searchInput.addEventListener('input', debouncedSearch);
    }
    
    [categoryFilter, conditionFilter, availabilityFilter, sortSelect].forEach(element => {
        if (element) {
            element.addEventListener('change', applyFiltersAndSearch);
        }
    });
    
    [minPriceInput, maxPriceInput].forEach(element => {
        if (element) {
            element.addEventListener('input', debounce(applyFiltersAndSearch, 500));
        }
    });
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }
}

function applyFiltersAndSearch() {
    const searchQuery = document.getElementById('search-input')?.value || '';
    const filters = {
        category: document.getElementById('category-filter')?.value || '',
        condition: document.getElementById('condition-filter')?.value || '',
        availability: document.getElementById('availability-filter')?.value || '',
        minPrice: document.getElementById('min-price')?.value || '',
        maxPrice: document.getElementById('max-price')?.value || ''
    };
    const sortBy = document.getElementById('sort-select')?.value || 'newest';
    
    // Apply filters
    filteredProducts = filterProducts(filters);
    
    // Apply search
    if (searchQuery.trim()) {
        filteredProducts = searchProducts(searchQuery);
    }
    
    // Apply sorting
    filteredProducts = sortProducts(filteredProducts, sortBy);
    
    // Reset pagination
    currentPage = 1;
    
    // Render results
    renderProductGrid(filteredProducts.slice(0, itemsPerPage), 'products-grid');
    updateResultsCount();
    updateLoadMoreButton();
}

function clearAllFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('category-filter').value = '';
    document.getElementById('condition-filter').value = '';
    document.getElementById('availability-filter').value = '';
    document.getElementById('min-price').value = '';
    document.getElementById('max-price').value = '';
    document.getElementById('sort-select').value = 'newest';
    
    applyFiltersAndSearch();
}

function updateResultsCount() {
    const countElement = document.getElementById('results-count');
    if (countElement) {
        const count = filteredProducts.length;
        countElement.textContent = `${count} product${count !== 1 ? 's' : ''} found`;
    }
}

function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        const hasMore = currentPage * itemsPerPage < filteredProducts.length;
        loadMoreBtn.style.display = hasMore ? 'block' : 'none';
    }
}

function loadMoreProducts() {
    currentPage++;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    const newProducts = filteredProducts.slice(startIndex, endIndex);
    
    const container = document.getElementById('products-grid');
    if (container && newProducts.length > 0) {
        const newProductsHTML = newProducts.map((product, index) => 
            renderProductCard(product, startIndex + index)
        ).join('');
        
        container.insertAdjacentHTML('beforeend', newProductsHTML);
        
        // Add event listeners for new products
        const newCards = container.querySelectorAll('.product-card:nth-last-child(-n+' + newProducts.length + ')');
        newCards.forEach(card => {
            const wishlistBtn = card.querySelector('.wishlist-btn');
            const cartBtn = card.querySelector('.cart-btn');
            
            if (wishlistBtn) wishlistBtn.addEventListener('click', handleWishlistToggle);
            if (cartBtn) cartBtn.addEventListener('click', handleCartToggle);
        });
    }
    
    updateLoadMoreButton();
}

// ===== ENHANCED FORM HANDLING =====
function setupPostItemForm() {
    const form = document.getElementById('post-item-form');
    if (!form) return;
    
    const categoryInputs = form.querySelectorAll('input[name="category"]');
    const sizeGroup = document.getElementById('size-group');
    const photoInput = document.getElementById('photo-input');
    const uploadArea = document.getElementById('upload-area');
    const previewContainer = document.getElementById('photo-previews');
    const freeItemCheckbox = document.getElementById('free-item');
    const priceInput = document.getElementById('item-price');
    const previewBtn = document.getElementById('preview-btn');
    
    // Category change handler
    categoryInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            if (e.target.value === 'clothing' && sizeGroup) {
                sizeGroup.style.display = 'block';
            } else if (sizeGroup) {
                sizeGroup.style.display = 'none';
            }
        });
    });
    
    // Free item toggle
    if (freeItemCheckbox && priceInput) {
        freeItemCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                priceInput.value = '0';
                priceInput.disabled = true;
            } else {
                priceInput.disabled = false;
                priceInput.value = '';
            }
        });
    }
    
    // File upload handling
    if (uploadArea && photoInput) {
        uploadArea.addEventListener('click', () => photoInput.click());
        
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = Array.from(e.dataTransfer.files);
            handleFileUpload(files);
        });
        
        photoInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            handleFileUpload(files);
        });
    }
    
    // Preview button
    if (previewBtn) {
        previewBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showListingPreview();
        });
    }
    
    // Form submission
    form.addEventListener('submit', handleFormSubmission);
}

function handleFileUpload(files) {
    const previewContainer = document.getElementById('photo-previews');
    if (!previewContainer) return;
    
    const maxFiles = 5;
    const currentPreviews = previewContainer.querySelectorAll('.photo-preview').length;
    const filesToProcess = files.slice(0, maxFiles - currentPreviews);
    
    filesToProcess.forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const previewDiv = document.createElement('div');
                previewDiv.className = 'photo-preview';
                previewDiv.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <button type="button" class="photo-remove" aria-label="Remove photo">&times;</button>
                `;
                
                previewContainer.appendChild(previewDiv);
                
                // Add remove functionality
                const removeBtn = previewDiv.querySelector('.photo-remove');
                removeBtn.addEventListener('click', () => {
                    previewDiv.remove();
                });
            };
            reader.readAsDataURL(file);
        }
    });
}

function showListingPreview() {
    const form = document.getElementById('post-item-form');
    if (!form) return;
    
    const formData = new FormData(form);
    const previewData = {
        title: formData.get('title'),
        category: formData.get('category'),
        condition: formData.get('condition'),
        description: formData.get('description'),
        size: formData.get('size'),
        price: formData.get('freeItem') ? 0 : formData.get('price'),
        delivery: formData.getAll('delivery')
    };
    
    const previewContainer = document.getElementById('listing-preview');
    if (!previewContainer) return;
    
    previewContainer.innerHTML = `
        <div class="preview-card">
            <div class="preview-images">
                <div class="preview-main-image">
                    <img src="https://via.placeholder.com/400x300?text=${encodeURIComponent(previewData.title || 'Your Item')}" 
                         alt="Preview image">
                </div>
            </div>
            <div class="preview-info">
                <h3>${previewData.title || 'Item Title'}</h3>
                <div class="preview-price">${previewData.price == 0 ? 'Free' : formatPrice(previewData.price || 0)}</div>
                <div class="preview-badges">
                    ${previewData.condition ? `<span class="badge">${previewData.condition.replace('-', ' ')}</span>` : ''}
                    ${previewData.size ? `<span class="badge">Size: ${previewData.size}</span>` : ''}
                </div>
                <div class="preview-description">
                    <p>${previewData.description || 'No description provided'}</p>
                </div>
                <div class="preview-delivery">
                    <strong>Delivery Options:</strong>
                    ${previewData.delivery.length > 0 ? previewData.delivery.join(', ') : 'None selected'}
                </div>
            </div>
        </div>
    `;
    
    openModal('preview-modal');
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    // Basic validation
    const form = e.target;
    const title = form.title.value.trim();
    const category = form.category.value;
    const condition = form.condition.value;
    const description = form.description.value.trim();
    
    if (!title || !category || !condition || !description) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Your item has been posted successfully!', 'success');
    
    // Reset form after delay
    setTimeout(() => {
        form.reset();
        document.getElementById('photo-previews').innerHTML = '';
        window.location.href = 'listings.html';
    }, 2000);
}

// ===== ENHANCED AUTHENTICATION =====
function setupAuthForms() {
    const authTabs = document.querySelectorAll('.auth-tabs .tab-btn');
    const authPanels = document.querySelectorAll('.tab-panel');
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    
    // Tab switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const targetTab = e.target.dataset.tab;
            
            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            
            // Update active panel
            authPanels.forEach(panel => panel.classList.remove('active'));
            const targetPanel = document.getElementById(`${targetTab}-panel`);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });
    
    // Form submissions
    if (signinForm) {
        signinForm.addEventListener('submit', handleSignin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

function handleSignin(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    
    // Basic validation
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate authentication
    showNotification('Signed in successfully!', 'success');
    currentUser = { email, name: 'Student User' };
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

function handleSignup(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    // Simulate registration
    showNotification('Account created successfully!', 'success');
    currentUser = { email, name };
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// ===== ENHANCED NAVIGATION =====
function setupNavigation() {
    const hamburger = document.getElementById('hamburger');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const navbar = document.querySelector('.navbar');
    
    // Mobile menu toggle
    if (hamburger && mobileNavOverlay) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileNavOverlay.classList.toggle('active');
        });
        
        // Close mobile menu when clicking overlay
        mobileNavOverlay.addEventListener('click', (e) => {
            if (e.target === mobileNavOverlay) {
                hamburger.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
            }
        });
    }
    
    // Navbar scroll effect
    if (navbar) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        });
    }
}

// ===== ENHANCED TAB FUNCTIONALITY =====
function setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabContainer = e.target.closest('.featured-tabs, .auth-tabs, .profile-tabs');
            if (!tabContainer) return;
            
            const targetTab = e.target.dataset.tab;
            const tabButtons = tabContainer.querySelectorAll('.tab-btn');
            const tabPanels = document.querySelectorAll('.tab-panel');
            
            // Update active tab
            tabButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // Update active panel
            tabPanels.forEach(panel => panel.classList.remove('active'));
            const targetPanel = document.getElementById(`${targetTab}-panel`) || 
                              document.querySelector(`[data-tab-content="${targetTab}"]`);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });
}

// ===== ENHANCED CHAT FUNCTIONALITY =====
function setupChatModal() {
    const messageModal = document.getElementById('message-modal');
    if (!messageModal) return;
    
    const questionButtons = messageModal.querySelectorAll('.question-btn');
    const messageInput = messageModal.querySelector('#message-input');
    const sendBtn = messageModal.querySelector('#send-btn');
    const chatMessages = messageModal.querySelector('#chat-messages');
    
    // Quick question buttons
    questionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const question = e.target.textContent;
            if (messageInput) {
                messageInput.value = question;
                messageInput.focus();
            }
        });
    });
    
    // Send message
    if (sendBtn && messageInput) {
        const sendMessage = () => {
            const message = messageInput.value.trim();
            if (!message) return;
            
            // Add buyer message
            addChatMessage(message, 'buyer');
            messageInput.value = '';
            
            // Simulate seller response
            setTimeout(() => {
                const responses = [
                    "Hi! Yes, this item is still available. Would you like to meet on campus?",
                    "Thanks for your interest! The item is in great condition. When would you like to see it?",
                    "Hello! I can meet you at the library tomorrow afternoon if that works for you.",
                    "Hi there! The price is firm, but I'm happy to answer any questions about the item."
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addChatMessage(randomResponse, 'seller');
            }, 1000 + Math.random() * 2000);
        };
        
        sendBtn.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
}

function addChatMessage(message, sender) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `
        <div class="message-bubble">
            ${message}
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ===== ENHANCED PROFILE FUNCTIONALITY =====
function setupProfilePage() {
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const deleteAccountBtn = document.getElementById('delete-account-btn');
    const editProfileForm = document.getElementById('edit-profile-form');
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            openModal('edit-profile-modal');
        });
    }
    
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', () => {
            openModal('delete-account-modal');
        });
    }
    
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Profile updated successfully!', 'success');
            closeModal('edit-profile-modal');
        });
    }
    
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', () => {
            showNotification('Account deletion is not available in demo mode', 'info');
            closeModal('delete-account-modal');
        });
    }
    
    // Load user listings
    loadUserListings();
}

function loadUserListings() {
    const container = document.getElementById('user-listings');
    if (!container) return;
    
    // Simulate user's listings (first 4 products)
    const userProducts = allProducts.slice(0, 4);
    renderProductGrid(userProducts, 'user-listings');
}

// ===== ENHANCED STATISTICS ANIMATION =====
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = parseInt(element.textContent.replace(/,/g, ''));
                animateValue(element, 0, finalValue, 2000);
                observer.unobserve(element);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// ===== ENHANCED VIEW TOGGLE =====
function setupViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const productsGrid = document.getElementById('products-grid');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const viewType = e.target.dataset.view;
            
            // Update active button
            viewButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // Update grid view
            if (productsGrid) {
                productsGrid.className = `products-grid ${viewType}-view`;
            }
        });
    });
}

// ===== MAIN INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Load products data
    loadProducts();
    
    // Update badges
    updateWishlistBadge();
    updateCartBadge();
    
    // Setup global functionality
    setupNavigation();
    setupModalHandlers();
    setupTabs();
    setupChatModal();
    
    // Page-specific initialization
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'index.html':
        case '':
            renderFeaturedListings();
            animateStats();
            break;
            
        case 'listings.html':
            filteredProducts = [...allProducts];
            renderProductGrid(filteredProducts.slice(0, itemsPerPage), 'products-grid');
            setupSearchAndFilters();
            setupViewToggle();
            updateResultsCount();
            updateLoadMoreButton();
            
            // Load more button
            const loadMoreBtn = document.getElementById('load-more-btn');
            if (loadMoreBtn) {
                loadMoreBtn.addEventListener('click', loadMoreProducts);
            }
            break;
            
        case 'product.html':
            loadProductDetail();
            break;
            
        case 'wishlist.html':
            renderWishlistPage();
            break;
            
        case 'cart.html':
            renderCartPage();
            break;
            
        case 'repair-reuse.html':
            setupPostItemForm();
            break;
            
        case 'auth.html':
            setupAuthForms();
            break;
            
        case 'profile.html':
            setupProfilePage();
            break;
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading states for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
        });
    });
    
    console.log('🎉 Clycle platform initialized successfully!');
});

// ===== ENHANCED ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showNotification('Something went wrong. Please refresh the page.', 'error');
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    showNotification('Something went wrong. Please try again.', 'error');
});

// ===== ENHANCED PERFORMANCE OPTIMIZATIONS =====
// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker would be registered here in a production app
        console.log('Service Worker support detected');
    });
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatPrice,
        addToWishlist,
        removeFromWishlist,
        addToCart,
        removeFromCart,
        searchProducts,
        filterProducts,
        sortProducts
    };
}
