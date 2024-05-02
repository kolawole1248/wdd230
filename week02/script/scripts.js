// Selecting elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button[type="submit"]');
const list = document.querySelector('#list');

// Click event listener for Add Chapter button
button.addEventListener('click', () => {
    // Check if input is not blank
    if (input.value.trim() !== '') {
        // Create li element
        const li = document.createElement('li');
        // Create delete button
        const deleteButton = document.createElement('button');
        // Populate li element
        li.textContent = input.value.trim();
        // Populate delete button
        deleteButton.textContent = '❌';
        // Append delete button to li element
        li.append(deleteButton);
        // Append li element to the list
        list.append(li);
        // Add event listener to delete button
        deleteButton.addEventListener('click', () => {
            // Remove li element when delete button is clicked
            list.removeChild(li);
            // Set focus to input
            input.focus();
        });
        // Clear input value
        input.value = '';
    } else {
        // If input is blank, provide a message or focus back to input field
        input.focus();
    }
});

