# Work-Day-Scheduler

The purpose of this exercise was to create a work day scheduler, that has an hour block for each hour of the work day (9AM - 5PM). The application contains HTML, CSS, Bootstrap, JavaScript, and Jquery.

The first step was to create our index.html file, script.js file, and a file that contained our minified moment.js code. The index.html file was for the most part already constructed with a Jumbotron feature from Bootstrap, however I did have to manually add a container 'div' for our appended contents, as well as adding our scripts and link tags.

The next and most elaborate step was creating our script.js file and all the functions within it. The first function that creates our actual hour blocks is the addHourBlocks() function. This function takes in the parameter of iterations and runs a for loop so that for each iteration, an hour block is created. The hour blocks consist of the TimeDiv, TextDiv, and SaveDiv. These correspond to the sections within each individual hour block: one 'div' containing the time for that block, one containing the 'textarea' for inputs, and the 'div' containing the save feature. The TimeDiv, TextDiv, and SaveDiv are all appended to a container 'div' denoted as PlanContainer, which is then appended to the container 'div' within the index.html file with an id='planner'. 

After we have added our hour blocks we can move on to the second and most complex function which is the SetBackgroundColor() function. The structure behind this function is that it initially declares two variables to compare the current time of day, and then compare that to the current hour block that is being focused on. Depending on whether the values are equal, less than, or greater than one another determines the background color of the hour block. 
