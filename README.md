# MyGarage [![Netlify Status](https://api.netlify.com/api/v1/badges/cb42cf0f-cd68-4a00-8340-3cbc8e186990/deploy-status)](https://app.netlify.com/sites/mygarageapp/deploys)

![Screenshot 2023-09-09 112308](https://github.com/elibradford227/MyGarageCapstone/assets/114545170/b3d8e4d3-b3a1-4d65-a29a-578b94d8b9be)

[View Live Demo of MyGarage](https://mygarageapp.netlify.app/)

## Topics
- [What Is MyGarage?](#what-is-mygarage)
- [Features](#features)
- [ERD](#erd)
- [Project Screenshots](#project-screenshots)
- [Try It Out For Yourself](#try-it-out-for-yourself)
- [Relevant Links](#relevant-links)
- [Tech Stacks](#tech-stacks)
___
## What is MyGarage?
MyGarage is a vehicle job management app. MyGarage allows users to neatly view all your vehicles projects in one place, alongside related expenses.

Users no longer have to worry about remembering all the tasks, nitty gritty details, costs, and parts for their jobs. MyGarage allows them to have all these in one place.

## Features

<em>Cars</em>
- Add a new car
- View all cars on cars page
- View cars details by clicking "View" on a respective cars card
- Edit cars details by clicking "Edit Car" on car details page
- View cars jobs history by clicking "View Job History" on car details page
- Delete car by clicking "Delete Car" on car details page, which deletes any associated jobs and parts
- View associated jobs on car details page. Click the "View" button to view the job
- Click "Add A Job" to populate the dom with a form to assign a new job to that car, or use a dropdown select to switch from the pre-selected car, to a different vehicle

<em>Jobs</em>
- Add a new job
- View all jobs on jobs page
- Search jobs by title using input text field
- Expenses display calculating all total expenses from each job
- View jobs details by clicking "View" on respective job card
- View details, edit, and delete job functionality present on job details page similar to car details
- Click "Mark Job As Complete" to delete the job and add it to associated car's job history
- View added parts to job on car details page to see what's needed for that job
- Expenses calculated above description from jobs associated parts costs and quantity
- Click "Add A Part" to route to a page to select and add parts to job

<em>Parts</em>
- Add a part from catalog of parts from database
- Click "Add" to render a part card in the selected parts section
- Increase or decrease quantity of part using buttons on card
- Click "Add Selected Parts" to add all selected parts to job
- Search parts by title using input text field
- If the part you need isn't present, click "Add Your Own Part" to add your own part using a form
- Edit a part on job details page by clicking "Edit"
- Delete a part on job details page by clicking "Delete"

## ERD

![MyGarage ERD (2)](https://github.com/elibradford227/MyGarageCapstone/assets/114545170/01adba49-906a-4a0c-931b-f3b31f969f4c)

## Project Screenshots 
![cars page](https://github.com/elibradford227/MyGarageCapstone/assets/114545170/c29914a5-b1b0-4bde-934a-155e163498cb)
![jobs page](https://github.com/elibradford227/MyGarageCapstone/assets/114545170/8f6588f7-bf8c-4d69-a366-3f16b8b22920)
![car details page](https://github.com/elibradford227/MyGarageCapstone/assets/114545170/960485b1-e9c0-4a92-8656-c985c21b0261)
![job details page](https://github.com/elibradford227/MyGarageCapstone/assets/114545170/e579ccca-0087-4e4b-9879-1795972bbdfa)
![add parts page](https://github.com/elibradford227/MyGarageCapstone/assets/114545170/d0fdbada-4d75-4d0f-9273-c4b3395be017)

## Try It Out For Yourself

1. Set up a [Firebase](https://firebase.google.com/) project 

2. Clone MyGarage to your local machine
``` bash
git@github.com:elibradford227/MyGarageCapstone.git
```

2. Move into directory
``` bash
cd MyGarageCapstone
```

3. Once in MyGarage's code, create a .env file at the root of the project and paste the following keys into the .env file:
``` bash
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_DATABASE_URL=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_APP_ID=""
```

4. From Firebase, copy the values and paste them into the empty strings of the respective keys located in the .env file.

5. Be in the root directory and from your command line, run
``` bash
npm install or npm i
```
6. Now from your command line, run
``` bash
npm run prepare
```
7. To start Plated, run
``` bash
npm run dev
```
8. Click http://localhost:3000 in the terminal to open the browser

9. Have fun!


## Tech Stacks
<div align="center">  
<a href="https://reactjs.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg" alt="React" height="50" /></a>  
<a href="https://nextjs.org/" target="_blank" rel="noreferrer"> <img src="https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" alt="nextjs" width="40" height="40"/>
<a href="https://firebase.google.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/firebase.png" alt="Firebase" height="50" /></a> 
<a href="https://www.w3schools.com/css/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg" alt="CSS3" height="50" /></a>  
<a href="https://en.wikipedia.org/wiki/HTML5" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/html5-original-wordmark.svg" alt="HTML5" height="50" /></a>  
<a href="https://getbootstrap.com/docs/3.4/javascript/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/bootstrap-plain.svg" alt="Bootstrap" height="50" /></a>  
<a href="https://www.figma.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/figma-icon.svg" alt="Figma" height="50" /></a>  
</div>

## Relevant Links 
- [Check out the deployed site](https://mygarageapp.netlify.app/)
- [Wireframes](https://www.figma.com/file/ZSKObONR6045JhPA1ZLQbI/MyGarage?type=design&node-id=2%3A37&mode=design&t=KTbD3tGDFSxJgd6G-1)

## Contributors
- [Eli Bradford](https://github.com/elibradford227)
