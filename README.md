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

Each role's **Apply** button opens a popup with a short application form (name, email, and
relevant skills). Submitting it sends the application directly to the organisers' inboxes via
[Web3Forms](https://web3forms.com) — no email client required on the applicant's end. A
"Prefer to email directly instead?" section is also included as a manual fallback, offering
both organiser addresses (`27singhk@bsj.sch.id` and `eshan030709@gmail.com`), a prefilled
**Open Email Application** mailto link, and a **Copy Email Addresses** button.

### One-time setup: connecting the form to your inbox

The direct-submission form is wired up with a [Web3Forms](https://web3forms.com) access key in
`script.js`, so submissions are delivered straight to an inbox without any backend code.

By default, a Web3Forms access key only delivers to the single email address it was created
with. To make sure applications reach **both** `27singhk@bsj.sch.id` and
`eshan030709@gmail.com`:

1. Log into the [Web3Forms dashboard](https://web3forms.com/login) (passwordless magic-link
   login, using whichever email the access key was created with).
2. Open the form associated with this access key.
3. Add the second address as an **Additional Email** / CC recipient on that form.

If this step isn't done, submissions will only land in the one inbox the key was created for —
applicants can still use the "Prefer to email directly instead?" fallback to reach both
addresses manually in the meantime.
