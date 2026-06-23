# Mankirat Dethroning Revolution

A satirical "official recruitment portal" for the running joke that our friend **Mankirat**
is the dictator of the Raffles friend group. Citizens are invited to apply for one of seven
positions in the Provisional Revolutionary Command.

This is a static site — plain HTML, CSS, and JavaScript, no build step or dependencies.

## Viewing it on GitHub (GitHub Pages)

1. Go to the repository on GitHub: **Settings → Pages**.
2. Under "Build and deployment", set **Source** to "Deploy from a branch".
3. Choose this branch (`claude/mankirat-revolution-site-kca4p1`, or `main` once merged) and the
   `/ (root)` folder, then save.
4. GitHub will publish the site at `https://<your-username>.github.io/<repo-name>/` within a
   minute or two.

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
arrive as normal emails in the inbox tied to the access key (configured in `script.js`).
By default, a Web3Forms access key only delivers to the single email address it was created
with. To make sure applications reach **both** `27singhk@bsj.sch.id` and
`eshan030709@gmail.com`:

1. Log into the [Web3Forms dashboard](https://web3forms.com/login) (passwordless magic-link
   login, using whichever email the access key was created with).
2. Open the form associated with this access key.
3. Add the second address as an **Additional Email** / CC recipient on that form.

If this step isn't done, submissions will only land in the one inbox the key was created for.
