/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
  // promptFor() is a custom function defined below that helps us prompt and validate input more easily
  // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  // Routes our application based on the user's input
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
      //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
      searchResults = searchByTraits(people);
      break;
    default:
      // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
      app(people);
      break;
  }
  // Calls the mainMenu() only AFTER we find the SINGLE PERSON
  mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
  // A check to verify a person was found via searchByName() or searchByTrait()
  if (!person[0]) {
    alert("Could not find that individual.");
    // Restarts app() from the very beginning
    return app(people);
  }
  let displayOption = prompt(
    `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
  );
  // Routes our application based on the user's input
  switch (displayOption) {
    case "info":
      //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
      // HINT: Look for a person-object stringifier utility function to help
      let personInfo = displayPerson(person[0]);
      alert(personInfo);
      return app(people);


    case "family":
      //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
      // HINT: Look for a people-collection stringifier utility function to help

      let personFamily = findPersonFamily(person[0], people);
      alert(personFamily);
      return app(people);

    case "descendants":
      //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
      // HINT: Review recursion lecture + demo for bonus user story
      let personDescendants = findPersonDescendants(person[0], people);
      alert(personDescendants);
      return app(people);

    case "restart":
      // Restart app() from the very beginning
      app(people);
      break;

    case "quit":
      // Stop application execution
      return;

    default:
      // Prompt user again. Another instance of recursion
      return mainMenu(person, people);
  }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
  let foundPerson = people.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    }
  });
  return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
  let allPeople = people.map(function (person) {
    return `${person.firstName} ${person.lastName}`;
  });
  return allPeople;
}

// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
  let personInfo = `First Name: ${person.firstName}\n`;
  personInfo += `Last Name: ${person.lastName}\n`;
  personInfo += `gender: ${person.gender}\n`;
  personInfo += `dob: ${person.dob}\n`;
  personInfo += `height: ${person.height}\n`;
  personInfo += `weight: ${person.weight}\n`;
  personInfo += `eyeColor: ${person.eyeColor}\n`;
  personInfo += `occupation: ${person.occupation}\n`;
  personInfo += `parents: ${person.parents}\n`;
  personInfo += `currentSpouse: ${person.currentSpouse}\n`;
  //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
  return personInfo;
  // alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
  return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
  return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line ????. Happy Coding! ????

function findPersonFamily(person, people) {


  let personSpouse = people.filter(function (el) {
    if (el.currentSpouse == person.id) {
      return true;
    }
  });

  let spouses = personSpouse.map(function(el){
    return `Spouse: ${el.firstName} ${el.lastName}`
  });

  let personParents = people.filter(function (el) {
    if (person.parents.includes(el.id)) {
      return true;
    }
  });

  let parents = personParents.map(function(el){
    return `Parent: ${el.firstName} ${el.lastName}`
  });


  let siblings = people.filter(function(el){
    if (person.id !== el.id){
        if(person.parents[0] !== undefined && el.parents[0] !== undefined && person.parents[0] == el.parents[0]){
        return true;
        }
        else if (person.parents[1] !== undefined && el.parents[1] !== undefined && person.parents[1] == el.parents[1]){
            return true;
        }
        else if (person.parents[0] !== undefined && el.parents[1] !== undefined && person.parents[0] == el.parents[1]){
            return true;
        }
        else if (person.parents[1] !== undefined && el.parents[0] !== undefined && person.parents[1] == el.parents[0]){
            return true;
        }
    }
  });

  let sibling = siblings.map(function(el){
    return `Sibling: ${el.firstName} ${el.lastName}`
  });
    return `${spouses} \n${parents} \n${sibling}`
}




// function findPersonDescendants(person, people) {
//   let descendants = people.filter(function (el) {
//     if (el.parents.includes(person.id)) {
//       return true;
//     } else {
//       return false;
//     }
//   });
//   let add = descendants.map(function (el) {
//     return `${el.firstName} ${el.lastName}`;
//   });
//   return add.join("\n");
// }


function findPersonDescendants (person, people) {
    let descendantsList = [];
    let kids = []; 
    let descendants = people.filter(function (el) {
        if (el.parents.includes (person.id)) {
            return true;
        } 
        else {
            return false;
        }
    });
    
    if (descendants.length > 0){
        for (let i = 0; i < descendants.length; i++) {
            //for each original descendant, do the original function. 
            descendantsList = findPersonDescendants(descendants[i], people);
            if (descendantsList.length > 0){
                kids += descendantsList;   
            };     
            
        }

    }

    let add = descendants.map(function(el) {
        return `${el.firstName} ${el.lastName}`;
    });

 
    return `${add.join("\n")} \n${kids}`;
}





function searchByTraits(people) {
  let trait;
  let matches;
  let pair;
  let displayedPeople;
  let array = people;
  let pairs;


  let answer = "yes";
  
  while (answer == "yes") {
    trait = prompt(
    "Please type in search criteria without spaces then value. Separate multiple criteria by a semicolon (no spaces around the semicolon). You can also select 'restart' or 'quit'."
    ); 
    
    if(trait.toLowerCase() == 'restart'){
        return app(people);
    }
    else if (trait.toLowerCase() == 'quit'){
        return;
    }

    pairs = trait.split(";");      
        //key trait[0];
        //value trait[1];
    for (let i = 0; i < pairs.length; i++) {
        pair = pairs[i].split(" ");

        matches = array.filter(function (el) {
            if (el[pair[0]] == pair[1]) {
                return true;
            } 
            else {
                return false;
            }
        });

        array = matches;

        
        let inputArray = ['id', 'firstName','lastName','gender','dob','height','weight','eyeColor','occupation','parents','currentSpouse']

        if (i == 0){
            for (let i = 0; i < pairs.length; i++) {
                if (i%2 == 0){
                    if (!inputArray.includes(pair[i])){
                        alert('Invalid input, please try again.')
                        continue;
                    }
                    
                }
           
            }
        }
    }
            
        if(pair.length > 2 && !trait.includes(';') || trait.includes('; ')|| trait.includes(' ; ') || matches.length == 22){
            alert('Invalid input, please try again.')
            continue;
        }

        displayedPeople = displayPeople(matches);

        if (matches.length >= 1) {
            alert(displayedPeople.join("\n"));
        } 
        else if (matches.length === 1) {
            return matches;
        } 
        else {
            alert("No results found.");
            continue;
        }
        

        answer = promptFor("Would you like to continue your search? (yes/no)", yesNo).toLowerCase();
        array = matches;
    }

    return mainMenu(matches, people);
}
