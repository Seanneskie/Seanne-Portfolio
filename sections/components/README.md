# Components

## search-box.html

Reusable Bootstrap search input with icon. Load it into a container element and specify the desired input `id` and `placeholder` text:

```html
<div id="mySearch" class="mb-3"></div>
<script>
  loadSearchBox('mySearch', 'itemSearch', 'Search items');
</script>
```

The helper `loadSearchBox` uses the existing `loadSection` function to insert the component and set attributes. After loading, reference the input by the id you provided.
