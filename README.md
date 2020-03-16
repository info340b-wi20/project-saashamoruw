# Project Hub
By: Saasha Mor and Rajoshi Chakravarty
This repository contains code for an interactive web app, created for the _Client-Side Web Development_ course at the UW iSchool the published Firebase site can be viewed [here](https://project-hub-2020.firebaseapp.com/)

## TO-DO
- Do we want option to un-request?
- Have the page redirect to sign in page if the user tries to // return Redirect isn't working
    - Add a project to showcase
    - Like a project
    - Request to join a project
- CSS on mobile nav won't show icons - some issue with padding or margins


Less important: worth like 1 point each?
- Check mobile site
- The AddProjectCard should add to the state using a callback - ???
- add role="button" and tab-index to your cards so that a screen reader knows that they can be flipped. Right now, they just navigate when I try to "click" on it using a screen reader
- DO NOT use window.alert! Onscreen changes only!
- fix console warnings
- user stays logged in every session cause of user authentication? Check if can be changed in rules? // not as imp

## Overview
There are a lot of great projects produced by people. Project Hub is a one-stop-shop to show case any projects you worked on whether it was for a class, capstone, a hackathon or even a passion project. Your project can be anything from Software Development and Data Science to Graphic Design and UI/UX Design!

What if you don't have any projects to showcase? Don't worry! Project Hub can also help users find budding projects in need of your highlights and time.

## Existing Solutions
Github brings together the world's largest community of developers to discover, share, and build better software. It has capability to have open source projects to private team ones
Open Science Framework is a platform to showcase all your research projects with the ability to upload sources from Github, Dropbox and Amazon S3

### What's missing?
The point of showcasing projects are to show them off. It is a great way to show the world your highlights while working on a topic that intrigues you as well as add value to the world with a working prototype that people can use. Although, the existing solutions are great to be able to collaborate on projects, they are not good ways to "show-off" projects

## Proposed Application
Here is what a user would typically do on Project Hub:

### Find Team Members for Projects
- Users scroll through projects posted as "looking for members"
- Each project will have a topic and requirements for team members
- Users can filter projects on the basis of:
    - Role of Team Member needed
    - Time commitment of entire project
    - Time commitment per week
    - Purpose of project: Hackathon, Capstone etc.
    - Payment
    - Location
- User clicks "Send Request to Join Team" on project of choice
- The request prompts the user to enter the necessary information as requested by the project creator for example resume, proof of highlights etc.

- Potential team member and project creator can chat on the app to finalize
### Showcase Projects
- User creates a project to showcase with the name of the project
- User adds brief descriptions of the project along with team members/li>
- Users can add purpose of the project like Hackathon, Capstone, Personal etc.
- The web app prompts to add source code or any other materials from Github
- User clicks submit which places the project showcase in a browsable tile format

### Personalized dashboard
- Users can "like" showcased projects which would appear on their dashboard
- The projects the user has showcased will also appear on their dashboard, along with the number of likes it has
- The user can also see the pending or accepted requests to join projects

## Potential Users
- There are 11.8 MILLION people in the U.S alone that are in tech related fields that could benefit from Project Hub
- This web app can be used by anyone ranging from high school kids to professionals in industry benefit from having a project showcase plaform
- Project Hub can attract people from fields ranging from Software Development to Graphic Design
- People can also find products that may be of use to them through this web app
- Companies can also look for inspiration for products through this web app
- Students looking for ways to enhance their resume while also working on things that interest them can find projects here

## Why is this different?
Most of other platforms have too much unnecessary information about projects. Therefore, Project Hub displays relevant information about projects in a simple yet stylish way
Sometimes students want to work in highlight-building projects but don't know how. This platform gives them a consolidated way to look at potential opportunities and choose what is best for them.
Great project ideas are rare. But when they do come around, you need the perfect team to make it come to life. Project Hub provides an easy way to find team members that identify with your desired ethos.