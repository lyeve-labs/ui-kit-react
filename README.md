# ui-kit-react

React components drawn from [ui-kit](https://github.com/lyeve-labs/ui-kit),
the Svelte 5 component library behind LyEve. Each component renders the same
markup and classes as its Svelte original, so the kit's compiled stylesheet,
`site.css`, styles a React page the way it styles a Svelte one.

Nothing is published yet. The components are the ones a page for visitors
draws with: SectionHeading, Button, Card, Badge, Accordion, AccordionItem,
Field, Label, Input, Textarea, Checkbox, FormMessage, Section, Columns,
Prose, Image, Quote, NavBar, Footer and Gallery.

## Use

```tsx
import { Button, Section } from '@lyeve-labs/ui-kit-react';
import '@lyeve-labs/ui-kit-react/site.css';

export function Hero() {
  return (
    <Section label="Welcome" intro={<h1>Northwind</h1>}>
      <Button href="/start">Start</Button>
    </Section>
  );
}
```

Every component renders on the server and needs no script. None uses state,
an effect or context, so each one works as a React Server Component with no
`"use client"`. The ids a component generates come from `useId`. A page put
together from several server renders gives each render its own
`identifierPrefix`, or two accordions on it share a name.

React 19 is a peer dependency. The package has no runtime dependencies.

## Differences from the Svelte originals

Props keep the original names and defaults, except where React spells an
attribute its own way: `className` for `class`, `htmlFor` for `for`,
`maxLength`, `readOnly`, `onClick` and `onKeyDown`. A snippet becomes a prop
holding nodes, and Field's child is a function that receives the ids the
control must carry.

A Svelte control binds its value two ways. Here `value` or `checked` is the
starting state, and passing `onChange` as well makes the control controlled.
Textarea's `oninput` is `onChange`, which React fires at each keystroke.

Accordion hands its shared name to each item as a prop, so the items are its
direct children.

React hoists a preload hint for each image that is not lazy into the
document head, which the Svelte originals do not write.

### Left out

These need the kit's client machinery, and a control renders as it does
with none of it around:

- Button's `hint`, the tooltip that repeats an icon button's `aria-label`
- the form assistant wiring in Input, Textarea and Checkbox: the suggested
  value's tag, border and accept and reject buttons. `noAI` still marks the
  control `data-no-ai`.
- Checkbox's guard that puts a disabled box back after a scripted change,
  and the `indeterminate` property set on the input in the browser. The
  server writes the attribute, and `aria-checked` and the drawn mark carry
  the mixed state.
- FormMessage's two-frame wait before its text appears, which makes a
  screen reader read a message mounted after a submit. Here the text is
  there from the first render.

## Tests

A parity test renders a corpus of cases through each Svelte original from
the published kit and through its port, and compares the two after one
normalization: comments and whitespace-only text are dropped, attributes and
class tokens are sorted, and generated ids are renamed by first appearance.

```sh
pnpm check && pnpm test && pnpm build
```

## Branches

`main` holds tagged releases, and `dev` is where work lands. Branch from
`dev` and open pull requests against `dev`.

## License

MIT, see [LICENSE](LICENSE).
