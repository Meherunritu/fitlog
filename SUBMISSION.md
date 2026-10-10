# Finish your FitLog submission

## Important status

The implementation is built and packaged, but it is **not yet a complete two-link submission**: you must publish it in your own GitHub account and deploy it publicly. The private ChatGPT preview is for your review, not an examiner-accessible submission URL.

Both assigned API services were rate limited during development. Check the live API before submission. The labelled sample fallback is not proof that the official API integration passes.

## 1. Open the project

Unzip `FitLog-Submission.zip`. Open the `fitlog` folder in VS Code. Install Node.js if needed, then run:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## 2. Restore the included development history

The ZIP contains `fitlog-history.bundle`. This preserves real development commits, rather than artificial empty commits. From the extracted `fitlog` folder, run:

```bash
git clone fitlog-history.bundle ../fitlog-repository
cd ../fitlog-repository
git remote remove origin
```

The clean cloned project contains the source and history. Work in `fitlog-repository` from now on. You may delete the extra extracted copy once the clone succeeds.

## 3. Push to your GitHub account

Create a new **empty** GitHub repository named `fitlog` (do not initialize a README or license). Copy its HTTPS repository URL. Replace `YOUR_USERNAME` below:

```bash
git remote add origin https://github.com/YOUR_USERNAME/fitlog.git
git push -u origin main
```

Sign in when GitHub prompts. Verify that the repository shows at least eight meaningful commits. The included commits are accurately attributed to Codex; review and understand the code and follow your course's AI-assistance rules. Do not upload only files through the GitHub website if you want to preserve commit history.

## 4. Deploy publicly

Import the repository into Vercel or Netlify. Use `npm run build` and output directory `out`. Netlify settings are supplied in `netlify.toml`. No secrets are required.

After deployment, update the two link placeholders in README.md and commit/push that update.

## 5. Final check

- Open the public site in a private/incognito browser; ensure it does not ask the examiner to log in.
- Check desktop, tablet, and phone widths.
- Confirm the API outage banner disappears when the assigned service works, and official workouts load.
- Browse Workouts must scroll to the library.
- Open details, add a lift, save another, and check both navbar counts.
- Add five unfinished workouts; a sixth should be blocked.
- Mark one done; another lift can now be added.
- Verify minutes/calories, all three sort options, View Details, and removal.
- Refresh the planner; lists should remain.
- Refresh a copied details URL; it should work.
- Open `/does-not-exist/`; it should show the custom 404.
- Check the browser console for errors and failed API requests.

## Submit exactly these links

Live Link: [your public Vercel/Netlify deployment]

GitHub Repository Link: [your GitHub repository]

The assignment README states that submissions after 27 September 2026 fall under its 30-mark deadline tier. Check your course portal for any updated deadline or exception.
