# Prison Management System (Web Version)

This is a web-based implementation of the Prison Management System, converted from the original C++ console application.

## Features

1. **User Authentication**
   - Username: `admin`
   - Password: `pass`
   - Limited to 3 login attempts

2. **Prisoner Management**
   - Add new prisoners with detailed information
   - View all prisoner records
   - Edit prisoner details
   - Mark attendance (reduces punishment time)
   - Release prisoners who have completed their sentence
   - Search for prisoners by cell block

3. **Data Export**
   - Export prisoner data in TXT format
   - Export prisoner data in HTML format
   - Export prisoner data in DOC (Word) format

## How to Use

1. **Running the Application**
   - Simply open the `index.html` file in any modern web browser
   - The application works entirely in the browser and doesn't require a server

2. **Login**
   - Use the credentials mentioned above to log in
   - You have 3 attempts before being locked out

3. **Main Menu**
   - Navigate through the options by clicking on the respective buttons
   - Each option provides specific functionality for managing prisoners

4. **Add New Prisoner**
   - Fill in all the required information
   - The system will automatically assign a cell number

5. **Prisoner Details**
   - View a comprehensive list of all prisoners in the system

6. **Edit Prisoner**
   - Select a prisoner by cell block number
   - Update any of the prisoner's details
   - Save the changes to update the prisoner record

8. **Release Prisoner**
   - Check if a prisoner is eligible for release
   - Confirm release to remove the prisoner from the system

9. **Search Prisoner**
   - Search for specific prisoners by their cell block number

10. **Prison File**
    - Export the prisoner data in different file formats

## Data Storage

- The application uses browser memory for data storage
- Data is not persisted between sessions (refreshing the page will reset all data)
- For a production environment, consider implementing server-side storage or browser local storage

## Data Storage

- The application uses browser localStorage to persist data between sessions
- All prisoner data is automatically saved when changes are made
- Data remains available even after closing the browser or logging out
- The system provides an option to clear all stored data if needed
- Note: localStorage is specific to a browser on a particular device

## Requirements

- Any modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled

