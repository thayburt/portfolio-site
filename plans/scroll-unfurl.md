# Scroll Unfurl Plan

## Goal

Preserve the site's scroll/parchment immersion without displaying a conventional browser
scrollbar, while restoring the orientation feedback that the hidden scrollbar normally provides.

The page should feel as though the parchment unfurls as the reader moves through the resume.

## Current Decision

Keep native document scrolling and continue hiding the visual scrollbar.

This is an intentional usability tradeoff rather than a complete accessibility fix. The eventual
unfurl treatment should compensate with a themed visual progress indicator while preserving all
standard scrolling controls.

## Required Behavior

- Keep content in normal document flow.
- Preserve mouse wheel, trackpad, touch, keyboard, Page Up/Down, Home/End, and Space scrolling.
- Do not intercept, smooth, accelerate, or otherwise replace native scrolling.
- Make animation reflect scroll position instead of controlling it.
- Keep the entire document readable when CSS animation or JavaScript is unavailable.
- Avoid custom nested scroll containers.
- Respect `prefers-reduced-motion`.
- Do not use animation state to hide content from assistive technology.

## Recommended Design

Combine two complementary effects:

1. **Parchment unfurl**
   - Tie decorative parchment edges, shadows, masks, or scroll rollers to document progress.
   - Keep the effect visual only; the document height and content layout remain unchanged.
   - Prefer transform, opacity, mask, and shadow changes that avoid repeated layout work.

2. **Themed progress marker**
   - Add a fixed quill, ribbon, wax seal, or scroll rod near one edge of the viewport.
   - Move or fill it according to reading progress.
   - Keep it decorative unless it is implemented as an accessible navigation control.

Optional section markers for Skills, Experience, and Education can supplement the progress marker.
If interactive, they should be semantic links to the existing section IDs with visible focus states.

## Implementation Approach

### Base Experience

The default page remains a complete static parchment with native scrolling. This is the fallback
for unsupported browsers, disabled JavaScript, and reduced-motion users.

### CSS Enhancement

Use CSS scroll-driven animations when supported:

```css
@supports (animation-timeline: scroll()) {
	/* Attach decorative unfurl effects to the document scroll timeline. */
}
```

`animation-timeline` does not yet have universal browser support, so it cannot be required for
content visibility or navigation.

### JavaScript Fallback

If consistent cross-browser progress is required, use a small passive scroll listener:

- Read `document.documentElement.scrollTop`.
- Calculate progress from the scrollable document height.
- Schedule visual updates with `requestAnimationFrame`.
- Write one CSS custom property such as `--scroll-progress`.
- Register listeners once and clean them up across Astro page transitions.

Do not use JavaScript to reposition the document or synthesize scrolling.

### Reduced Motion

Under `prefers-reduced-motion: reduce`:

- Disable unfurl movement, scaling, and large panning effects.
- Show the full parchment immediately.
- Either keep the progress marker static or update it without transitions.
- Preserve section navigation and all native scrolling behavior.

## Suggested Phases

1. Prototype a noninteractive progress marker using scroll progress.
2. Add reduced-motion and unsupported-browser fallbacks.
3. Prototype the parchment edge or roller unfurl effect.
4. Test Chrome, Firefox, Safari, Android, and iOS behavior.
5. Test keyboard-only scrolling and browser zoom up to 200%.
6. Add optional accessible section navigation if orientation still feels weak.
7. Measure animation smoothness and remove effects that trigger layout or excessive painting.

## Acceptance Criteria

- The resume is fully readable with animations disabled.
- Native scrolling works with keyboard, pointer, touch, and assistive input.
- The page never traps focus or scroll position.
- The progress treatment accurately communicates approximate document position.
- Reduced-motion users receive no large-scale unfurl movement.
- Unsupported browsers receive the normal static parchment.
- No animation is required to reveal or access content.

## Avoid

- Scroll-jacking or forced smooth scrolling.
- Replacing the document scrollbar with a draggable-only custom control.
- Full-page nested scroll containers.
- Delaying content visibility until JavaScript executes.
- Pinning large sections for long distances.
- Large continuous scale or pan effects without a reduced-motion alternative.

## References

- [MDN: CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)
- [MDN: animation-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
- [WCAG: Keyboard accessibility](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html)
