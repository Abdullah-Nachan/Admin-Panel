// Prison Management System
// username = admin, password = pass

// Prison Class to handle all the functionality
class Prison {
    constructor() {
        // Initialize prisoner data
        this.firstNames = Array(20).fill(" ");
        this.secondNames = Array(20).fill(" ");
        this.gender = Array(20).fill(" ");
        this.cellNo = [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 
                      1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020];
        this.age = Array(20).fill(0);
        this.height = Array(20).fill(0);
        this.eyeColor = Array(20).fill(" ");
        this.crime = Array(20).fill(" ");
        this.punishmentMonths = Array(20).fill(0);
        this.prisonerCount = 0;
        
        // Add new arrays for entry date/time and last update date/time
        this.entryDateTime = Array(20).fill("");
        this.lastUpdateDateTime = Array(20).fill("");
        
        // Add arrays for court hearings
        this.previousHearings = Array(20).fill().map(() => []);
        this.upcomingHearings = Array(20).fill().map(() => []);
        
        // Load data from localStorage if available
        this.loadDataFromStorage();
        
        // Initialize crime suggestion data
        this.crimeCategories = {
            "M": ["Murder", "Manslaughter", "Money Laundering"],
            "T": ["Theft", "Tax Evasion", "Trafficking", "Trespassing"],
            "R": ["Robbery", "Racketeering", "Rape"],
            "A": ["Assault", "Arson", "Armed Robbery", "Abduction"],
            "F": ["Fraud", "Forgery", "Financial Crime"],
            "D": ["Drug Possession", "Drug Trafficking", "Domestic Violence", "DUI"],
            "K": ["Kidnapping", "Killing"],
            "B": ["Burglary", "Battery", "Blackmail", "Bribery"],
            "E": ["Embezzlement", "Extortion"],
            "S": ["Sexual Assault", "Stalking", "Smuggling"],
            "C": ["Cybercrime", "Conspiracy", "Counterfeiting"],
            "H": ["Homicide", "Harassment", "Human Trafficking"],
            "V": ["Vandalism", "Violence"],
            "P": ["Prostitution", "Perjury", "Piracy"],
            "I": ["Identity Theft", "Illegal Immigration", "Insider Trading"]
        };
        
        // Initialize event listeners
        this.initializeEventListeners();
        
        // Display current date and time
        this.updateDateTime();
        setInterval(() => this.updateDateTime(), 1000);
        
        // Show loading animation on front page
        this.showLoadingAnimation();
    }
    
