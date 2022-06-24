// Todo List
// "new" - Add a Todo
// "list" - List All Todos
// "delete" - Remove Specific Todo
// "quit" - Quit App

let command = "";
todoList = [];
while (command.toLowerCase() != "quit") {
    command = prompt("What would you like to do?");
    if (command.toLowerCase() === "new") {
        todo = prompt("Enter new todo");
        todoList.push(todo);
        console.log(`${todo} added to list`);
    }
    else if (command.toLowerCase() === "list") {
        console.log("*".repeat(10));
        for (let i = 0; i < todoList.length; i++) {
            console.log(`${i}: ${todoList[i]}`);
        }
        console.log("*".repeat(10));
    }
    else if (command.toLowerCase() === "delete") {
        if (todoList.length === 0) {
            console.log("Cannot delete from empty list!");
            continue;
        }

        delIndex = parseInt(prompt("Enter index of todo to delete"));
        if (delIndex < 0 || delIndex >= todoList.length) {
            console.log(`Invalid index!  Accepted range, inclusive, is ${0} to ${todoList.length-1}`);
        }
        else {
            todoList.splice(delIndex, 1);
            console.log("Element was removed");
        }
    }
}

console.log("OK, YOU QUIT THE APP");

