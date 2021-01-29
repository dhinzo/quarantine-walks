# Quarantine Walks
## Documenting Walks during Quarantine

____

### Technologies Used

MERN stack application - 

- MongoDB, ExpressJS, ReactJS, NodeJS
- Multer for file upload
- Google Maps & Places API
- Front-end deployment to Firebase hosting


## About the React application

This app uses the latest features of React - specifically, hooks - as well as the context API and react router. The app is built with granulairty in mind with 26 functional components. I created 3 custom hooks - one for authentication, forms, and HTTP requests - which was a new approach for me. I did this using `useState() useCallback() useEffect()` and `useRef()` and built functions that could be reused in different functions. For instance, Login & Sign Up (auth-hook), and NewWalk & UpdateWalk (form-hook).


### My Thoughts on this project

This is my first project out of boot camp since graduating in December 2020. I pushed myself to build a project that implemented features of React or app development that I didn't pursue during my cohort. Notably, Google Maps. It was pretty straight forward setting up and there was a bit of a learning curve when making the API call to the Places API. But all in all, it was a fun learning experience!

### Know Front-end issues

As of Jan. 29, 2021, there is a bug after initial sign up and login. The error occurs after sign up and initial login. If the user selects their profile/card before they add their initial walk, an error will throw and make forms (login, new walk) off-center. To avoid this, the **first interaction a user should have** is to **Add Walk** from the top navigation links(desktop) or sidebar button (hamburger menu at the top left)

I will be releasing a future build that directs the user to Add Walk if they click their profile without having created a walk first.




