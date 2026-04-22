# Industrial Utilitarian Design System — Production CRM

## Color System (OKLCH)
- **Primary Text:** `oklch(0.205 0 0)` / `#333333`
- **Surface:** `#FFFFFF`
- **Background:** `#F8F8F8`
- **Border:** `#ECECEC` / `border-slate-100`
- **Accent:** `#F97316` (Industrial Orange)
- **Sidebar:** `#1a1d2e` with blue-700 active states

### Rules
- **NEVER** use Tailwind `gray-*` classes — use `slate-*` equivalents only
- Semantic colors: green-50/700, orange-50/600, red-50/600, yellow-50/700
- Shadows: `shadow-sm shadow-slate-100` only, never deep shadows

## Typography
- **Sans:** DM Sans (body, UI)
- **Mono:** DM Mono (data fields, SKUs, IDs)
- **Body:** 13px, font-medium, slate-600
- **Labels/Headers:** `text-[10px] uppercase tracking-[0.2em] font-black text-slate-800`
- **Meta/Captions:** 11px, slate-400
- **Data Cells:** 12-13px

## Spacing & Shape
- **Master Radius:** 10px (`rounded-xl` containers, `rounded-lg` buttons)
- **Card Padding:** `p-5` or `p-6`
- **Row Padding:** `py-2.5` or `py-3.5`
- **Desktop Centering:** 80% width (`w-[80%] mx-auto`)

## Component Patterns
- **Cards:** `bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-100 p-5`
- **Section Headers:** `text-[10px] uppercase tracking-[0.2em] font-black text-slate-800`
- **Table Headers:** `text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]`
- **Dividers:** `divide-y divide-slate-50` (not gray-50)
- **Hover States:** `hover:bg-slate-50`
- **Progress Bars:** `bg-slate-100 rounded-full` track, `bg-blue-500` fill
- **Status Pills:** `px-2 py-0.5 rounded-full text-[9px] font-semibold`
- **Buttons:** `border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-slate-50`

## Icons
- Library: lucide-react
- Stroke width: 2
- Sizes: 12px (meta), 15px (nav), 18px (primary actions)

## Interactions
- Nav shift: `hover:pl-4`
- Transitions: `duration-300 ease-in-out`
- Modals: `fade-in`, `slide-in-from-top-1`
