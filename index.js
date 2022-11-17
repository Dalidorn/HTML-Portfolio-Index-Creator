const inq = require("inquirer");
const fs = require("fs");

//prompt for info
inq.prompt([
//name
    {type: "input", name: "name", message: "What is your name?"},
//location
    {type: "input", name: "location", message: "What city and state do you live in?"},
//bio
    {type: "input", name: "about", message: "Tell me about yourself!"},
//linkedin url
    {type: "input", name: "linkedin", message: "Give me a link to your LinkedIn page."},
//github url
    {type: "input", name: "github", message: "And a link to your GitHub Profile."},
//email address
    {type: "input", name: "email", message: "Now, an email address."},
//phone number
    {type: "input", name: "phone", message: "Your phone number?"},
//pref contact method
    {type: "list", name: "prefContact", message: "What's the first method of contact we should use?", choices: ["phone call", "text", "email", "LinkedIn"]},
//image
    {type: "input", name: "image", message: "Provide a direct link to a photo of you."},
//skills
    {type: "checkbox", name: "knownLang", 
    message: "Which of the following coding languages are you proficient in?", 
    choices: ["HTML5", "CSS3", "JavaScript", "Python", "Java"]},
//project links
    {type: "input", name: "projectLinks", message: "Provide links to each project, seperated by a space"},
//
])

//then use that response
.then((data) => {

//splitting the links into an array
let projectLinks = [];
data.projectLinks.split("\ ").forEach(ele => projectLinks.push(ele));

//for each link make a card element
let projectCards = [];
let i = 0
projectLinks.forEach(link => {
    i++
    projectCards.push(`<card href="${link}">Project ${i}<card>`)
});

//For each known language make an icon
let langIcons = [];
data.knownLang.forEach(known => langIcons.push(`<i class="devicon-${known.toLowerCase()}-plain-wordmark" style="font-size:40px;></i>`));

//writing the file
fs.writeFile("index.html", 

// using a string literal for easy editing.
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css">
    <title>${data.name}'s Portfolio</title>
</head>
<body>
    <nav>
        <img src="${data.image}" alt="My profile image.">
        <p>${data.name}</p>
        <ul>
            <li><a href="#About">About</a></li>
            <li><a href="#Projects">Projects</a></li>
            <li><a href="#Skills">Skills</a></li>
            <li><a href="#Contact">Contact</a></li>
        </ul>
    </nav>

    <section id="About">
        <h2>About Me</h2>
        <h3>Hi! My name is ${data.name}.</h3>
        <p>${data.about}</p>
    </section>

    <section id="Projects">
        <h2>Projects</h2>
        <h3>These are some of the projects I've worked on.</h3>
        ${projectCards.join("\r\n")}

    </section>

    <section id="Skills">
        <h2>Skills</h2>
        <h3>So far I've learned:</h3>
        ${langIcons.join("\r\n")}
    </section>

    <section id="Contact">
        <h2>Contact</h2>
        <ul>
            <li>Phone number: <a href="tel:${data.phone}">${data.phone}</a></li>
            <li>Email: <a href="mailto:${data.email}">${data.email}</a></li>
            <li>Github Profile: <a href="${data.github}">${data.github}</a></li>
            <li>LinkedIn: <a href="${data.linkedin}">${data.linkedin}</a></li>
        </ul>
        <h4>Please reach out to me via ${data.prefContact} first!</h4>
    </section>
</body>
</html>
`

// catching any errors and logging them or success.
, (err) => (err)? console.log(err) : console.log("Index successfully created!"));
});