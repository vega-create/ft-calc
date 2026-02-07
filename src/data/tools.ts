export interface Tool {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  keywords: string[];
}

export const categories = [
  { id: 'everyday', name: 'Everyday Math', icon: '🔢' },
  { id: 'finance', name: 'Finance', icon: '💰' },
  { id: 'time', name: 'Time & Date', icon: '📅' },
  { id: 'health', name: 'Health', icon: '❤️' },
  { id: 'academic', name: 'Academic', icon: '🎓' },
  { id: 'conversion', name: 'Conversion', icon: '🔄' },
];

export const tools: Tool[] = [
  // Everyday Math
  {
    slug: 'percentage',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, percentage change, and percentage difference easily.',
    icon: '%',
    category: 'everyday',
    keywords: ['percentage', 'percent', 'calculate percentage'],
  },
  {
    slug: 'tip',
    name: 'Tip Calculator',
    description: 'Calculate tip amount and split the bill among friends quickly.',
    icon: '💵',
    category: 'everyday',
    keywords: ['tip', 'tip calculator', 'restaurant tip'],
  },
  {
    slug: 'discount',
    name: 'Discount Calculator',
    description: 'Find the sale price after applying a discount percentage.',
    icon: '🏷️',
    category: 'everyday',
    keywords: ['discount', 'sale price', 'percent off'],
  },
  {
    slug: 'average',
    name: 'Average Calculator',
    description: 'Calculate the mean, median, and mode of a set of numbers.',
    icon: '📊',
    category: 'everyday',
    keywords: ['average', 'mean', 'median', 'mode'],
  },
  {
    slug: 'random-number',
    name: 'Random Number Generator',
    description: 'Generate random numbers within a custom range instantly.',
    icon: '🎲',
    category: 'everyday',
    keywords: ['random number', 'random', 'number generator'],
  },
  // Finance
  {
    slug: 'compound-interest',
    name: 'Compound Interest Calculator',
    description: 'See how your savings grow over time with compound interest.',
    icon: '📈',
    category: 'finance',
    keywords: ['compound interest', 'savings', 'investment growth'],
  },
  {
    slug: 'loan',
    name: 'Loan Calculator',
    description: 'Calculate monthly payments, total interest, and loan amortization.',
    icon: '🏦',
    category: 'finance',
    keywords: ['loan', 'monthly payment', 'amortization'],
  },
  {
    slug: 'salary',
    name: 'Salary to Hourly Converter',
    description: 'Convert annual salary to hourly rate and vice versa.',
    icon: '💼',
    category: 'finance',
    keywords: ['salary', 'hourly rate', 'wage converter'],
  },
  {
    slug: 'unit-price',
    name: 'Unit Price Calculator',
    description: 'Compare prices per unit to find the best deal while shopping.',
    icon: '🛒',
    category: 'finance',
    keywords: ['unit price', 'price per unit', 'best deal'],
  },
  // Time & Date
  {
    slug: 'age',
    name: 'Age Calculator',
    description: 'Calculate your exact age in years, months, and days.',
    icon: '🎂',
    category: 'time',
    keywords: ['age', 'birthday', 'how old'],
  },
  {
    slug: 'date-difference',
    name: 'Date Difference Calculator',
    description: 'Find the number of days, weeks, or months between two dates.',
    icon: '📆',
    category: 'time',
    keywords: ['date difference', 'days between', 'date calculator'],
  },
  {
    slug: 'time-zone',
    name: 'Time Zone Converter',
    description: 'Convert time between different time zones around the world.',
    icon: '🌍',
    category: 'time',
    keywords: ['time zone', 'convert time', 'world clock'],
  },
  // Health
  {
    slug: 'bmi',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and see your weight category.',
    icon: '⚖️',
    category: 'health',
    keywords: ['BMI', 'body mass index', 'weight category'],
  },
  {
    slug: 'calorie',
    name: 'Calorie Calculator',
    description: 'Estimate your daily calorie needs based on age, weight, and activity.',
    icon: '🔥',
    category: 'health',
    keywords: ['calorie', 'TDEE', 'daily calories'],
  },
  {
    slug: 'body-fat',
    name: 'Body Fat Percentage Calculator',
    description: 'Estimate your body fat percentage using the US Navy method.',
    icon: '📏',
    category: 'health',
    keywords: ['body fat', 'fat percentage', 'navy method'],
  },
  // Academic
  {
    slug: 'gpa',
    name: 'GPA Calculator',
    description: 'Calculate your Grade Point Average from letter grades and credits.',
    icon: '🎓',
    category: 'academic',
    keywords: ['GPA', 'grade point average', 'college GPA'],
  },
  {
    slug: 'grade',
    name: 'Grade Calculator',
    description: 'Find out what grade you need on your final exam to pass.',
    icon: '📝',
    category: 'academic',
    keywords: ['grade', 'final grade', 'exam score'],
  },
  // Conversion
  {
    slug: 'temperature',
    name: 'Temperature Converter',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin instantly.',
    icon: '🌡️',
    category: 'conversion',
    keywords: ['temperature', 'celsius', 'fahrenheit', 'kelvin'],
  },
  {
    slug: 'length',
    name: 'Length Converter',
    description: 'Convert between meters, feet, inches, centimeters, and more.',
    icon: '📐',
    category: 'conversion',
    keywords: ['length', 'convert meters', 'feet to cm'],
  },
  {
    slug: 'weight',
    name: 'Weight Converter',
    description: 'Convert between kilograms, pounds, ounces, and grams.',
    icon: '🏋️',
    category: 'conversion',
    keywords: ['weight', 'kg to lbs', 'pounds to kg'],
  },
];

export function getToolsByCategory(categoryId: string) {
  return tools.filter(t => t.category === categoryId);
}

export function getToolBySlug(slug: string) {
  return tools.find(t => t.slug === slug);
}
