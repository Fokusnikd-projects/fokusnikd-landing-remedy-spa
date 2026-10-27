# Remedy Spa

Sales demo landing page for Remedy Spa, 35 Hai Bà Trưng, Quận 1, Ho Chi Minh City. English at `/en`, Vietnamese at `/vi`. `/` follows the browser `Accept-Language` header.

The booking form is a demo. It does not send a request. The calendar uses the real Vietnam date. Slot availability is still sample data.

```bash
npm install
npm run dev
```

`npm run build`, `npm run lint`, and `npm run typecheck` are the checks for this repo.

- `/en?demo=prefill` selects the mockup’s sample slot (4 Nov 2026, 19:00) when that day is still in the 14-day window.
- `/en?demo=confirmed` or `/vi?demo=confirmed` shows the confirmed screen. `/en?demo=sent` shows Request sent.
- `/en?demo=taken` makes the next submit report that the slot was just taken.
- `/en?slots=error` shows the slot-load error, with Try again.
- `/en?notes=1` shows the designer notes (slot assumptions, unconfirmed Zalo/WhatsApp, demo banners).

Placeholders and unconfirmed WhatsApp/Zalo details are marked `TODO` in the source.
