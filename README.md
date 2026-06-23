# Mankirat Dethroning Revolution

A satirical "official recruitment portal" for the running joke that our friend **Mankirat**
is the dictator of the Raffles friend group. Citizens are invited to apply for one of seven
positions in the Provisional Revolutionary Command.

This is a static site — plain HTML, CSS, and JavaScript, no build step or dependencies.

## Viewing it on GitHub (GitHub Pages)

1. Go to the repository on GitHub: **Settings → Pages**.
2. Under "Build and deployment", set **Source** to "Deploy from a branch".
3. Choose branch `claude/mankirat-revolution-site-kca4p1` and the `/ (root)` folder, then save.
4. GitHub will publish the site at `https://itzflom.github.io/Mankirat/` within a minute or two.

## Running it locally

No build tools needed — just open `index.html` directly in a browser, or serve it locally:

```bash
python3 -m http.server
```

Then visit `http://localhost:8000`.

## How applying works

Each role's **Apply** button opens a short application form (name, email, and relevant
skills). Submitting it sends the application straight to an inbox via
[Web3Forms](https://web3forms.com) — applicants never need their own email client.

### Where submissions go

Web3Forms is just a delivery relay, not a separate place you need to check — submissions
arrive as normal emails in `eshan030709@gmail.com`, the inbox tied to the access key
configured in `script.js`. No further setup is required.
