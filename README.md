# MyProject3

<img src="./group-image/Happy Hippos Project.png" alt="Happy Hippos Project" style="zoom:30%;" />

Our project, `Hippos!`, is a mobile-optimized web app for spontaneous activity organization when users want to connect with like-minded individuals nearby. Registered users can post real-time activity listings, turning last-minute plans into unforgettable experiences.

Users can browse through a list or map view of what's happening in the next 24 hours in their nearby suburbs, including trending, nearby, and recommended activities. Each activity displays real-time participant numbers against the host's set maximum, giving hosts the flexibility to conclude as needed. By selecting `interested`, users who want to participate can express their interest and organize their schedule based on rising participation counts. Whether you're hosting or joining,  `Hippos!` makes it easy to create spontaneous and memorable experiences on the fly. 

The following sections provide information on:

- **Main Functions**: A brief introduction of the web app's main functions.   
- **Introduction of Webpages**: An overview of the contents on each webpage.
- **Running & Testing the Project**: Instructions on how to set up, run, and test the project, with a provided username and password for logging in.
- **Notes**: Important information regarding the Google Maps API.

<br/>

## **Main Functions**

The main functions of our projects include:

- Activity mapping using Google Map for easy location visualization.
- User registration and sign-in functionality.
- Real-time activity posting with notifications sent to users, facilitating quick team or group formation for hosts.（TBC）
- Display of user interest in specific activities or activities through a "like" function——which is triggered by the `interested` button on the single activity information page.
- User tag selection for filtering activities based on interests.
- Tagging  activities for categorization and organization.

<br/>

## **Introduction of Webpages**

Below is a brief introduction of the contents on each webpage:

**"/"**: After a simple and clean opening screen animation, you will be led to the homepage. As an unregistered visitor, you can browse trending activities ordered by likes and nearby activities based on your location. As a registered user, you can also see recommended activities customized for you based on your interests. An activity map is also presented, displaying activities happening around you. By clicking on the markers on the map, you can see details of the activity happening there and view it on Google Maps.

**"/map"**: This page features a full-screen map where you can better view activity locations and details. By clicking on the activity categories floating on the map, you can also directly view activities under categories that interest you more.

**"/event/{eventID}"**: This is the detailed page of a single activity, where visitors can view the start and end times, total number of people required, vacancies, and express their interest. Meanwhile, the host of the activity can update attendance by clicking the `One more joined!` button when a new participant shows up to the activity location.

**"/add"**: Registered users can list their activities as hosts on this page, enabling them to connect with other users by initiating their expected activities. Details of the activities being listed include activity title, start time, end time, number of people allowed, tags, introduction, location, etc.

**"/search"**: This is where registered users and visitors can search by keyword to get information about activities they are interested in.

**"/me"**: This is the personal page of the user, which will display the user's interested activities and their past activity listings.

**"/login"**: This page is for registered users to log in, leading them to the "/me" page.

**"/signup"**: This page is for unregistered users to sign up so they can list their activities.

<br/>

 
## **Notes**

For the google maps part, we used `google.maps.Marker`. However, as of February 21st, 2024, [google.maps.Marker is deprecated](https://developers.google.com/maps/deprecations), and google.maps.marker.AdvancedMarkerElement is recommended over `google.maps.Marker`. But the components we used in the current API doesn't directly support `google.maps.marker.AdvancedMarkerElement` out of the box. 

To use `google.maps.marker.AdvancedMarkerElement` within our project, we could possibly create custom components such as `AdvancedMarker`, however, it can only be used on maps using cloud-based map styling,, which is not practical within our project's time constraints.

Therefore, we are currently adhering to using the deprecated `google.maps.Marker`.

<br/>


## **Running & Testing the Project**

To run this project, simply execute `npm install` and `npm run dev` in your frontend & backend terminals.
