Steps to Run the Project



/////////////////Clone the Repository/////////////////


git clone <your-github-repository-url>
cd <project-folder>


////////////////Backend Setup//////////////////////////


cd server
npm install
npm run dev
Your server will be running at http://localhost:9090.

//////////////Frontend Setup///////////////

cd ..
cd client
npm install
npm run dev
Your frontend will be running, and it should automatically open in your default browser.




//////////////////Database Schema////////////////////
MongoDB Collections
Contacts

{
  "_id": "ObjectId",
  "firstName": "string",
  "lastName": "string",
  "email": "string (unique)",
  "phoneNumber": "string",
  "company": "string",
  "jobTitle": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}
