/**
 * The cases the parity test renders twice, once through each Svelte original
 * and once through its port. Props carry the original's names (`class`,
 * `for`, `onclick`, `maxlength`), and the React harness translates them.
 *
 * `children` and every entry of `slots` are plain text, which each harness
 * wraps in a span and hands over as a snippet or as nodes. A few values mean
 * the same thing to both harnesses:
 * - `icon: TEST_ICON` is an icon component that draws the size and class it gets
 * - an Accordion's `items` become AccordionItems inside it
 * - a Field's control is always the wired input both harnesses build from the ids it hands over
 */

export const COMPONENTS = [
  'SectionHeading',
  'Button',
  'Card',
  'Badge',
  'Accordion',
  'AccordionItem',
  'Field',
  'Label',
  'Input',
  'Textarea',
  'Checkbox',
  'FormMessage',
  'Section',
  'Columns',
  'Prose',
  'Image',
  'Quote',
  'NavBar',
  'Footer',
  'Gallery',
] as const;

export type ComponentName = (typeof COMPONENTS)[number];

export interface ParityCase {
  name: string;
  component: ComponentName;
  props: Record<string, unknown>;
  children?: string;
  slots?: Record<string, string>;
}

export const TEST_ICON = 'test-icon';

const noop = () => {};

const VARIANTS = ['primary', 'secondary', 'danger', 'ghost', 'outline', 'violet'];
const TONES = ['neutral', 'brand', 'violet', 'success', 'warn', 'danger'];
const RATIOS = ['1/1', '4/3', '3/2', '16/9'];
const NETWORKS = ['x', 'linkedin', 'github', 'instagram', 'facebook', 'youtube', 'mastodon'];

const faq = [
  { id: 'included', title: 'What is included?', text: 'Every block.' },
  { id: 'cancel', title: 'Can I cancel?', text: 'At any time.' },
];

