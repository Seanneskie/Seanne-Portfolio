# Shared Search Box Component

A reusable Bootstrap search box lives at `sections/components/search-box.html`.
Use the helper function `loadSearchBox` to inject it into a section and
customize the input id and placeholder text.

## Usage

1. **Add a container** where the search box should appear in your section HTML:
   ```html
   <div id="mySearchBox"></div>
   ```

2. **Load the partial** after the section is rendered:
   ```javascript
   loadSearchBox('mySearchBox', 'myInputId', 'Search items...', 'Search items', () => {
     // optional: code that relies on the input existing
   });
   ```

This ensures a consistent search UI across sections without duplicating markup.