    // Initialize all event listeners
    initializeEventListeners() {
        // Front page
        document.getElementById('continue-btn').addEventListener('click', () => {
            this.showPage('login-page');
        });
        
        // Login page
        document.getElementById('login-btn').addEventListener('click', () => {
            this.login();
        });
        
        // Main menu buttons
        document.getElementById('new-prisoner').addEventListener('click', () => {
            this.showPage('new-prisoner-page');
        });
        
        document.getElementById('prisoner-details').addEventListener('click', () => {
            this.showPage('prisoner-details-page');
            this.showPrisonerDetails();
        });
        
        document.getElementById('court-hearings').addEventListener('click', () => {
            this.showPage('court-hearings-page');
            this.showCourtHearings();
        });
        
        document.getElementById('edit-prisoner').addEventListener('click', () => {
            this.showPage('edit-prisoner-page');
            this.resetEditForm();
        });
        
        document.getElementById('release-prisoner').addEventListener('click', () => {
            this.showPage('release-page');
            this.showReleasePrisoners();
        });
        
        document.getElementById('search-prisoner').addEventListener('click', () => {
            this.showPage('search-page');
        });
        
        document.getElementById('prison-file').addEventListener('click', () => {
            this.showPage('file-page');
        });
        
        document.getElementById('logout').addEventListener('click', () => {
            this.logout();
        });
        
        document.getElementById('exit').addEventListener('click', () => {
            this.exit();
        });
        
        // New prisoner page
        document.getElementById('save-prisoner').addEventListener('click', () => {
            console.log("Save prisoner button clicked");
            this.addPrisoner();
        });
        
        document.getElementById('back-to-menu').addEventListener('click', () => {
            this.showPage('main-menu');
        });
        
        // Edit prisoner page
        document.getElementById('load-prisoner').addEventListener('click', () => {
            this.loadPrisonerForEdit();
        });
        
        document.getElementById('update-prisoner').addEventListener('click', () => {
            this.updatePrisoner();
        });
        
        document.getElementById('edit-back').addEventListener('click', () => {
            this.showPage('main-menu');
        });
        
        // Details page
        document.getElementById('details-back').addEventListener('click', () => {
            this.showPage('main-menu');
        });
        
        // Court Hearings page
        document.getElementById('load-hearing-history').addEventListener('click', () => {
            this.loadHearingHistory();
        });
        
        document.getElementById('add-hearing').addEventListener('click', () => {
            this.addHearing();
        });
        
        document.getElementById('hearings-back').addEventListener('click', () => {
            this.showPage('main-menu');
        });
        
        // Release page
        document.getElementById('check-release').addEventListener('click', () => {
            this.checkRelease();
        });
        
        document.getElementById('confirm-release').addEventListener('click', () => {
            this.releasePrisoner();
        });
        
        document.getElementById('release-back').addEventListener('click', () => {
            this.showPage('main-menu');
        });
        
        // Search page
        document.getElementById('search-btn').addEventListener('click', () => {
            this.searchPrisoner();
        });
        
        document.getElementById('search-back').addEventListener('click', () => {
            this.showPage('main-menu');
        });
        
        // File page
        document.getElementById('txt-file').addEventListener('click', () => {
            this.generateFile('txt');
        });
        
        document.getElementById('html-file').addEventListener('click', () => {
            this.generateFile('html');
        });
        
        document.getElementById('doc-file').addEventListener('click', () => {
            this.generateFile('doc');
        });
        
        document.getElementById('file-back').addEventListener('click', () => {
            this.showPage('main-menu');
        });
        
        // Storage management
        document.getElementById('clear-storage').addEventListener('click', () => {
            this.clearStorage();
        });

        // Add keyboard events for login form
        document.getElementById('password').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.login();
            }
        });

        // Date of birth event listeners
        document.getElementById('dob').addEventListener('change', () => {
            this.calculateAge('dob', 'age');
        });
        
        document.getElementById('edit-dob').addEventListener('change', () => {
            this.calculateAge('edit-dob', 'edit-age');
        });
        
        // Crime suggestion event listeners for new prisoner
        document.getElementById('crime').addEventListener('input', (e) => {
            this.showCrimeSuggestions(e.target.value, 'crime-suggestions');
        });
        
        document.getElementById('crime').addEventListener('focus', (e) => {
            if (e.target.value) {
                this.showCrimeSuggestions(e.target.value, 'crime-suggestions');
            }
        });
        
        document.getElementById('crime').addEventListener('blur', () => {
            // Small delay to allow clicking on a suggestion
            setTimeout(() => {
                document.getElementById('crime-suggestions').style.display = 'none';
            }, 200);
        });
        
        document.getElementById('crime').addEventListener('keydown', (e) => {
            this.handleSuggestionKeyNavigation(e, 'crime-suggestions', 'crime');
        });
        
        // Crime suggestion event listeners for edit prisoner
        document.getElementById('edit-crime').addEventListener('input', (e) => {
            this.showCrimeSuggestions(e.target.value, 'edit-crime-suggestions');
        });
        
        document.getElementById('edit-crime').addEventListener('focus', (e) => {
            if (e.target.value) {
                this.showCrimeSuggestions(e.target.value, 'edit-crime-suggestions');
            }
        });
        
        document.getElementById('edit-crime').addEventListener('blur', () => {
            // Small delay to allow clicking on a suggestion
            setTimeout(() => {
                document.getElementById('edit-crime-suggestions').style.display = 'none';
            }, 200);
        });
        
        document.getElementById('edit-crime').addEventListener('keydown', (e) => {
            this.handleSuggestionKeyNavigation(e, 'edit-crime-suggestions', 'edit-crime');
        });
    }
    
    // Show loading animation on the front page
    showLoadingAnimation() {
        const progressBar = document.querySelector('.progress');
        progressBar.style.width = '100%';
    }
    
    // Update date and time in all pages
    updateDateTime() {
        const now = new Date();
        
        // Format time as HH:MM:SS
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        
        // Format date as DD/MM/YYYY
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const dateString = `${day}/${month}/${year}`;
        
        // Update time in all pages without emojis for a more professional look
        document.getElementById('time').textContent = `Time: ${timeString}`;
        document.getElementById('date').textContent = `Date: ${dateString}`;
        
        // Update login date
        const loginDate = document.getElementById('login-date');
        if (loginDate) {
            loginDate.textContent = `Date: ${dateString}`;
        }
        
        // Update all time elements
        const timeElements = ['login-time', 'menu-time', 'new-prisoner-time', 
                             'details-time', 'hearings-time', 'edit-time',
                             'release-time', 'search-time', 'file-time'];
                             
        timeElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = `Time: ${timeString}`;
            }
        });
        
        // Update all date elements
        const dateElements = ['menu-date', 'new-prisoner-date', 'details-date', 
                             'hearings-date', 'edit-date', 'release-date',
                             'search-date', 'file-date'];
                             
        dateElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = `Date: ${dateString}`;
            }
        });
    }
    
    // Show specific page and hide others
    showPage(pageId) {
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.style.display = 'none';
        });
        
        document.getElementById(pageId).style.display = 'block';
    }
    
    // Login functionality
    login() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const loginAttempts = document.getElementById('login-attempts');
        
        if (username === 'admin' && password === 'pass') {
            loginAttempts.textContent = '';
            this.showPage('main-menu');
        } else {
            // Get current attempts or set to 0
            let attempts = parseInt(loginAttempts.getAttribute('data-attempts') || '0');
            attempts++;
            
            // Update attempts
            loginAttempts.setAttribute('data-attempts', attempts);
            
            if (attempts >= 3) {
                loginAttempts.textContent = 'No permission to enter the system!';
                setTimeout(() => {
                    window.close();
                }, 2000);
            } else {
                loginAttempts.textContent = `No. of attempts remain: ${3 - attempts}`;
            }
        }
    }
    
    // Logout functionality
    logout() {
        const loginPage = document.getElementById('login-page');
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementById('login-attempts').textContent = '';
        document.getElementById('login-attempts').setAttribute('data-attempts', '0');
        
        // Show loading message
        this.showPage('front-page');
        const continueBtn = document.getElementById('continue-btn');
        continueBtn.style.display = 'none';
        
        const subheader = document.querySelector('.subheader');
        const originalText = subheader.innerHTML;
        subheader.innerHTML = 'Logging out...';
        
        setTimeout(() => {
            subheader.innerHTML = originalText;
            continueBtn.style.display = 'block';
            this.showPage('login-page');
        }, 2000);
        
        // Save data to localStorage
        this.saveDataToStorage();
    }
    
    // Exit the application
    exit() {
        this.showPage('front-page');
        const continueBtn = document.getElementById('continue-btn');
        continueBtn.style.display = 'none';
        
        const subheader = document.querySelector('.subheader');
        const originalText = subheader.innerHTML;
        subheader.innerHTML = 'Thank you!!';
        
        setTimeout(() => {
            window.close();
        }, 2000);
    }
    
    // Calculate age from date of birth
    calculateAge(dobId, ageId) {
        const dobInput = document.getElementById(dobId);
        const ageInput = document.getElementById(ageId);
        
        if (dobInput.value) {
            const dob = new Date(dobInput.value);
            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                age--;
            }
            
            ageInput.value = age;
        } else {
            ageInput.value = '';
        }
    }
    
    // Add a new prisoner
    addPrisoner() {
        console.log("addPrisoner method called"); // Debug statement
        
        try {
            // Find the next available slot
            let index = -1;
            for (let i = 0; i < 20; i++) {
                if (this.firstNames[i] === " ") {
                    index = i;
                    break;
                }
            }
            
            if (index === -1) {
                alert("Maximum capacity reached. Cannot add more prisoners.");
                return;
            }
            
            // Get input values
            const firstName = document.getElementById('first-name').value.trim();
            const secondName = document.getElementById('second-name').value.trim();
            
            // Get selected gender from radio buttons
            let gender = "";
            const genderRadios = document.getElementsByName('gender');
            for (const radio of genderRadios) {
                if (radio.checked) {
                    gender = radio.value;
                    break;
                }
            }
            
            const dob = document.getElementById('dob').value;
            const ageElement = document.getElementById('age');
            const heightElement = document.getElementById('height');
            const eyeColor = document.getElementById('eye-color').value.trim();
            const crime = document.getElementById('crime').value.trim();
            const punishmentElement = document.getElementById('punishment');
            
            // Sanitize numeric inputs
            let age = 0;
            if (ageElement.value && !isNaN(ageElement.value)) {
                age = parseInt(ageElement.value);
            }
            
            let height = 0;
            if (heightElement.value && !isNaN(heightElement.value)) {
                height = parseFloat(heightElement.value);
            }
            
            let punishment = 0;
            if (punishmentElement.value && !isNaN(punishmentElement.value)) {
                punishment = parseInt(punishmentElement.value);
            }
            
            // Validate inputs with more detailed feedback
            let missingFields = [];
            if (!firstName) missingFields.push("First Name");
            if (!secondName) missingFields.push("Second Name");
            if (!gender) missingFields.push("Gender");
            if (!dob) missingFields.push("Date of Birth");
            if (!age) missingFields.push("Age");
            if (!height) missingFields.push("Height");
            if (!eyeColor) missingFields.push("Eye Color");
            if (!crime) missingFields.push("Crime");
            if (!punishment) missingFields.push("Punishment");
            
            if (missingFields.length > 0) {
                alert("Please fill the following fields with valid information:\n• " + missingFields.join("\n• "));
                return;
            }
            
            // Get current date and time for entry timestamp
            const now = new Date();
            let formattedDateTime;
            try {
                formattedDateTime = this.formatDateTime(now);
            } catch (dateError) {
                console.error("Error formatting date:", dateError);
                formattedDateTime = now.toLocaleString(); // Fallback
            }
            
            // Store the data
            this.firstNames[index] = firstName;
            this.secondNames[index] = secondName;
            this.gender[index] = gender;
            this.age[index] = age;
            this.height[index] = height;
            this.eyeColor[index] = eyeColor;
            this.crime[index] = crime;
            this.punishmentMonths[index] = punishment;
            this.entryDateTime[index] = formattedDateTime;
            this.lastUpdateDateTime[index] = formattedDateTime;
            
            // Update prisoner count
            this.prisonerCount++;
            
            // Save data to localStorage
            try {
                this.saveDataToStorage();
            } catch (storageError) {
                console.error("Error saving to localStorage:", storageError);
                // Continue even if storage fails
            }
            
            // Show cell info
            const cellInfo = document.getElementById('cell-info');
            cellInfo.textContent = `Your Cell No is ${this.cellNo[index]}`;
            
            // Show success alert
            alert(`Prisoner ${firstName} ${secondName} has been added successfully to cell ${this.cellNo[index]}.`);
            
            // Clear inputs
            document.getElementById('first-name').value = '';
            document.getElementById('second-name').value = '';
            
            // Clear gender radio buttons
            const genderRadios2 = document.getElementsByName('gender');
            for (const radio of genderRadios2) {
                radio.checked = false;
            }
            
            document.getElementById('dob').value = '';
            document.getElementById('age').value = '';
            document.getElementById('height').value = '';
            document.getElementById('eye-color').value = '';
            document.getElementById('crime').value = '';
            document.getElementById('punishment').value = '';
            
            console.log("Prisoner added successfully:", this.firstNames[index], this.secondNames[index]);
            return true; // Indicate success
        } catch (error) {
            console.error("Error in addPrisoner method:", error);
            if (error.message) {
                console.error("Error message:", error.message);
            }
            if (error.stack) {
                console.error("Error stack:", error.stack);
            }
            alert("An error occurred while saving the prisoner data. Please try again.");
            return false; // Indicate failure
        }
    }
    
    // Show prisoner details
    showPrisonerDetails() {
        const tableBody = document.getElementById('prisoners-list');
        const noPrisoners = document.getElementById('no-prisoners');
        tableBody.innerHTML = '';
        
        let count = 0;
        
        for (let i = 0; i < 20; i++) {
            if (this.firstNames[i] !== " ") {
                count++;
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${count}</td>
                    <td>${this.firstNames[i]} ${this.secondNames[i]}</td>
                    <td>${this.cellNo[i]}</td>
                    <td>${this.age[i]}</td>
                    <td>${this.gender[i]}</td>
                    <td>${this.height[i]}</td>
                    <td>${this.eyeColor[i]}</td>
                    <td>${this.crime[i]}</td>
                    <td>${this.punishmentMonths[i]}</td>
                    <td>${this.entryDateTime[i] || 'N/A'}</td>
                    <td>${this.lastUpdateDateTime[i] || 'N/A'}</td>
                `;
                tableBody.appendChild(row);
            }
        }
        
        if (count === 0) {
            noPrisoners.style.display = 'block';
            document.getElementById('prisoners-table').style.display = 'none';
        } else {
            noPrisoners.style.display = 'none';
            document.getElementById('prisoners-table').style.display = 'table';
        }
    }
    
    // Show court hearings page
    showCourtHearings() {
        const tableBody = document.getElementById('hearings-list');
        const noPrisoners = document.getElementById('no-hearings-prisoners');
        const hearingsForm = document.getElementById('hearings-form');
        const hearingDetails = document.getElementById('hearing-details');
        const hearingResult = document.getElementById('hearing-result');
        
        tableBody.innerHTML = '';
        hearingResult.innerHTML = '';
        hearingDetails.style.display = 'none';
        
        let count = 0;
        
        for (let i = 0; i < 20; i++) {
            if (this.firstNames[i] !== " ") {
                count++;
                const row = document.createElement('tr');
                
                // Count previous and upcoming hearings
                const prevCount = this.previousHearings[i].length;
                const upcomingCount = this.upcomingHearings[i].length;
                
                row.innerHTML = `
                    <td>${this.firstNames[i]} ${this.secondNames[i]}</td>
                    <td>${this.cellNo[i]}</td>
                    <td>${this.crime[i]}</td>
                    <td>${prevCount} previous hearing${prevCount !== 1 ? 's' : ''}</td>
                    <td>${upcomingCount} upcoming hearing${upcomingCount !== 1 ? 's' : ''}</td>
                    <td>
                        <button class="btn view-hearings" data-cell="${this.cellNo[i]}">View Details</button>
                    </td>
                `;
                tableBody.appendChild(row);
                
                // Add event listener to the view button
                const viewButton = row.querySelector('.view-hearings');
                viewButton.addEventListener('click', () => {
                    this.loadHearingHistory(this.cellNo[i]);
                });
            }
        }
        
        if (count === 0) {
            noPrisoners.style.display = 'block';
            document.getElementById('hearings-table').style.display = 'none';
            hearingsForm.style.display = 'none';
        } else {
            noPrisoners.style.display = 'none';
            document.getElementById('hearings-table').style.display = 'table';
            hearingsForm.style.display = 'block';
        }
    }
    
    // Load hearing history for a prisoner
    loadHearingHistory(cellBlock) {
        if (!cellBlock) {
            cellBlock = parseInt(document.getElementById('hearing-cell-block').value);
        }
        
        const hearingResult = document.getElementById('hearing-result');
        const hearingDetails = document.getElementById('hearing-details');
        const previousList = document.getElementById('previous-hearings-list');
        const upcomingList = document.getElementById('upcoming-hearings-list');
        const prisonerNameSpan = document.getElementById('hearing-prisoner-name');
        
        // Reset elements
        hearingResult.innerHTML = '';
        previousList.innerHTML = '';
        upcomingList.innerHTML = '';
        hearingDetails.style.display = 'none';
        
        if (isNaN(cellBlock) || cellBlock < 1001 || cellBlock > 1020) {
            hearingResult.innerHTML = 'Invalid cell block number';
            return;
        }
        
        const index = cellBlock - 1001;
        
        if (this.firstNames[index] === " ") {
            hearingResult.innerHTML = 'No prisoner in this cell block';
            return;
        }
        
        // Show prisoner name
        const prisonerName = `${this.firstNames[index]} ${this.secondNames[index]}`;
        prisonerNameSpan.textContent = prisonerName;
        
        // Display previous hearings
        if (this.previousHearings[index].length === 0) {
            previousList.innerHTML = '<li>No previous hearings recorded</li>';
        } else {
            // Sort previous hearings by date (newest first)
            const sortedPrevious = [...this.previousHearings[index]].sort((a, b) => 
                new Date(b.date + 'T' + b.time) - new Date(a.date + 'T' + a.time)
            );
            
            sortedPrevious.forEach((hearing, idx) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="hearing-date">${this.formatDateDisplay(hearing.date)} at ${hearing.time}</div>
                    <div class="hearing-type">${hearing.type}</div>
                    ${hearing.notes ? `<div class="hearing-notes">Notes: ${hearing.notes}</div>` : ''}
                    <div class="hearing-action-buttons">
                        <button class="btn delete-hearing" data-index="${idx}" data-type="previous">Delete</button>
                    </div>
                `;
                previousList.appendChild(li);
                
                // Add event listener for delete button
                const deleteBtn = li.querySelector('.delete-hearing');
                deleteBtn.addEventListener('click', (e) => {
                    const hearingIdx = parseInt(e.target.getAttribute('data-index'));
                    this.deleteHearing(index, 'previous', hearingIdx);
                });
            });
        }
        
        // Display upcoming hearings
        if (this.upcomingHearings[index].length === 0) {
            upcomingList.innerHTML = '<li>No upcoming hearings scheduled</li>';
        } else {
            // Sort upcoming hearings by date (soonest first)
            const sortedUpcoming = [...this.upcomingHearings[index]].sort((a, b) => 
                new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time)
            );
            
            sortedUpcoming.forEach((hearing, idx) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="hearing-date">${this.formatDateDisplay(hearing.date)} at ${hearing.time}</div>
                    <div class="hearing-type">${hearing.type}</div>
                    ${hearing.notes ? `<div class="hearing-notes">Notes: ${hearing.notes}</div>` : ''}
                    <div class="hearing-action-buttons">
                        <button class="btn edit-hearing" data-index="${idx}">Edit</button>
                        <button class="btn delete-hearing" data-index="${idx}" data-type="upcoming">Delete</button>
                    </div>
                `;
                upcomingList.appendChild(li);
                
                // Add event listeners for buttons
                const deleteBtn = li.querySelector('.delete-hearing');
                deleteBtn.addEventListener('click', (e) => {
                    const hearingIdx = parseInt(e.target.getAttribute('data-index'));
                    this.deleteHearing(index, 'upcoming', hearingIdx);
                });
                
                const editBtn = li.querySelector('.edit-hearing');
                editBtn.addEventListener('click', (e) => {
                    const hearingIdx = parseInt(e.target.getAttribute('data-index'));
                    this.editHearing(index, hearingIdx);
                });
            });
        }
        
        // Set the cell block as a data attribute for the add button
        document.getElementById('add-hearing').setAttribute('data-cell', cellBlock);
        
        // Show hearing details section
        hearingDetails.style.display = 'block';
    }
    
    // Format date for display
    formatDateDisplay(dateStr) {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    
    // Add a new hearing
    addHearing() {
        const cellBlock = parseInt(document.getElementById('add-hearing').getAttribute('data-cell'));
        const index = cellBlock - 1001;
        const hearingResult = document.getElementById('hearing-result');
        
        // Get input values
        const hearingDate = document.getElementById('hearing-date').value;
        const hearingTime = document.getElementById('hearing-time').value;
        const hearingType = document.getElementById('hearing-type').value;
        const hearingNotes = document.getElementById('hearing-notes').value;
        
        // Validate inputs
        if (!hearingDate || !hearingTime || !hearingType) {
            hearingResult.innerHTML = 'Please fill all required fields (date, time, and type)';
            return;
        }
        
        // Create hearing object
        const hearing = {
            date: hearingDate,
            time: hearingTime,
            type: hearingType,
            notes: hearingNotes
        };
        
        // Check if the hearing is in the past or future
        const hearingDateTime = new Date(hearingDate + 'T' + hearingTime);
        const now = new Date();
        
        if (hearingDateTime < now) {
            // Past hearing
            this.previousHearings[index].push(hearing);
        } else {
            // Future hearing
            this.upcomingHearings[index].push(hearing);
        }
        
        // Save data to localStorage
        this.saveDataToStorage();
        
        // Show success message
        hearingResult.innerHTML = 'Hearing added successfully';
        
        // Clear inputs
        document.getElementById('hearing-date').value = '';
        document.getElementById('hearing-time').value = '';
        document.getElementById('hearing-type').selectedIndex = 0;
        document.getElementById('hearing-notes').value = '';
        
        // Reload hearing history
        this.loadHearingHistory(cellBlock);
    }
    
    // Delete a hearing
    deleteHearing(prisonerIndex, hearingType, hearingIndex) {
        if (hearingType === 'previous') {
            this.previousHearings[prisonerIndex].splice(hearingIndex, 1);
        } else {
            this.upcomingHearings[prisonerIndex].splice(hearingIndex, 1);
        }
        
        // Save data to localStorage
        this.saveDataToStorage();
        
        // Reload hearing history
        const cellBlock = prisonerIndex + 1001;
        this.loadHearingHistory(cellBlock);
        
        // Show success message
        const hearingResult = document.getElementById('hearing-result');
        hearingResult.innerHTML = 'Hearing deleted successfully';
    }
    
    // Edit a hearing
    editHearing(prisonerIndex, hearingIndex) {
        const hearing = this.upcomingHearings[prisonerIndex][hearingIndex];
        
        // Populate form with hearing data
        document.getElementById('hearing-date').value = hearing.date;
        document.getElementById('hearing-time').value = hearing.time;
        
        // Set the hearing type in the dropdown
        const typeSelect = document.getElementById('hearing-type');
        for (let i = 0; i < typeSelect.options.length; i++) {
            if (typeSelect.options[i].value === hearing.type) {
                typeSelect.selectedIndex = i;
                break;
            }
        }
        
        document.getElementById('hearing-notes').value = hearing.notes || '';
        
        // Delete the old hearing
        this.upcomingHearings[prisonerIndex].splice(hearingIndex, 1);
        
        // Save data to localStorage
        this.saveDataToStorage();
        
        // Show message to edit and save
        const hearingResult = document.getElementById('hearing-result');
        hearingResult.innerHTML = 'Edit the hearing details and click Add Hearing to save changes';
        
        // Scroll to the add hearing form
        document.querySelector('.add-hearing-form').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Show release prisoners page
    showReleasePrisoners() {
        const tableBody = document.getElementById('release-list');
        const noPrisoners = document.getElementById('no-release-prisoners');
        const releaseForm = document.getElementById('release-form');
        const releaseStatus = document.getElementById('release-status');
        const confirmButton = document.getElementById('confirm-release');
        
        tableBody.innerHTML = '';
        releaseStatus.innerHTML = '';
        confirmButton.style.display = 'none';
        
        let count = 0;
        
        for (let i = 0; i < 20; i++) {
            if (this.firstNames[i] !== " ") {
                count++;
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${this.firstNames[i]} ${this.secondNames[i]}</td>
                    <td>${this.cellNo[i]}</td>
                    <td>${this.age[i]}</td>
                    <td>${this.gender[i]}</td>
                    <td>${this.height[i]}</td>
                    <td>${this.eyeColor[i]}</td>
                    <td>${this.crime[i]}</td>
                    <td>${this.punishmentMonths[i]}</td>
                `;
                tableBody.appendChild(row);
            }
        }
        
        if (count === 0) {
            noPrisoners.style.display = 'block';
            document.getElementById('release-table').style.display = 'none';
            releaseForm.style.display = 'none';
        } else {
            noPrisoners.style.display = 'none';
            document.getElementById('release-table').style.display = 'table';
            releaseForm.style.display = 'block';
        }
    }
    
    // Check if prisoner is ready for release
    checkRelease() {
        const cellBlock = parseInt(document.getElementById('release-cell-block').value);
        const releaseStatus = document.getElementById('release-status');
        const confirmButton = document.getElementById('confirm-release');
        
        if (isNaN(cellBlock) || cellBlock < 1001 || cellBlock > 1020) {
            releaseStatus.innerHTML = 'Invalid cell block number';
            confirmButton.style.display = 'none';
            return;
        }
        
        const index = cellBlock - 1001;
        
        if (this.firstNames[index] === " ") {
            releaseStatus.innerHTML = 'No prisoner in this cell block';
            confirmButton.style.display = 'none';
            return;
        }
        
        // Check if prisoner can be released
        releaseStatus.innerHTML = `Name: ${this.firstNames[index]} ${this.secondNames[index]}<br>`;
        
        if (this.punishmentMonths[index] <= 0) {
            releaseStatus.innerHTML += 'Prisoner is ready for release';
            confirmButton.style.display = 'block';
            confirmButton.setAttribute('data-cell', cellBlock);
        } else {
            releaseStatus.innerHTML += 'Prisoner is not ready for release';
            confirmButton.style.display = 'none';
        }
    }
    
    // Release prisoner
    releasePrisoner() {
        const cellBlock = parseInt(document.getElementById('confirm-release').getAttribute('data-cell'));
        const index = cellBlock - 1001;
        const releaseStatus = document.getElementById('release-status');
        const confirmButton = document.getElementById('confirm-release');
        
        // Release the prisoner
        this.firstNames[index] = " ";
        this.secondNames[index] = " ";
        this.gender[index] = " ";
        this.age[index] = 0;
        this.height[index] = 0;
        this.eyeColor[index] = " ";
        this.crime[index] = " ";
        this.punishmentMonths[index] = 0;
        
        // Show processing message
        releaseStatus.innerHTML = 'Processing';
        confirmButton.style.display = 'none';
        
        let dots = '.';
        const processingInterval = setInterval(() => {
            releaseStatus.innerHTML = 'Processing' + dots;
            dots += '.';
            if (dots.length > 7) {
                clearInterval(processingInterval);
                releaseStatus.innerHTML = 'Prisoner released successfully';
                
                // Refresh the release table
                this.showReleasePrisoners();
            }
        }, 300);
        
        // Save data to localStorage
        this.saveDataToStorage();
    }
    
    // Search for a prisoner
    searchPrisoner() {
        const cellBlock = parseInt(document.getElementById('search-cell').value);
        const searchList = document.getElementById('search-list');
        const searchMessage = document.getElementById('search-message');
        const searchTable = document.getElementById('search-table');
        
        searchList.innerHTML = '';
        searchMessage.innerHTML = '';
        
        if (isNaN(cellBlock) || cellBlock < 1001 || cellBlock > 1020) {
            searchMessage.innerHTML = 'Invalid cell block number';
            searchTable.style.display = 'none';
            return;
        }
        
        const index = cellBlock - 1001;
        
        if (this.cellNo[index] === cellBlock) {
            if (this.firstNames[index] !== " ") {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${this.firstNames[index]} ${this.secondNames[index]}</td>
                    <td>${this.cellNo[index]}</td>
                    <td>${this.age[index]}</td>
                    <td>${this.gender[index]}</td>
                    <td>${this.height[index]}</td>
                    <td>${this.eyeColor[index]}</td>
                    <td>${this.crime[index]}</td>
                    <td>${this.punishmentMonths[index]}</td>
                    <td>${this.entryDateTime[index] || 'N/A'}</td>
                `;
                searchList.appendChild(row);
                searchTable.style.display = 'table';
            } else {
                searchMessage.innerHTML = 'Cell block empty';
                searchTable.style.display = 'none';
            }
        } else {
            searchMessage.innerHTML = 'Invalid cell ID';
            searchTable.style.display = 'none';
        }
    }
    
    // Generate file in different formats
    generateFile(format) {
        const fileMessage = document.getElementById('file-message');
        let content = '';
        
        switch (format) {
            case 'txt':
                content = this.generateTxtFile();
                fileMessage.innerHTML = 'TXT File created successfully';
                break;
            case 'html':
                content = this.generateHtmlFile();
                fileMessage.innerHTML = 'HTML File created successfully';
                break;
            case 'doc':
                content = this.generateDocFile();
                fileMessage.innerHTML = 'Word File created successfully';
                break;
            default:
                fileMessage.innerHTML = 'Invalid file format';
                return;
        }
        
        // Create and download the file
        const blob = new Blob([content], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `Prison_Data.${format}`;
        a.click();
    }
    
    // Generate TXT file content
    generateTxtFile() {
        let content = '\t\t\t\t    -----------------------------------------------------\n';
        content += '\t\t\t\t\t\tPRISONERS LIST\n';
        content += '\t\t\t\t    -----------------------------------------------------\n\n';
        content += 'SR.\tNAME\t\t\tCELL\tAGE\tGENDER\tHEIGHT\tEYE COLOR\tCRIME\t\tPUNISHMENT\tENTRY DATE/TIME\t\tLAST UPDATE DATE/TIME\n';
        content += '---------------------------------------------------------------------------------------------------------------------\n';
        
        let count = 0;
        let hasPrisoners = false;
        
        for (let i = 0; i < 20; i++) {
            if (this.firstNames[i] !== " ") {
                count++;
                content += `${count}\t${this.firstNames[i]} ${this.secondNames[i]}\t\t${this.cellNo[i]}\t${this.age[i]}\t\t${this.gender[i]}\t${this.height[i]}\t\t${this.eyeColor[i]}\t\t${this.crime[i]}\t\t${this.punishmentMonths[i]}\t\t${this.entryDateTime[i] || 'N/A'}\t\t${this.lastUpdateDateTime[i] || 'N/A'}\n`;
                
                // Add court hearings information
                if (this.previousHearings[i].length > 0 || this.upcomingHearings[i].length > 0) {
                    content += "\nCOURT HEARINGS:\n";
                    
                    if (this.previousHearings[i].length > 0) {
                        content += "Previous Hearings:\n";
                        this.previousHearings[i].forEach(hearing => {
                            content += `- ${hearing.date} at ${hearing.time}: ${hearing.type}`;
                            if (hearing.notes) content += ` (${hearing.notes})`;
                            content += "\n";
                        });
                    }
                    
                    if (this.upcomingHearings[i].length > 0) {
                        content += "Upcoming Hearings:\n";
                        this.upcomingHearings[i].forEach(hearing => {
                            content += `- ${hearing.date} at ${hearing.time}: ${hearing.type}`;
                            if (hearing.notes) content += ` (${hearing.notes})`;
                            content += "\n";
                        });
                    }
                }
                
                content += "\n";
                hasPrisoners = true;
            }
        }
        
        if (!hasPrisoners) {
            content += '\n\t\t\t\t\tNo prisoner Present\n';
        }
        
        return content;
    }
    
    // Generate HTML file content
    generateHtmlFile() {
        let content = `<!DOCTYPE html>
<html>
<head>
    <title>Prison Data</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { text-align: center; }
        .prisoner { margin-bottom: 30px; border-bottom: 1px solid #ccc; padding-bottom: 20px; }
        .hearings { margin-left: 20px; margin-top: 10px; }
        .previous-hearings, .upcoming-hearings { margin-bottom: 15px; }
        .hearing-item { margin-bottom: 5px; padding: 5px; background-color: #f5f5f5; border-radius: 3px; }
        .previous-hearing { border-left: 4px solid #808080; }
        .upcoming-hearing { border-left: 4px solid #2196F3; }
        .hearing-date { font-weight: bold; }
        .hearing-notes { font-style: italic; color: #666; }
    </style>
</head>
<body>
    <h1>Prisoner List</h1>`;
        
        let hasPrisoners = false;
        
        for (let i = 0; i < 20; i++) {
            if (this.firstNames[i] !== " ") {
                content += `
    <div class="prisoner">
        <p>First name: ${this.firstNames[i]}</p>
        <p>Second name: ${this.secondNames[i]}</p>
        <p>Cell number: ${this.cellNo[i]}</p>
        <p>Age: ${this.age[i]}</p>
        <p>Gender: ${this.gender[i]}</p>
        <p>Height: ${this.height[i]}</p>
        <p>Eye colour: ${this.eyeColor[i]}</p>
        <p>Crime: ${this.crime[i]}</p>
        <p>Punishment Months: ${this.punishmentMonths[i]}</p>
        <p>Entry Date/Time: ${this.entryDateTime[i] || 'N/A'}</p>`;
        
                // Add court hearings
                if (this.previousHearings[i].length > 0 || this.upcomingHearings[i].length > 0) {
                    content += `
        <div class="hearings">
            <h3>Court Hearings</h3>`;
                    
                    if (this.previousHearings[i].length > 0) {
                        content += `
            <div class="previous-hearings">
                <h4>Previous Hearings</h4>`;
                        
                        this.previousHearings[i].forEach(hearing => {
                            content += `
                <div class="hearing-item previous-hearing">
                    <div class="hearing-date">${hearing.date} at ${hearing.time}</div>
                    <div class="hearing-type">Type: ${hearing.type}</div>
                    ${hearing.notes ? `<div class="hearing-notes">Notes: ${hearing.notes}</div>` : ''}
                </div>`;
                        });
                        
                        content += `
            </div>`;
                    }
                    
                    if (this.upcomingHearings[i].length > 0) {
                        content += `
            <div class="upcoming-hearings">
                <h4>Upcoming Hearings</h4>`;
                        
                        this.upcomingHearings[i].forEach(hearing => {
                            content += `
                <div class="hearing-item upcoming-hearing">
                    <div class="hearing-date">${hearing.date} at ${hearing.time}</div>
                    <div class="hearing-type">Type: ${hearing.type}</div>
                    ${hearing.notes ? `<div class="hearing-notes">Notes: ${hearing.notes}</div>` : ''}
                </div>`;
                        });
                        
                        content += `
            </div>`;
                    }
                    
                    content += `
        </div>`;
                }
                
                content += `
    </div>`;
                hasPrisoners = true;
            }
        }
        
        if (!hasPrisoners) {
            content += `
    <p>No prisoner Present</p>`;
        }
        
        content += `
</body>
</html>`;
        
        return content;
    }
    
    // Generate DOC file content
    generateDocFile() {
        let content = '\t\t\t *** Prisoner list *** \n\n';
        
        let hasPrisoners = false;
        
        for (let i = 0; i < 20; i++) {
            if (this.firstNames[i] !== " ") {
                content += `First name: ${this.firstNames[i]}\n`;
                content += `Second name: ${this.secondNames[i]}\n`;
                content += `Cell number: ${this.cellNo[i]}\n`;
                content += `Age: ${this.age[i]}\n`;
                content += `Gender: ${this.gender[i]}\n`;
                content += `Height: ${this.height[i]}\n`;
                content += `Eye colour: ${this.eyeColor[i]}\n`;
                content += `Crime: ${this.crime[i]}\n`;
                content += `Punishment Months: ${this.punishmentMonths[i]}\n`;
                content += `Entry Date/Time: ${this.entryDateTime[i] || 'N/A'}\n`;
                content += `Last Update Date/Time: ${this.lastUpdateDateTime[i] || 'N/A'}\n`;
                
                // Add court hearings
                if (this.previousHearings[i].length > 0 || this.upcomingHearings[i].length > 0) {
                    content += "\nCourt Hearings:\n";
                    
                    if (this.previousHearings[i].length > 0) {
                        content += "Previous Hearings:\n";
                        this.previousHearings[i].forEach(hearing => {
                            content += `- ${hearing.date} at ${hearing.time}: ${hearing.type}\n`;
                            if (hearing.notes) content += `  Notes: ${hearing.notes}\n`;
                        });
                    }
                    
                    if (this.upcomingHearings[i].length > 0) {
                        content += "Upcoming Hearings:\n";
                        this.upcomingHearings[i].forEach(hearing => {
                            content += `- ${hearing.date} at ${hearing.time}: ${hearing.type}\n`;
                            if (hearing.notes) content += `  Notes: ${hearing.notes}\n`;
                        });
                    }
                }
                
                content += "\n\n";
                hasPrisoners = true;
            }
        }
        
        if (!hasPrisoners) {
            content += '\n\t\t\t\t\tNo prisoner Present\n';
        }
        
        return content;
    }
    
    // Load prisoner data for editing
    loadPrisonerForEdit() {
        const cellBlock = parseInt(document.getElementById('edit-cell-block').value);
        const editFormContainer = document.getElementById('edit-form-container');
        const editMessage = document.getElementById('edit-message');
        const noPrisonerMessage = document.getElementById('no-prisoner-to-edit');
        const cellInfo = document.getElementById('edit-cell-info');
        
        // Reset UI elements
        editFormContainer.style.display = 'none';
        editMessage.innerHTML = '';
        noPrisonerMessage.style.display = 'none';
        
        // Validate cell block input
        if (isNaN(cellBlock) || cellBlock < 1001 || cellBlock > 1020) {
            editMessage.innerHTML = 'Invalid cell block number';
            return;
        }
        
        const index = cellBlock - 1001;
        
        // Check if prisoner exists in this cell
        if (this.firstNames[index] === " ") {
            noPrisonerMessage.style.display = 'block';
            return;
        }
        
        // Fill form with prisoner data
        document.getElementById('edit-first-name').value = this.firstNames[index];
        document.getElementById('edit-second-name').value = this.secondNames[index];
        
        // Set the appropriate gender radio button
        const genderValue = this.gender[index];
        const editGenderRadios = document.getElementsByName('edit-gender');
        for (const radio of editGenderRadios) {
            if (radio.value === genderValue) {
                radio.checked = true;
                break;
            }
        }
        
        // We don't have the original DOB, so we'll leave it blank
        // and just set the age field
        document.getElementById('edit-age').value = this.age[index];
        document.getElementById('edit-height').value = this.height[index];
        document.getElementById('edit-eye-color').value = this.eyeColor[index];
        document.getElementById('edit-crime').value = this.crime[index];
        document.getElementById('edit-punishment').value = this.punishmentMonths[index];
        
        // Display cell info
        cellInfo.textContent = `Editing prisoner in Cell No ${this.cellNo[index]}`;
        
        // Store current cell block for update function
        document.getElementById('update-prisoner').setAttribute('data-cell', cellBlock);
        
        // Show the edit form
        editFormContainer.style.display = 'block';
    }
    
    // Format date and time in a standard format
    formatDateTime(date) {
        try {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            
            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        } catch (error) {
            console.error("Error in formatDateTime:", error);
            // Return a fallback value if there's an error
            return new Date().toLocaleString();
        }
    }

    // Update prisoner data
    updatePrisoner() {
        const cellBlock = parseInt(document.getElementById('update-prisoner').getAttribute('data-cell'));
        const index = cellBlock - 1001;
        const editMessage = document.getElementById('edit-message');
        
        // Get updated values
        const firstName = document.getElementById('edit-first-name').value;
        const secondName = document.getElementById('edit-second-name').value;
        
        // Get selected gender from radio buttons
        let gender = "";
        const genderRadios = document.getElementsByName('edit-gender');
        for (const radio of genderRadios) {
            if (radio.checked) {
                gender = radio.value;
                break;
            }
        }
        
        const dob = document.getElementById('edit-dob').value;
        const age = parseInt(document.getElementById('edit-age').value);
        const height = parseFloat(document.getElementById('edit-height').value);
        const eyeColor = document.getElementById('edit-eye-color').value;
        const crime = document.getElementById('edit-crime').value;
        const punishment = parseInt(document.getElementById('edit-punishment').value);
        
        // Validate inputs
        if (!firstName || !secondName || !gender || isNaN(age) || isNaN(height) || !eyeColor || !crime || isNaN(punishment)) {
            editMessage.innerHTML = 'Please fill all fields with valid information.';
            return;
        }
        
        // Get current date and time for update timestamp
        const now = new Date();
        const formattedDateTime = this.formatDateTime(now);
        
        // Update prisoner data
        this.firstNames[index] = firstName;
        this.secondNames[index] = secondName;
        this.gender[index] = gender;
        this.age[index] = age;
        this.height[index] = height;
        this.eyeColor[index] = eyeColor;
        this.crime[index] = crime;
        this.punishmentMonths[index] = punishment;
        this.lastUpdateDateTime[index] = formattedDateTime;
        
        // Show success message
        editMessage.innerHTML = 'Prisoner details updated successfully';
        
        // Reset form after successful update
        this.resetEditForm();
        
        // Save data to localStorage
        this.saveDataToStorage();
    }
    
    // Reset edit form
    resetEditForm() {
        document.getElementById('edit-cell-block').value = '';
        document.getElementById('edit-form-container').style.display = 'none';
        document.getElementById('edit-message').innerHTML = '';
        document.getElementById('no-prisoner-to-edit').style.display = 'none';
        
        document.getElementById('edit-first-name').value = '';
        document.getElementById('edit-second-name').value = '';
        
        // Clear gender radio buttons
        const genderRadios = document.getElementsByName('edit-gender');
        for (const radio of genderRadios) {
            radio.checked = false;
        }
        
        document.getElementById('edit-dob').value = '';
        document.getElementById('edit-age').value = '';
        document.getElementById('edit-height').value = '';
        document.getElementById('edit-eye-color').value = '';
        document.getElementById('edit-crime').value = '';
        document.getElementById('edit-punishment').value = '';
        document.getElementById('edit-cell-info').textContent = '';
    }
    
    // Show crime suggestions
    showCrimeSuggestions(input, suggestionsId) {
        const suggestionsContainer = document.getElementById(suggestionsId);
        suggestionsContainer.innerHTML = '';
        
        if (!input || input.length < 1) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        // Get the input field ID based on which suggestions container we're using
        const inputId = suggestionsId === 'crime-suggestions' ? 'crime' : 'edit-crime';
        
        // Find matches from all categories
        let matchedSuggestions = [];
        
        // If it's just one letter, show all suggestions for that letter
        if (input.length === 1) {
            matchedSuggestions = this.crimeCategories[input.toUpperCase()] || [];
        } else {
            // Search in all categories for partial matches
            for (const category in this.crimeCategories) {
                const categorySuggestions = this.crimeCategories[category];
                const matches = categorySuggestions.filter(suggestion => 
                    suggestion.toLowerCase().includes(input.toLowerCase())
                );
                matchedSuggestions = [...matchedSuggestions, ...matches];
            }
        }
        
        // Sort suggestions alphabetically
        matchedSuggestions.sort();
        
        // Remove duplicates if any
        matchedSuggestions = [...new Set(matchedSuggestions)];
        
        if (matchedSuggestions.length === 0) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        matchedSuggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'crime-suggestion-item';
            suggestionItem.textContent = suggestion;
            suggestionItem.addEventListener('click', () => {
                document.getElementById(inputId).value = suggestion;
                suggestionsContainer.style.display = 'none';
            });
            suggestionsContainer.appendChild(suggestionItem);
        });
        
        suggestionsContainer.style.display = 'block';
    }
    
    // Handle suggestion key navigation
    handleSuggestionKeyNavigation(e, suggestionsId, inputId) {
        const suggestionsContainer = document.getElementById(suggestionsId);
        
        // Only proceed if the suggestions are visible
        if (suggestionsContainer.style.display !== 'block') {
            return;
        }
        
        const suggestions = suggestionsContainer.querySelectorAll('.crime-suggestion-item');
        
        if (suggestions.length === 0) {
            return;
        }
        
        // Find currently selected suggestion
        let selectedIndex = -1;
        for (let i = 0; i < suggestions.length; i++) {
            if (suggestions[i].classList.contains('active')) {
                selectedIndex = i;
                suggestions[i].classList.remove('active');
                break;
            }
        }
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = (selectedIndex + 1) % suggestions.length;
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = selectedIndex < 0 ? suggestions.length - 1 : selectedIndex - 1;
            if (selectedIndex < 0) {
                selectedIndex = suggestions.length - 1;
            }
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            document.getElementById(inputId).value = suggestions[selectedIndex].textContent;
            suggestionsContainer.style.display = 'none';
            return;
        } else if (e.key === 'Escape') {
            suggestionsContainer.style.display = 'none';
            return;
        } else {
            return;
        }
        
        // Highlight the selected suggestion
        suggestions[selectedIndex].classList.add('active');
        
        // Update the input field with the selected suggestion
        document.getElementById(inputId).value = suggestions[selectedIndex].textContent;
    }
    
    // Load data from localStorage
    loadDataFromStorage() {
        try {
            const storedData = localStorage.getItem('prisonData');
            if (storedData) {
                const data = JSON.parse(storedData);
                
                // Set default properties if they're missing
                this.firstNames = data.firstNames || Array(20).fill(" ");
                this.secondNames = data.secondNames || Array(20).fill(" ");
                this.gender = data.gender || Array(20).fill(" ");
                this.cellNo = data.cellNo || [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 
                                            1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020];
                this.age = data.age || Array(20).fill(0);
                this.height = data.height || Array(20).fill(0);
                this.eyeColor = data.eyeColor || Array(20).fill(" ");
                this.crime = data.crime || Array(20).fill(" ");
                this.punishmentMonths = data.punishmentMonths || Array(20).fill(0);
                this.prisonerCount = data.prisonerCount || 0;
                
                // Handle date/time fields which might not exist in older data
                this.entryDateTime = data.entryDateTime || Array(20).fill("");
                this.lastUpdateDateTime = data.lastUpdateDateTime || Array(20).fill("");
                
                // Handle court hearings
                this.previousHearings = data.previousHearings || Array(20).fill().map(() => []);
                this.upcomingHearings = data.upcomingHearings || Array(20).fill().map(() => []);
                
                console.log("Data loaded from localStorage successfully");
            }
        } catch (error) {
            console.error("Error loading from localStorage:", error);
            // Initialize with default values in case of error
            this.resetToDefaults();
        }
    }
    
    // Reset to default values
    resetToDefaults() {
        this.firstNames = Array(20).fill(" ");
        this.secondNames = Array(20).fill(" ");
        this.gender = Array(20).fill(" ");
        this.cellNo = [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 
                       1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020];
        this.age = Array(20).fill(0);
        this.height = Array(20).fill(0);
        this.eyeColor = Array(20).fill(" ");
        this.crime = Array(20).fill(" ");
        this.punishmentMonths = Array(20).fill(0);
        this.prisonerCount = 0;
        this.entryDateTime = Array(20).fill("");
        this.lastUpdateDateTime = Array(20).fill("");
        this.previousHearings = Array(20).fill().map(() => []);
        this.upcomingHearings = Array(20).fill().map(() => []);
    }
    
    // Save data to localStorage
    saveDataToStorage() {
        try {
            const data = {
                firstNames: this.firstNames,
                secondNames: this.secondNames,
                gender: this.gender,
                cellNo: this.cellNo,
                age: this.age,
                height: this.height,
                eyeColor: this.eyeColor,
                crime: this.crime,
                punishmentMonths: this.punishmentMonths,
                prisonerCount: this.prisonerCount,
                entryDateTime: this.entryDateTime,
                lastUpdateDateTime: this.lastUpdateDateTime,
                previousHearings: this.previousHearings,
                upcomingHearings: this.upcomingHearings
            };
            
            // Convert to JSON string
            const jsonString = JSON.stringify(data);
            
            // Save to localStorage
            localStorage.setItem('prisonData', jsonString);
            
            console.log("Data saved to localStorage successfully");
            return true;
        } catch (error) {
            console.error("Error saving to localStorage:", error);
            
            // Try to identify the specific issue
            if (error instanceof TypeError) {
                console.error("Type error - likely an issue with data structure");
            } else if (error instanceof DOMException) {
                // This could be a QuotaExceededError
                console.error("DOM Exception - possibly localStorage is full or disabled");
                
                // Try clearing some space
                try {
                    // Store only essential data
                    const essentialData = {
                        firstNames: this.firstNames,
                        secondNames: this.secondNames,
                        cellNo: this.cellNo
                    };
                    localStorage.setItem('prisonData_minimal', JSON.stringify(essentialData));
                } catch (e) {
                    console.error("Even minimal data storage failed:", e);
                }
            }
            
            return false;
        }
    }
    
    // Clear storage
    clearStorage() {
        // Show confirmation dialog
        const confirmed = confirm("Are you sure you want to clear all prisoner data? This action cannot be undone.");
        
        if (!confirmed) {
            return;
        }
        
        // Reset all data
        this.firstNames = Array(20).fill(" ");
        this.secondNames = Array(20).fill(" ");
        this.gender = Array(20).fill(" ");
        this.cellNo = [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 
                       1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020];
        this.age = Array(20).fill(0);
        this.height = Array(20).fill(0);
        this.eyeColor = Array(20).fill(" ");
        this.crime = Array(20).fill(" ");
        this.punishmentMonths = Array(20).fill(0);
        this.prisonerCount = 0;
        this.entryDateTime = Array(20).fill("");
        this.lastUpdateDateTime = Array(20).fill("");
        this.previousHearings = Array(20).fill().map(() => []);
        this.upcomingHearings = Array(20).fill().map(() => []);
        
        // Remove data from localStorage
        localStorage.removeItem('prisonData');
        
        // Show confirmation message
        const fileMessage = document.getElementById('file-message');
        fileMessage.innerHTML = 'All prisoner data has been cleared successfully';
    }
}

// Function to show login credentials modal
function showLoginCredsModal() {
    const modal = document.getElementById('loginCredsModal');
    const closeBtn = document.querySelector('.close');
    
    if (modal) {
        modal.style.display = 'block';
        
        // Close the modal when the close button is clicked
        if (closeBtn) {
            closeBtn.onclick = function() {
                modal.style.display = 'none';
            };
        }
        
        // Close the modal when clicking outside the modal content
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }
}

// Initialize the system when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM content loaded, initializing Prison Management System");
    
    // Initialize the prison system
    const prisonSystem = new Prison();
    console.log("Prison Management System initialized");
    
    // Show login credentials modal when on login page
    if (window.location.href.includes('login') || document.getElementById('login-page').style.display !== 'none') {
        showLoginCredsModal();
    }
    
    // Add event listener to Continue button to show modal after navigation
    const continueBtn = document.getElementById('continue-btn');
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            // Show modal after a short delay to ensure page transition happens
            setTimeout(showLoginCredsModal, 100);
        });
    }
});