// ─── AUTH ────────────────────────────────────────────────────────────────────
export const MOCK_USERS = [
  {
    id: 'u1', role: 'alumni', email: 'maria@example.com', password: 'pass123',
    name: 'Maria Santos', batch: '2015', course: 'BS Computer Science',
    avatar: 'https://ui-avatars.com/api/?name=Maria+Santos&background=2563eb&color=fff&size=128',
    totalDonated: 15500, donationCount: 8, joinedYear: 2015,
    address: 'Davao City, Philippines', phone: '+63 912 345 6789',
    linkedIn: 'linkedin.com/in/mariasantos', employer: 'Tech Corp PH'
  },
  {
    id: 'u2', role: 'admin', email: 'admin@alumni.edu', password: 'admin123',
    name: 'Dr. Jose Reyes', batch: 'Faculty', course: 'Alumni Affairs Officer',
    avatar: 'https://ui-avatars.com/api/?name=Jose+Reyes&background=1e40af&color=fff&size=128',
    totalDonated: 0, donationCount: 0
  }
];

// ─── CAMPAIGNS ───────────────────────────────────────────────────────────────
export const CAMPAIGNS = [
  {
    id: 'c1', title: 'Scholarship Fund 2025', category: 'Education',
    goal: 500000, raised: 342000, donors: 128, daysLeft: 45, featured: true, urgent: false,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    description: 'Help deserving students achieve their dreams through our comprehensive scholarship program. Every peso counts toward building the next generation of leaders.',
    story: 'Founded in 2010, this scholarship fund has helped over 200 students complete their college education. With rising tuition costs, your support is more critical than ever. Join 128 generous alumni who have already contributed to this life-changing initiative.',
    testimonials: [
      { name: 'Juan dela Cruz', text: 'This scholarship changed my life. I graduated debt-free and now work at a top firm.', avatar: 'https://ui-avatars.com/api/?name=Juan+Cruz&background=93c5fd&color=1e3a8a' },
      { name: 'Ana Reyes', text: 'Without this fund, I would have dropped out in my 2nd year. Forever grateful!', avatar: 'https://ui-avatars.com/api/?name=Ana+Reyes&background=a5f3fc&color=164e63' }
    ],
    benefits: ['Tax deductible receipt', 'Quarterly impact report', 'Scholar updates newsletter', 'Recognition in annual report'],
    tags: ['Education', 'Scholarship', 'Students']
  },
  {
    id: 'c2', title: 'Library Modernization', category: 'Facilities',
    goal: 800000, raised: 654000, donors: 89, daysLeft: 12, featured: true, urgent: true,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
    description: 'Transform our library into a state-of-the-art learning hub with digital resources, quiet study pods, and modern tech infrastructure.',
    story: 'Our library, built in 1985, serves over 5,000 students daily but lacks modern digital resources. This campaign will fund 50 new computer stations, high-speed internet, digital periodical subscriptions, and comfortable study spaces.',
    testimonials: [
      { name: 'Prof. Linda Tan', text: 'The library is the heart of any university. This upgrade is long overdue.', avatar: 'https://ui-avatars.com/api/?name=Linda+Tan&background=bbf7d0&color=14532d' }
    ],
    benefits: ['Naming rights for donors ₱50K+', 'Digital access pass', 'Impact certificate', 'Facility tour invitation'],
    tags: ['Facilities', 'Technology', 'Infrastructure']
  },
  {
    id: 'c3', title: 'Sports Complex Renovation', category: 'Sports',
    goal: 1200000, raised: 289000, donors: 45, daysLeft: 90, featured: false, urgent: false,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    description: 'Renovate our aging sports facilities to give student athletes world-class training grounds and inspire the next generation of champions.',
    story: 'Our alumni athletes have competed at national level for decades, but our facilities have not kept pace. This renovation will include a new gymnasium floor, upgraded locker rooms, and outdoor courts resurfacing.',
    testimonials: [
      { name: 'Coach Ramon Bautista', text: 'Our athletes deserve better. Help us build facilities worthy of their dedication.', avatar: 'https://ui-avatars.com/api/?name=Ramon+Bautista&background=fde68a&color=78350f' }
    ],
    benefits: ['Sports event VIP tickets', 'Wall of fame inclusion', 'Alumni game invitation', 'Training facility access'],
    tags: ['Sports', 'Athletics', 'Facilities']
  },
  {
    id: 'c4', title: 'COVID Relief for Students', category: 'Emergency',
    goal: 250000, raised: 198000, donors: 203, daysLeft: 5, featured: false, urgent: true,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80',
    description: 'Immediate financial assistance for students and families severely impacted by ongoing hardships. Help us reach our goal in the next 5 days!',
    story: 'Many of our current students come from families who lost income. This emergency fund provides direct cash assistance, food vouchers, and internet subsidies to keep vulnerable students enrolled and connected.',
    testimonials: [
      { name: 'Student Council President', text: 'We have 47 students at risk of dropping out this semester. Every donation helps keep them in school.', avatar: 'https://ui-avatars.com/api/?name=Student+Council&background=fca5a5&color=7f1d1d' }
    ],
    benefits: ['Immediate impact', 'Weekly progress updates', 'Student thank you letters', 'Recognition on portal'],
    tags: ['Emergency', 'Relief', 'Students']
  }
];

