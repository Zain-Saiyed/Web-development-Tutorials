# CSCI5709 Tutorial-3

* *Date Created*: 13 February, 2024
* *Last Modification Date*: 15 February, 2024
* **Netlify Site URL (Deployed)**: https://zainuddin-5709-tutorial-3.netlify.app/
* *Tutorial #3 Frontend code URL*: https://git.cs.dal.ca/zsaiyed/csci-5709-tutorials/-/tree/main/Tutorial-3/frontend?ref_type=heads

 
 ## Deployment
 
This repository is mirrored on GitHub deployed to Netlify.

## Built With

![React](https://img.shields.io/badge/React.js-18.2.0-indigo) ![Material UI](https://img.shields.io/badge/MaterialUI-4.2.+-purple) ![yarn](https://img.shields.io/badge/yarn-pkg-blue) [![Netlify Status](https://api.netlify.com/api/v1/badges/65ccd200-e481-41dc-ad17-262cacc8049f/deploy-status)](https://app.netlify.com/sites/csci-5709-t3-zainuddin-saiyed/deploys)


## Sources Used


### Registration.tsx

*Lines 33 - 35*

```javascript
const check_if_contain_numbers = (str: string) => /^(([A-Za-z])+(\s)*)+$/.test(str);

const check_if_email_is_valid  = (str: string) => /^([A-Za-z\._]+)@([A-Za-z]+)\.([A-Za-z]+)$/.test(str);
```

The code above was created by adapting the code in [PANDAQUESTS](https://pandaquests.medium.com/5-easy-ways-to-check-if-a-string-contains-only-numbers-in-javascript-305db38625e8#:~:text=const%20isNumber%20%3D%20str%20%3D%3E%20!,a%20string%20only%20contains%20numbers.) as shown below: 

```javascript
const onlyContainsNumbers = (str) => /^\d+$/.test(str);
```

- The code in [PANDAQUESTS](https://pandaquests.medium.com/5-easy-ways-to-check-if-a-string-contains-only-numbers-in-javascript-305db38625e8#:~:text=const%20isNumber%20%3D%20str%20%3D%3E%20!,a%20string%20only%20contains%20numbers.) was implemented by panda quest to show the different ways to perform check if a string contains number. This was the first method and was flexible because of its regex implementation.
- [PANDAQUESTS](https://pandaquests.medium.com/5-easy-ways-to-check-if-a-string-contains-only-numbers-in-javascript-305db38625e8#:~:text=const%20isNumber%20%3D%20str%20%3D%3E%20!,a%20string%20only%20contains%20numbers.)'s Code was used as inspiration because I was not aware on how checking regex in string is possible in javascript. And, using a for loop instead is not a good design approach for checking presence of numebrs in string. Hence, the inspiration was taken fomr teh source.
- [PANDAQUESTS](https://pandaquests.medium.com/5-easy-ways-to-check-if-a-string-contains-only-numbers-in-javascript-305db38625e8#:~:text=const%20isNumber%20%3D%20str%20%3D%3E%20!,a%20string%20only%20contains%20numbers.)'s Code was modified by first validating a regex for some sample examples of names and email IDs using [RegExr](https://regexr.com/), and then using these created regex for checking the validation conditions for First Name, Last Name, and Email ID fields.


## Author
 
* [Zainuddin Saiyed](zainuddin.s@dal.ca) - *(Owner)*
 
 ---
