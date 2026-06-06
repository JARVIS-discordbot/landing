Instructions for contributors

the repo has two main branches main and Production...do not send prs to the production branch always send them to the main one as that handles the testing on the github pages staging site to catch any major issues before it gets to the production server also 

html pages (`index.html`, `clusters.html`) stay in the repo root. build tests live in `/build`. workflows are in `/.github/workflows` — CI runs automatically on PRs that touch those pages or `build/`

the code that handles the workflow is in the /.github/workflows folder (if you see an issue you are welcome to send a pr for it just please do tag me if you do @bencos17 so that I know) 

thanks 