// ─── EVENTS ──────────────────────────────────────────────────────────────────
export const EVENTS = [
  {
    id: 'e1', title: 'Homecoming Gala 2025', date: '2025-08-15', time: '6:00 PM',
    location: 'Grand Ballroom, Marco Polo Hotel, Davao City',
    category: 'Social', rsvp: true, attendees: 234, maxAttendees: 300,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    description: 'Join us for an evening of nostalgia, networking, and celebration as we bring together alumni from all batches.',
    fee: 1500, rsvpDeadline: '2025-08-01'
  },
  {
    id: 'e2', title: 'Alumni Career Fair', date: '2025-07-20', time: '9:00 AM',
    location: 'University Gymnasium, Main Campus',
    category: 'Career', rsvp: false, attendees: 89, maxAttendees: 200,
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
    description: 'Connect current students with successful alumni mentors and top employers. Booth space available for alumni-owned businesses.',
    fee: 0, rsvpDeadline: '2025-07-15'
  },
  {
    id: 'e3', title: 'Batch 2015 Reunion', date: '2025-09-05', time: '3:00 PM',
    location: 'Campus Grounds & Alumni Hall',
    category: 'Reunion', rsvp: true, attendees: 67, maxAttendees: 100,
    image: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&q=80',
    description: 'A decade of memories! The Batch 2015 ten-year reunion featuring a campus tour, photo exhibition, and dinner.',
    fee: 800, rsvpDeadline: '2025-08-25'
  },
  {
    id: 'e4', title: 'Alumni Leadership Summit', date: '2025-10-10', time: '8:00 AM',
    location: 'Convention Center, Davao City',
    category: 'Professional', rsvp: false, attendees: 156, maxAttendees: 250,
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
    description: 'A full-day summit featuring keynote speakers, panel discussions, and workshops on leadership and innovation.',
    fee: 2500, rsvpDeadline: '2025-09-30'
  },
  {
    id: 'e5', title: 'Christmas Charity Drive', date: '2025-12-18', time: '10:00 AM',
    location: 'University Chapel & Grounds',
    category: 'Charity', rsvp: false, attendees: 45, maxAttendees: 500,
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&q=80',
    description: 'Annual charity drive collecting gifts, goods, and donations for underprivileged communities near the university.',
    fee: 0, rsvpDeadline: '2025-12-10'
  }
];

// ─── DONATIONS ───────────────────────────────────────────────────────────────
export const DONATION_HISTORY = [
  { id: 'd1', campaignId: 'c1', campaign: 'Scholarship Fund 2025', amount: 5000, date: '2025-03-15', method: 'GCash', status: 'completed', receipt: 'RCP-2025-0315-001' },
  { id: 'd2', campaignId: 'c2', campaign: 'Library Modernization', amount: 2500, date: '2025-02-28', method: 'Maya', status: 'completed', receipt: 'RCP-2025-0228-007' },
  { id: 'd3', campaignId: 'c4', campaign: 'COVID Relief for Students', amount: 1000, date: '2025-04-01', method: 'Credit Card', status: 'completed', receipt: 'RCP-2025-0401-003' },
  { id: 'd4', campaignId: 'c1', campaign: 'Scholarship Fund 2025', amount: 3000, date: '2024-12-20', method: 'GCash', status: 'completed', receipt: 'RCP-2024-1220-012' },
  { id: 'd5', campaignId: 'c3', campaign: 'Sports Complex Renovation', amount: 2000, date: '2024-11-05', method: 'Bank Transfer', status: 'completed', receipt: 'RCP-2024-1105-008' },
  { id: 'd6', campaignId: 'c2', campaign: 'Library Modernization', amount: 2000, date: '2025-04-10', method: 'GCash', status: 'pending', receipt: 'RCP-2025-0410-015' }
];

// ─── CERTIFICATES ────────────────────────────────────────────────────────────
export const CERTIFICATES = [
  { id: 'cert1', type: 'Donation Certificate', campaign: 'Scholarship Fund 2025', amount: 5000, date: '2025-03-15', certNo: 'CERT-SCH-2025-0047' },
  { id: 'cert2', type: 'Impact Recognition', campaign: 'Library Modernization', amount: 2500, date: '2025-02-28', certNo: 'CERT-LIB-2025-0019' },
  { id: 'cert3', type: 'Donor of the Quarter', campaign: 'Multiple Campaigns', amount: 8500, date: '2025-01-31', certNo: 'CERT-DOQ-Q1-2025' }
];

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
export const NOTIFICATIONS = [
  { id: 'n1', type: 'campaign', title: 'Library Modernization is almost funded!', message: '81% funded — only ₱146,000 more needed. Be part of the final push!', time: '2 hours ago', read: false, icon: '🎯' },
  { id: 'n2', type: 'transaction', title: 'Donation confirmed', message: 'Your ₱2,000 donation to Library Modernization has been received. Thank you!', time: '1 day ago', read: false, icon: '✅' },
  { id: 'n3', type: 'event', title: 'Homecoming Gala reminder', message: 'The Homecoming Gala is in 30 days. Reserve your seat now before slots run out.', time: '2 days ago', read: true, icon: '🎉' },
  { id: 'n4', type: 'campaign', title: 'COVID Relief — 5 days left!', message: 'Urgent: Only 5 days left to reach the COVID Relief goal. Share and donate now!', time: '3 days ago', read: true, icon: '⚠️' },
  { id: 'n5', type: 'system', title: 'Profile verified', message: 'Your alumni profile has been verified. You now have full access to all features.', time: '1 week ago', read: true, icon: '🏅' },
  { id: 'n6', type: 'transaction', title: 'Receipt ready', message: 'Your donation receipt RCP-2025-0315-001 is available for download.', time: '1 week ago', read: true, icon: '📄' }
];

