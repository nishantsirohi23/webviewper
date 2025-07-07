type FAQItem = {
  question: string;
  answer: string;
};

export const desktopHeaderPhrase = ['Frequently asked', 'questions'];
export const mobileHeaderPhrase = ['Frequently', 'asked', 'questions'];
export const animate = {
  initial: {
    y: '100%',
    opacity: 0,
  },
  open: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: { duration: 1, delay: 0.1 * i, ease: [0.33, 1, 0.68, 1] },
  }),
};

export const faqData: FAQItem[] = [
  {
    question: 'How do I book a service on PerPenny?',
    answer:
      'Simply select the service you need, view available professionals, check their ratings and prices, choose one that fits your needs, and confirm your booking for your preferred date and time.',
  },
  {
    question: 'Can I choose who comes to my home for the service?',
    answer:
      'Yes! PerPenny lets you view professional profiles, skills, pricing, and reviews so you can choose the expert that suits you best—no auto-assignments.',
  },
  {
    question: 'Are there any hidden or visiting charges?',
    answer:
      'No, there are no visiting or inspection charges. You only pay for the service you book and confirm upfront.',
  },
  {
    question: 'What if I need to reschedule or cancel a booking?',
    answer:
      'You can easily reschedule or cancel your booking through the PerPenny app or website before the service begins. No charges apply if done within the allowed time frame.',
  },
  {
    question: 'Are the service providers background verified?',
    answer:
      'Yes, all professionals on PerPenny go through a strict verification process including ID checks and service background reviews.',
  },
  {
    question: 'In which cities is PerPenny available?',
    answer:
      'PerPenny is currently available in over 5 major cities and expanding rapidly. You can check availability by entering your location on the website or app.',
  },
];

