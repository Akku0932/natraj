# Task 6: Product Quantity Selector & Add to Quote Button

## Status: ✅ Completed

## Changes Made to `/home/z/my-project/src/components/product-detail-modal.tsx`

### 1. Imports
- Added `ShoppingBag` icon from `lucide-react`

### 2. State
- Added `const [quantity, setQuantity] = useState(1)` — quantity resets to 1 when product loads

### 3. Quantity Selector (below specifications, above existing buttons)
- **Minus (−) button**: Decrements quantity, min 1, disabled at min
- **Plus (+) button**: Increments quantity, max 100, disabled at max
- **Animated number display**: Uses `motion.span` with `key={quantity}` to trigger spring animation (`scale: 0.8 → 1`, `opacity: 0.5 → 1`)
- **Styling**: Gold-bordered container (`border-gold/30`), hover effects with `bg-gold/10`, disabled states with opacity

### 4. Total Price Display (conditional, when product has price)
- Shows `₹{price × quantity}` with `(excl. GST)` subtitle
- Gold-tinted background (`bg-gold/5`, `border-gold/20`)

### 5. "Add to Quote" Button
- Full-width gold-gradient button (`from-gold to-amber-600`)
- `ShoppingBag` icon + dynamic text: "Add {n} Item(s) to Quote"
- Opens WhatsApp with pre-filled message containing product name, category, price, quantity
- Links to `https://wa.me/919868225911` with URL-encoded message
- `target="_blank"` + `rel="noopener noreferrer"`
- Toast notification on click: "Quote request opened on WhatsApp!"

### 6. Placement
- Quantity selector + total price + Add to Quote button placed ABOVE the existing Close/Share/WhatsApp buttons row
- All existing functionality (lightbox, existing buttons, share, etc.) preserved intact

### 7. Lint
- `bun run lint` passes with zero errors