// ─── TOP DONORS ───────────────────────────────────────────────────────────────
export const TOP_DONORS = [
  { rank: 1, name: 'Roberto Gomez', batch: '2005', amount: 85000, avatar: 'https://ui-avatars.com/api/?name=Roberto+Gomez&background=fde68a&color=78350f' },
  { rank: 2, name: 'Elena Villanueva', batch: '2010', amount: 72000, avatar: 'https://ui-avatars.com/api/?name=Elena+Villanueva&background=e9d5ff&color=4c1d95' },
  { rank: 3, name: 'Carlos Mendoza', batch: '2012', amount: 58500, avatar: 'https://ui-avatars.com/api/?name=Carlos+Mendoza&background=bfdbfe&color=1e3a8a' },
  { rank: 4, name: 'Maria Santos', batch: '2015', amount: 15500, avatar: 'https://ui-avatars.com/api/?name=Maria+Santos&background=2563eb&color=fff' },
  { rank: 5, name: 'Jose Bautista', batch: '2008', amount: 13200, avatar: 'https://ui-avatars.com/api/?name=Jose+Bautista&background=d1fae5&color=064e3b' }
];

// ─── LEADERBOARD ─────────────────────────────────────────────────────────────
export const BATCH_LEADERBOARD = [
  { rank: 1, batch: 'Batch 2005', members: 45, totalDonated: 425000, avgDonation: 9444, trend: 'up', change: '+12%' },
  { rank: 2, batch: 'Batch 2010', members: 52, totalDonated: 380000, avgDonation: 7307, trend: 'up', change: '+8%' },
  { rank: 3, batch: 'Batch 2008', members: 38, totalDonated: 315000, avgDonation: 8289, trend: 'down', change: '-3%' },
  { rank: 4, batch: 'Batch 2012', members: 61, totalDonated: 298000, avgDonation: 4885, trend: 'up', change: '+22%' },
  { rank: 5, batch: 'Batch 2015', members: 73, totalDonated: 254000, avgDonation: 3479, trend: 'up', change: '+5%' },
  { rank: 6, batch: 'Batch 2018', members: 88, totalDonated: 187000, avgDonation: 2125, trend: 'down', change: '-1%' },
  { rank: 7, batch: 'Batch 2020', members: 95, totalDonated: 142000, avgDonation: 1494, trend: 'up', change: '+31%' }
];

// ─── ADMIN STATS ─────────────────────────────────────────────────────────────
export const ADMIN_STATS = {
  totalRaised: 1483000,
  totalDonors: 465,
  activeCampaigns: 4,
  monthlyGrowth: 18.5,
  monthlyData: [
    { month: 'Jan', amount: 85000 }, { month: 'Feb', amount: 120000 },
    { month: 'Mar', amount: 95000 }, { month: 'Apr', amount: 145000 },
    { month: 'May', amount: 178000 }, { month: 'Jun', amount: 210000 },
    { month: 'Jul', amount: 192000 }, { month: 'Aug', amount: 158000 }
  ],
  categoryBreakdown: [
    { category: 'Education', amount: 540000, pct: 36 },
    { category: 'Facilities', amount: 430000, pct: 29 },
    { category: 'Emergency', amount: 300000, pct: 20 },
    { category: 'Sports', pct: 15, amount: 213000 }
  ]
};

// ─── ACADEMIC RECORDS ────────────────────────────────────────────────────────
export const ACADEMIC_RECORDS = {
  studentId: '2015-00123',
  program: 'BS Computer Science',
  college: 'College of Computing & Information Sciences',
  yearGraduated: 2019,
  honors: 'Cum Laude',
  gwa: 1.45,
  awards: ['Dean\'s List AY 2016-2017', 'Best Thesis Award 2019', 'Leadership Excellence Award'],
  credentials: [
    { name: 'Official Transcript of Records', type: 'TOR', available: true },
    { name: 'Diploma Certificate', type: 'Diploma', available: true },
    { name: 'Certificate of Graduation', type: 'COG', available: true },
    { name: 'Certificate of Good Moral', type: 'CGM', available: true }
  ]
};

export function formatCurrency(amount) {
  return '₱' + amount.toLocaleString('en-PH');
}