export const CASES: ParityCase[] = [
  // SectionHeading
  { name: 'heading at level 2', component: 'SectionHeading', props: {}, children: 'Plans' },
  { name: 'heading at level 3', component: 'SectionHeading', props: { level: 3 }, children: 'Plans' },
  {
    name: 'eyebrow heading at level 2 with a class',
    component: 'SectionHeading',
    props: { variant: 'eyebrow', class: 'mb-4' },
    children: 'New',
  },
  {
    name: 'eyebrow heading at level 3 with actions',
    component: 'SectionHeading',
    props: { level: 3, variant: 'eyebrow' },
    children: 'Team',
    slots: { actions: 'Invite' },
  },

  // Button
  ...VARIANTS.map((variant) => ({
    name: `${variant} button`,
    component: 'Button' as const,
    props: { variant },
    children: 'Save',
  })),
  ...['sm', 'lg', 'icon'].map((size) => ({
    name: `${size} button`,
    component: 'Button' as const,
    props: { size },
    children: 'Save',
  })),
  { name: 'disabled button', component: 'Button', props: { disabled: true }, children: 'Save' },
  { name: 'loading button', component: 'Button', props: { loading: true }, children: 'Saving' },
  {
    name: 'loading large button',
    component: 'Button',
    props: { loading: true, size: 'lg' },
    children: 'Saving',
  },
  {
    name: 'full submit button with a class, a handler and forwarded attributes',
    component: 'Button',
    props: {
      type: 'submit',
      full: true,
      class: 'mt-2',
      onclick: noop,
      name: 'intent',
      value: 'save',
      'aria-label': 'Save the draft',
      'data-step': 'one',
    },
    children: 'Save',
  },
  { name: 'button as a link', component: 'Button', props: { href: '/start' }, children: 'Start' },
  {
    name: 'button as a disabled link',
    component: 'Button',
    props: { href: '/start', disabled: true, variant: 'outline' },
    children: 'Start',
  },
  {
    name: 'button as a loading link',
    component: 'Button',
    props: { href: '/start', loading: true },
    children: 'Start',
  },
  {
    name: 'button as a link with an unsafe scheme',
    component: 'Button',
    props: { href: 'java\tscript:alert(1)', target: '_blank', rel: 'noopener' },
    children: 'Start',
  },

  // Card
  { name: 'card with a title', component: 'Card', props: { title: 'Studio' }, children: 'Body' },
  {
    name: 'card with a title, a description and a footer',
    component: 'Card',
    props: { title: 'Studio', description: 'Rooms to rent.' },
    children: 'Body',
    slots: { footer: 'Book' },
  },
  {
    name: 'card with a heading, an icon, a meta and a description',
    component: 'Card',
    props: { heading: 'Usage', icon: TEST_ICON, meta: '3 of 5', description: 'This month.' },
    children: 'Body',
  },
  {
    name: 'card with a level 2 heading',
    component: 'Card',
    props: { heading: 'Usage', headingLevel: 2 },
    children: 'Body',
  },
  {
    name: 'card whose header wins over its heading',
    component: 'Card',
    props: { heading: 'Ignored', title: 'Ignored' },
    children: 'Body',
    slots: { header: 'Custom header' },
  },
  {
    name: 'card with an image and no size',
    component: 'Card',
    props: { title: 'Studio', image: { src: '/studio.jpg', alt: 'A desk' } },
    children: 'Body',
  },
  {
    name: 'card with a square image',
    component: 'Card',
    props: { image: { src: '/studio.jpg', alt: '', ratio: '1/1' } },
    children: 'Body',
  },
  {
    name: 'card with a sized image',
    component: 'Card',
    props: { image: { src: '/studio.jpg', alt: 'A desk', width: 640, height: 480 } },
    children: 'Body',
  },
  ...['none', 'sm', 'lg'].map((pad) => ({
    name: `card with pad ${pad}`,
    component: 'Card' as const,
    props: { pad },
    children: 'Body',
  })),
  { name: 'hover card with a class', component: 'Card', props: { hover: true, class: 'h-full' }, children: 'Body' },
  {
    name: 'clickable card',
    component: 'Card',
    props: { title: 'Open', onclick: noop, onkeydown: noop },
    children: 'Body',
  },
  { name: 'card with only a key handler', component: 'Card', props: { onkeydown: noop }, children: 'Body' },

  // Badge
  ...TONES.map((tone) => ({
    name: `${tone} badge`,
    component: 'Badge' as const,
    props: { tone },
    children: 'New',
  })),
  ...TONES.map((tone) => ({
    name: `${tone} badge with a dot`,
    component: 'Badge' as const,
    props: { tone, dot: true },
    children: 'Live',
  })),
  { name: 'medium badge with a class', component: 'Badge', props: { size: 'md', class: 'ms-2' }, children: 'New' },

  // Accordion
  { name: 'accordion with two items', component: 'Accordion', props: { items: faq } },
  {
    name: 'accordion that keeps several open',
    component: 'Accordion',
    props: { items: faq, multiple: true },
  },
  {
    name: 'flush accordion with a class',
    component: 'Accordion',
    props: { items: [{ ...faq[0], class: 'px-2' }, faq[1]], flush: true, class: 'mt-4' },
  },

  // AccordionItem
  {
    name: 'accordion item on its own',
    component: 'AccordionItem',
    props: { id: 'refunds', title: 'Refunds' },
    children: 'Within 30 days.',
  },
  {
    name: 'accordion item with a class',
    component: 'AccordionItem',
    props: { id: 'refunds', title: 'Refunds', class: 'text-lg' },
    children: 'Within 30 days.',
  },

  // Field
  { name: 'field with a label and a hint', component: 'Field', props: { label: 'Email', hint: 'Replies go here.' } },
  {
    name: 'field with an error over its hint',
    component: 'Field',
    props: { label: 'Email', hint: 'Replies go here.', error: 'Enter an address.', required: true },
  },
  { name: 'field with a hidden label', component: 'Field', props: { label: 'Email', labelHidden: true } },
  {
    name: 'field holding a group',
    component: 'Field',
    props: { label: 'Plan', group: true, required: true, labelHidden: true },
  },
  {
    name: 'field with its own id and a class',
    component: 'Field',
    props: { id: 'email', label: 'Email', hint: 'Work address.', class: 'col-span-2' },
  },
  { name: 'field with no label', component: 'Field', props: { error: 'Required.' } },

  // Label
  { name: 'label', component: 'Label', props: {}, children: 'Email' },
  {
    name: 'required label for a control',
    component: 'Label',
    props: { for: 'email', required: true },
    children: 'Email',
  },
  {
    name: 'label with a hint and a class',
    component: 'Label',
    props: { for: 'email', hint: 'optional', class: 'mb-1' },
    children: 'Email',
  },

  // Input
  { name: 'bare input', component: 'Input', props: {} },
  {
    name: 'required input with an error',
    component: 'Input',
    props: { label: 'Name', name: 'name', required: true, error: 'Enter a name.' },
  },
  {
    name: 'input with a hint and caller ids',
    component: 'Input',
    props: { label: 'Slug', hint: 'Lower case.', describedBy: 'outer-note', mono: true },
  },
  {
    name: 'input with caller ids and no message',
    component: 'Input',
    props: { describedBy: 'outer-a outer-b', 'aria-label': 'Search' },
  },
  {
    name: 'email input with a value and a placeholder',
    component: 'Input',
    props: { type: 'email', value: 'a@example.com', placeholder: 'you@example.com', autocomplete: 'email' },
  },
  {
    name: 'disabled input with its own id, noAI and a class',
    component: 'Input',
    props: { id: 'key', label: 'Key', disabled: true, noAI: true, class: 'w-64' },
  },

  // Textarea
  {
    name: 'textarea with a label, a hint and a cap',
    component: 'Textarea',
    props: { label: 'Message', name: 'message', hint: 'Up to 500 characters.', maxlength: 500 },
  },
  { name: 'bare textarea', component: 'Textarea', props: {} },
  {
    name: 'textarea with a value, rows and a placeholder',
    component: 'Textarea',
    props: { value: 'Hello there.', rows: 8, placeholder: 'Write...' },
  },
  {
    name: 'required disabled read-only textarea',
    component: 'Textarea',
    props: { label: 'Notes', required: true, disabled: true, readonly: true },
  },
  {
    name: 'fixed monospace textarea with an error, noAI and a class',
    component: 'Textarea',
    props: { id: 'json', resize: false, mono: true, error: 'Not valid JSON.', noAI: true, class: 'mt-2' },
  },

  // Checkbox
  {
    name: 'checkbox with a label and a hint',
    component: 'Checkbox',
    props: { label: 'Send me news', name: 'news', hint: 'One email a month.' },
  },
  { name: 'bare checkbox', component: 'Checkbox', props: {} },
  {
    name: 'checked checkbox with a value',
    component: 'Checkbox',
    props: { label: 'Terms', checked: true, name: 'terms', value: 'yes', required: true },
  },
  {
    name: 'part-checked checkbox with a description',
    component: 'Checkbox',
    props: { label: 'All rows', indeterminate: true, description: 'Some are selected.' },
  },
  {
    name: 'checkbox with an error over its hint and description',
    component: 'Checkbox',
    props: { label: 'Terms', error: 'Accept the terms.', hint: 'Read them first.', description: 'Version 2.' },
  },
  {
    name: 'checkbox with a hidden label and its own id',
    component: 'Checkbox',
    props: { id: 'row-1', label: 'Select row', labelHidden: true },
  },
  ...['sm', 'lg'].map((size) => ({
    name: `${size} checkbox with an icon`,
    component: 'Checkbox' as const,
    props: { size, label: 'Starred', icon: TEST_ICON },
  })),
  { name: 'checkbox with only an icon', component: 'Checkbox', props: { icon: TEST_ICON } },
  {
    name: 'card checkbox',
    component: 'Checkbox',
    props: { variant: 'card', label: 'Pro', description: 'Every block.' },
  },
  {
    name: 'checked card checkbox',
    component: 'Checkbox',
    props: { variant: 'card', label: 'Pro', checked: true },
  },
  {
    name: 'disabled card checkbox with noAI and a class',
    component: 'Checkbox',
    props: { variant: 'card', label: 'Pro', disabled: true, noAI: true, class: 'w-full' },
  },
  { name: 'disabled checkbox', component: 'Checkbox', props: { label: 'Locked', disabled: true } },

  // FormMessage
  { name: 'failure message', component: 'FormMessage', props: {}, children: 'Could not send.' },
  {
    name: 'confirmation with a class',
    component: 'FormMessage',
    props: { tone: 'success', class: 'mt-2' },
    children: 'Message sent.',
  },

  // Section
  {
    name: 'section with every part',
    component: 'Section',
    props: {
      label: 'Welcome',
      image: { src: '/hero.jpg', alt: '' },
      overlay: 'dark',
      height: 'tall',
    },
    children: 'Body',
    slots: { intro: 'Intro', footer: 'End' },
  },
  { name: 'plain section', component: 'Section', props: {}, children: 'Body' },
  { name: 'empty section', component: 'Section', props: {} },
  {
    name: 'section with a light overlay and no image',
    component: 'Section',
    props: { overlay: 'light', height: 'screen', class: 'text-center' },
    children: 'Body',
  },
  {
    name: 'section with an image, its alt and no overlay',
    component: 'Section',
    props: { image: { src: '/hero.jpg', alt: 'A coast' } },
    slots: { intro: 'Intro' },
  },

  // Columns
  { name: 'columns', component: 'Columns', props: {}, children: 'Column' },
  ...[2, 3, 4].map((max) => ({
    name: `columns capped at ${max}`,
    component: 'Columns' as const,
    props: { max },
    children: 'Column',
  })),
  { name: 'columns with a class', component: 'Columns', props: { class: 'items-center' }, children: 'Column' },

  // Prose
  { name: 'prose', component: 'Prose', props: {}, children: 'Paragraph' },
  { name: 'prose with a class', component: 'Prose', props: { class: 'mx-auto' }, children: 'Paragraph' },

  // Image
  { name: 'image at the default ratio', component: 'Image', props: { src: '/a.png', alt: 'A chart' } },
  ...RATIOS.map((ratio) => ({
    name: `image at ${ratio}`,
    component: 'Image' as const,
    props: { src: '/a.png', alt: 'A chart', ratio },
  })),
  {
    name: 'sized image with a caption',
    component: 'Image',
    props: { src: '/a.png', alt: 'A chart', width: 400, height: 300, caption: 'Caption' },
  },
  {
    name: 'image with one dimension, eager, with a class',
    component: 'Image',
    props: { src: '/a.png', alt: '', width: 400, loading: 'eager', class: 'shadow' },
  },
  {
    name: 'captioned image with a class',
    component: 'Image',
    props: { src: '/a.png', alt: 'A chart', caption: 'Caption', ratio: '3/2', class: 'my-4' },
  },

  // Quote
  { name: 'quote with a source', component: 'Quote', props: { source: 'A reader' }, children: 'Words' },
  { name: 'quote with a class', component: 'Quote', props: { class: 'my-8' }, children: 'Words' },

  // NavBar
  {
    name: 'navigation bar with every part',
    component: 'NavBar',
    props: {
      brand: 'Northwind',
      logo: { src: '/logo.svg', alt: 'Northwind', width: 64, height: 32 },
      links: [
        { label: 'Work', href: '/work', current: true },
        { label: 'About', href: '/about' },
        { label: 'Soon' },
      ],
      action: { label: 'Contact', href: '/contact' },
    },
  },
  { name: 'navigation bar with a brand', component: 'NavBar', props: { brand: 'Northwind' } },
  {
    name: 'navigation bar with a logo alone',
    component: 'NavBar',
    props: { logo: { src: '/logo.svg', alt: 'Northwind', width: 64, height: 32 }, label: 'Site', class: 'py-4' },
  },
  { name: 'empty navigation bar', component: 'NavBar', props: {} },

  // Footer
  {
    name: 'footer with every part',
    component: 'Footer',
    props: {
      links: [{ label: 'Privacy', href: '/privacy' }, { label: 'Made in Lisbon' }],
      social: [{ network: 'github', href: 'https://github.com/example' }],
    },
    slots: { note: 'Note' },
  },
  {
    name: 'footer with every network and its own names',
    component: 'Footer',
    props: {
      social: NETWORKS.map((network) => ({ network, href: `https://${network}.example/me` })),
      links: [{ label: 'Terms', href: '/terms' }],
      label: 'Legal',
      socialLabel: 'Profiles',
      class: 'mt-8',
    },
  },
  { name: 'empty footer', component: 'Footer', props: {} },

  // Gallery
  {
    name: 'gallery grid',
    component: 'Gallery',
    props: {
      images: [
        { src: '/a.jpg', alt: 'A desk', caption: 'Desk' },
        { src: '/b.jpg', alt: '' },
      ],
    },
  },
  {
    name: 'gallery row with a name and a class',
    component: 'Gallery',
    props: {
      layout: 'row',
      label: 'Work',
      class: 'mt-4',
      images: [{ src: '/a.jpg', alt: 'A desk', caption: 'Desk' }],
    },
  },
  { name: 'gallery row with the default name', component: 'Gallery', props: { layout: 'row', images: [{ src: '/a.jpg', alt: 'A desk' }] } },
  { name: 'empty gallery', component: 'Gallery', props: { images: [] } },
];
