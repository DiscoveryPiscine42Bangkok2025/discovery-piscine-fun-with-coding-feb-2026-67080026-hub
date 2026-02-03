
const ft_list = document.getElementById('ft_list');
const newBtn = document.getElementById('new_btn');

newBtn.addEventListener('click', () => {
    const task = prompt("What do you need to do?");
    if (task && task.trim() !== "") {
        addToDo(task);
        saveCookies();
    }
});

function addToDo(text) {
    const div = document.createElement('div');
    div.textContent = text;
    
    // Deletion Logic
    div.addEventListener('click', () => {
        if (confirm("Do you really want to delete this TO DO?")) {
            div.remove();
            saveCookies();
        }
    });

    // Place at the top
    ft_list.prepend(div);
}

function saveCookies() {
    const tasks = [];
    const items = ft_list.querySelectorAll('div');
    // We iterate backwards if we want to preserve order upon reload
    items.forEach(item => tasks.push(item.textContent));
    
    // Set cookie (expires in 7 days for safety)
    const json_str = JSON.stringify(tasks);
    document.cookie = "todo=" + encodeURIComponent(json_str) + ";path=/;max-age=" + (7*24*60*60);
}

function loadCookies() {
    const name = "todo=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) === 0) {
            const json_str = c.substring(name.length, c.length);
            const tasks = JSON.parse(json_str);
            // Reverse tasks when loading so 'prepend' doesn't flip the order
            tasks.reverse().forEach(task => addToDo(task));
        }
    }
}

// Initial Load
window.onload = loadCookies;