import type { Messages } from './types.ts';

export const en: Messages = {
  meta: {
    title: 'AI Receptionist for Appointment-Based Businesses | Agendia Labs',
    description:
      'AI receptionist for appointment-based businesses: answers calls and WhatsApp 24/7, books and moves appointments in your calendar, and lets you know when it matters.',
    ogTitle: 'Every call you miss is an appointment you lose | Agendia Labs',
    ogDescription:
      'An AI receptionist that answers calls and WhatsApp at any hour and books appointments into your calendar. You keep working.',
    ogImageAlt: 'Agendia Labs: every call you miss is an appointment you lose',
    ogLocale: 'en_GB',
  },
  schema: {
    description:
      'AI receptionist for local appointment-based businesses: answers calls and WhatsApp messages, books and changes appointments, and alerts the owner when needed.',
    knowsAbout: ['AI receptionist', 'Call answering', 'WhatsApp booking', 'Appointment scheduling', 'Local SEO'],
  },
  common: {
    book: 'Book 15 minutes',
    step: 'Step',
    home: 'Agendia Labs home',
    mainNav: 'Main',
    menu: 'Menu',
    language: 'Language',
    skipToContent: 'Skip to content',
  },
  nav: {
    how: 'How it works',
    plans: 'Plans',
    faq: 'FAQ',
  },
  hero: {
    title: 'Every call you miss is an appointment you lose.',
    lead: 'An AI receptionist that answers calls and WhatsApp at any hour and books appointments into your calendar. You keep working.',
    sectors: 'For garages, vet clinics, physiotherapy and any business that works by appointment.',
    demoCta: 'Call and try it',
    note: 'No commitment · 15-minute call',
    preview: {
      label: 'Example: a call after hours',
      call: { title: 'Call answered', detail: '21:47 · Wants an appointment this week' },
      booked: { title: 'Appointment in your calendar', detail: 'Thursday, 9:00' },
      notice: { title: 'Alert for you', detail: 'New appointment confirmed' },
    },
  },
  problem: {
    title: 'Sound familiar?',
    items: {
      busy: {
        title: 'You’re with a customer and the phone rings.',
        text: 'You can’t drop what you’re doing, so the caller tries someone else.',
      },
      closed: {
        title: 'You close, and people keep calling.',
        text: 'At lunchtime, in the evening or at the weekend, nobody picks up.',
      },
      lateNight: {
        title: 'You’re answering WhatsApps at 11 at night.',
        text: 'So you don’t lose the booking, work follows you home.',
      },
    },
    exampleLabel: 'Do the maths',
    example: '3 missed calls a day. If 1 in 3 was a €60 appointment, that’s around €1,200 a month.',
    disclaimer: 'Illustrative example, not a guarantee.',
  },
  how: {
    title: 'How it works',
    lead: 'Three steps, without you having to stop what you’re doing.',
    steps: {
      contact: {
        title: 'They call or message you',
        text: 'By phone or on WhatsApp, at any hour.',
      },
      answer: {
        title: 'The receptionist replies, answers questions and books the appointment',
        text: 'It uses your business’s information: opening hours, services and free slots.',
      },
      booked: {
        title: 'The appointment lands in your calendar and you get an alert',
        text: 'And if something needs you, it lets you know.',
      },
    },
  },
  sectors: {
    title: 'For businesses that work by appointment',
    lead: 'Pick yours and see what a conversation would look like.',
    tabsLabel: 'Sectors',
    exampleLabel: 'Example conversation',
    speakers: { client: 'Customer', agent: 'Receptionist' },
    items: {
      garages: {
        label: 'Garages',
        pain: 'With your hands in an engine you can’t pick up the phone, and the customer calls the next garage.',
        conversation: [
          { from: 'client', text: 'Hi, could you do an oil change this week?' },
          { from: 'agent', text: 'Of course. I have a slot on Thursday at 9:00 or Friday at 12:00. Which suits you better?' },
          { from: 'client', text: 'Thursday at 9.' },
          { from: 'agent', text: 'Done: Thursday at 9:00, oil change. I’ll send you the confirmation on WhatsApp.' },
        ],
      },
      vets: {
        label: 'Vet clinics',
        pain: 'Between appointments the phone never stops, and reception can’t keep up.',
        conversation: [
          { from: 'client', text: 'Hi, I’d like to book my dog in for his vaccination.' },
          { from: 'agent', text: 'Perfect. Does tomorrow at 17:30 work for you?' },
          { from: 'client', text: 'Yes, that works.' },
          { from: 'agent', text: 'Booked: tomorrow at 17:30, vaccination. You’ll get a reminder before the appointment.' },
        ],
      },
      physio: {
        label: 'Physiotherapy',
        pain: 'In the middle of a session you can’t stop to answer, and the messages pile up.',
        conversation: [
          { from: 'client', text: 'Hi, do you have anything this week? My back’s been hurting.' },
          { from: 'agent', text: 'Yes. I can offer Wednesday at 19:00 or Thursday at 10:00.' },
          { from: 'client', text: 'Wednesday, please.' },
          { from: 'agent', text: 'Booked: Wednesday at 19:00. I’ll confirm it on WhatsApp.' },
        ],
      },
      other: {
        label: 'Other appointment-based business',
        pain: 'Hairdressers, beauty salons, academies, practices: if you work by appointment, the problem is the same.',
        conversation: [
          { from: 'client', text: 'Hi, I’d like to book an appointment for Saturday.' },
          { from: 'agent', text: 'On Saturday I have 10:00 and 12:30 free.' },
          { from: 'client', text: '10, please.' },
          { from: 'agent', text: 'All set: Saturday at 10:00. You’ll get the confirmation in a moment.' },
        ],
      },
    },
  },
  plans: {
    title: 'Plans',
    lead: 'Choose how your customers reach you.',
    cta: 'See if it’s right for me',
    featuredBadge: 'Most complete',
    items: {
      voice: {
        title: 'Voice receptionist',
        audience: 'For businesses that get more calls than they can answer.',
        features: ['Answers calls at any hour', 'Books and changes appointments in your calendar', 'Puts urgent calls through to you'],
      },
      whatsapp: {
        title: 'WhatsApp bookings',
        audience: 'For businesses that get lots of messages.',
        features: ['Answers questions straight away', 'Books and changes appointments in your calendar', 'Sends reminders before each appointment'],
      },
      both: {
        title: 'Voice + WhatsApp',
        audience: 'For businesses that want calls and messages covered.',
        features: ['Everything in the voice receptionist', 'Everything in WhatsApp bookings'],
      },
    },
    extra: {
      badge: 'Extra',
      title: 'Online presence',
      text: 'Website, Google Business Profile and local SEO, so people find you when they search for a business like yours nearby.',
    },
    note: 'Every business is different. We’ll recommend a plan on a 15-minute call.',
  },
  faq: {
    title: 'Frequently asked questions',
    intro: 'Something else on your mind? Email {email}.',
    items: [
      {
        q: 'Does it sound like a robot?',
        a: 'It speaks with a natural voice, but it’s an AI and doesn’t pretend to be a person. The best way to judge is to hear it yourself: we’ll show it to you on the 15-minute call.',
      },
      {
        q: 'What happens if it doesn’t know the answer?',
        a: 'It doesn’t make things up. It puts the call through to you or sends you an alert with the customer’s details and what they need, so you can reply yourself.',
      },
      {
        q: 'Does it work with my current calendar?',
        a: 'Right now we work with Google Calendar. If you use another calendar or software specific to your sector, tell us on the call and we’ll see whether it can be connected.',
      },
      {
        q: 'Do I need to change my phone number?',
        a: 'No. You can keep your number and forward calls to the receptionist (for example, when you don’t answer or the line is busy), or use a new number just for it. It’s your choice.',
      },
      {
        q: 'How long does it take to set up?',
        a: 'It depends on the business, but allow at least a week. We’ll give you a specific timeframe on the 15-minute call.',
      },
      {
        q: 'What happens to my customers’ data?',
        a: 'It’s handled in line with the GDPR and only used to look after your customers and manage their appointments. On the call we’ll explain where it’s stored and who has access.',
      },
      {
        q: 'Is there a minimum contract?',
        a: 'No. The service is monthly and you can cancel whenever you like, with 30 days’ notice.',
      },
    ],
  },
  booking: {
    title: 'Find out how many appointments you’re missing.',
    lead: 'Pick a 15-minute slot. We’ll look at how calls and messages reach you today and tell you which plan fits your business.',
    note: 'No commitment · 15-minute call',
    calendarTitle: 'Calendar to book a 15-minute call with Agendia Labs',
    formToggle: 'Prefer us to email you?',
    contactLine: 'Rather talk now? Call us on {phone} or message us on {whatsapp}.',
  },
  contact: {
    form: {
      title: 'We’ll get in touch',
      name: 'Name',
      company: 'Business',
      email: 'Email',
      phone: 'Phone',
      message: 'What would you like to improve?',
      messagePlaceholder: 'For example: I miss calls while I’m with customers and can’t call everyone back',
      optional: '(optional)',
      privacy:
        'Data controller: {owner}. Your details are only used to reply to your request and aren’t shared with third parties, other than the providers that run our services. You can access, correct or delete them. More in our {link}.',
      privacyLink: 'privacy policy',
      sendAnother: 'Send another request',
    },
  },
  footer: {
    custom: { text: 'Need another custom automation? {link}', link: 'Get in touch' },
    legal: '© {year} Agendia Labs.',
  },
  legal: {
    back: 'Back to home',
    updated: 'Last updated: {date}',
    identity: { owner: 'Owner', taxId: 'Tax ID (NIF)', address: 'Address', email: 'Email', phone: 'Phone' },
    pages: {
      notice: {
        title: 'Legal notice',
        description: 'Legal notice for Agendia Labs: who runs this website and the terms for using it.',
        sections: [
          {
            heading: 'Website owner',
            blocks: [
              'In line with article 10 of Spanish Law 34/2002 on information society services and electronic commerce (LSSI-CE), these are the details of the owner of this website:',
            ],
            identity: true,
          },
          {
            heading: 'Purpose',
            blocks: [
              'This website gives information about Agendia Labs’ services: an AI receptionist for appointment-based businesses, plus related online presence and automation services.',
            ],
          },
          {
            heading: 'Terms of use',
            blocks: [
              'Access to the website is free. By using it, you agree to do so lawfully and not to harm how it works or the systems that run it.',
            ],
          },
          {
            heading: 'Intellectual property',
            blocks: [
              'The text, design and logo of this website belong to its owner or are used with permission. They may not be copied or distributed without authorisation, except for personal use.',
            ],
          },
          {
            heading: 'Liability',
            blocks: [
              'We try to keep the information accurate and up to date, but it may contain errors. The sample conversations and calculations are illustrative and don’t guarantee any result.',
            ],
          },
          {
            heading: 'Third-party content',
            blocks: [
              'The website loads content from Google: the fonts and, when enabled, the booking calendar. These depend on Google and are covered by Google’s own terms.',
            ],
          },
          {
            heading: 'Data protection',
            blocks: ['How we handle your personal data is explained in our {privacyLink}.'],
          },
          {
            heading: 'Governing law',
            blocks: ['This legal notice is governed by Spanish law.'],
          },
        ],
      },
      privacy: {
        title: 'Privacy policy',
        description: 'How Agendia Labs handles the personal data collected through this website.',
        sections: [
          {
            heading: 'Data controller',
            blocks: ['The controller of your personal data is:'],
            identity: true,
          },
          {
            heading: 'What data we process',
            blocks: [
              'We only process the data you give us:',
              [
                'Contact form: name, business, email, phone (optional) and your message.',
                'Call booking: the details you enter when booking in the calendar, such as your name and email.',
                'Emails and messages you send us directly.',
              ],
              'The website doesn’t use its own cookies or any analytics tools. When it loads fonts from Google Fonts and, when enabled, the Google calendar, your browser connects to Google’s servers, which receive your IP address. The service that hosts the website (GitHub Pages) also logs visitors’ IP addresses for security.',
            ],
          },
          {
            heading: 'What we use it for',
            blocks: [
              'To reply to your request, prepare and hold any call you book and, if you become a customer, manage our relationship. We don’t make automated decisions about you or send you marketing without your permission.',
            ],
          },
          {
            heading: 'Legal basis',
            blocks: [
              'We process your data because you ask us for information or a proposal: steps taken at your request before entering into a contract (article 6(1)(b) GDPR). If you become a customer, the basis is the contract.',
            ],
          },
          {
            heading: 'How long we keep it',
            blocks: [
              'We keep your data for as long as we need to deal with your request. If you don’t become a customer, we delete it within 12 months at most. If you do, we keep it for as long as the relationship lasts and then for the periods required by law.',
            ],
          },
          {
            heading: 'Who we share it with',
            blocks: [
              'We don’t sell your data or pass it to third parties, unless required by law. To run our services we use these providers, which may process it on our behalf:',
              ['Google: email, calendar and fonts.', 'GitHub: website hosting.', 'Contact form handling: {formProvider}.'],
              'Some of these providers may process data outside the European Economic Area. In that case, transfers rely on the EU-US Data Privacy Framework or on standard contractual clauses approved by the European Commission, as stated by each provider.',
            ],
          },
          {
            heading: 'Your rights',
            blocks: [
              'You can ask to access, correct or delete your data, object to or restrict how we process it, or ask for a portable copy. Email us at {email} saying which right you want to exercise.',
              'If you think we haven’t handled your data properly, you can complain to the Spanish Data Protection Agency ({aepd}).',
            ],
          },
          {
            heading: 'Security',
            blocks: [
              'We take reasonable measures to protect your data, and only the people who need it to deal with your request can access it.',
            ],
          },
          {
            heading: 'Changes to this policy',
            blocks: ['If we change this policy, we’ll publish the new version here with its update date.'],
          },
        ],
      },
    },
  },
  client: {
    form: {
      errors: {
        name: 'Enter your name.',
        email: 'Enter your email address.',
        emailInvalid: 'Enter a valid email address, like name@business.com.',
        message: 'Tell us briefly what you’d like to improve.',
        network: 'Your request couldn’t be sent. Please try again or email us at {email}.',
      },
      submit: 'Send',
      sending: 'Sending...',
      sentTitle: 'Thanks, {name}.',
      sentBody: 'We’ll get back to you at {email}.',
      mailSubject: 'Request from {name} via the website',
    },
  },
};
