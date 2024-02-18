# CSCI5709 Tutorial-4

* *Date Created*: 15 February, 2024
* *Last Modification Date*: 18 February, 2024
* **Netlify Site URL (Deployed)**: https://zainuddin-5709-tutorial-4.netlify.app/
* *Tutorial #4 Frontend code URL*: https://git.cs.dal.ca/zsaiyed/csci-5709-tutorials/-/tree/main/Tutorial4/frontend?ref_type=heads

## Deployment
 
This repository is mirrored on GitHub deployed to Netlify.

## Built With

![React](https://img.shields.io/badge/React.js-18.2.0-indigo) ![Material UI](https://img.shields.io/badge/MaterialUI-4.2.+-purple) ![yarn](https://img.shields.io/badge/yarn-pkg-blue) [![Netlify Status](https://api.netlify.com/api/v1/badges/65ccd200-e481-41dc-ad17-262cacc8049f/deploy-status)](https://app.netlify.com/sites/csci-5709-t4-zainuddin-saiyed/deploys)

* [React](https://react.dev/) - The web framework used for building user interfaces
* [Material UI](https://mui.com/material-ui/) - Open source React component for using comprehensive pre-built components.
* [Yarn](https://yarnpkg.com/) - Used as package manager that doubles down as project manager.


## Sources Used

### LoginPage.tsx

*Lines 25*

```javascript
const check_if_email_is_valid  = (str: string) => /^([A-Za-z\._]+)@([A-Za-z]+)\.([A-Za-z]+)$/.test(str);
```

The code above was created by adapting the code in [PANDAQUESTS](https://pandaquests.medium.com/5-easy-ways-to-check-if-a-string-contains-only-numbers-in-javascript-305db38625e8#:~:text=const%20isNumber%20%3D%20str%20%3D%3E%20!,a%20string%20only%20contains%20numbers.) as shown below: 

```javascript
const onlyContainsNumbers = (str) => /^\d+$/.test(str);
```

- The code in [PANDAQUESTS](https://pandaquests.medium.com/5-easy-ways-to-check-if-a-string-contains-only-numbers-in-javascript-305db38625e8#:~:text=const%20isNumber%20%3D%20str%20%3D%3E%20!,a%20string%20only%20contains%20numbers.) was implemented by panda quest to show the different ways to perform check if a string contains number. This was the first method and was flexible because of its regex implementation.
- [PANDAQUESTS](https://pandaquests.medium.com/5-easy-ways-to-check-if-a-string-contains-only-numbers-in-javascript-305db38625e8#:~:text=const%20isNumber%20%3D%20str%20%3D%3E%20!,a%20string%20only%20contains%20numbers.)'s Code was used as inspiration because I was not aware on how checking regex in string is possible in javascript. And, using a for loop instead is not a good design approach for checking presence of numebrs in string. Hence, the inspiration was taken fomr teh source.
- [PANDAQUESTS](https://pandaquests.medium.com/5-easy-ways-to-check-if-a-string-contains-only-numbers-in-javascript-305db38625e8#:~:text=const%20isNumber%20%3D%20str%20%3D%3E%20!,a%20string%20only%20contains%20numbers.)'s Code was modified by first validating a regex for some sample examples of email IDs using [RegExr](https://regexr.com/), and then using these created regex for checking the validation conditions for Email ID fields.

## Acknowledgement

For inspiration of the unicode:

### Profile.tsx and UserProfilePage.tsx

* **Profile.tsx** : *Lines 96 - 102*
* **UserProfilePage.tsx** : *Lines 31 - 37*

```javascript
{/* Display active status */}
{user_profile.isActive ? (
    // [1] The unicode for green ball from: https://www.compart.com/en/unicode/U+1F7E2
    <Typography style={{ display:'inline-block', fontWeight:'bold', color: 'green', marginLeft:'10px'}}>🟢 Active</Typography>
) : (
    // [2] The unicode for gray ball from: https://stackoverflow.com/questions/71565351/what-is-the-unicode-code-for-a-grey-ball
    <Typography style={{ display:'inline-block', fontWeight:'bold', color: 'black', marginLeft:'10px' }}>⚫ Inactive</Typography>
)}
```

* Instead of using a react icon downlaoding dependency I used the unicode of the *Green Ball* on [Compart](https://www.compart.com/en/unicode/U+1F7E2) for showing the online active status.
* Similarly, I used the unicode of the *Gray Ball* on [StackOverflow](https://stackoverflow.com/questions/71565351/what-is-the-unicode-code-for-a-grey-ball) for showing the offline in-active status.

## Author
 
* [Zainuddin Saiyed](zainuddin.s@dal.ca) - *(Owner)*
 
 ---
