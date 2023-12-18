var thoughts = [
    { title: "Test1", desc: "abc", color: "red", priority: 1 },
    { title: "Test2", desc: "abc", color: "orange", priority: 2 },
    { title: "Test3", desc: "abc", color: "lightBlue", priority: 3 },
    { title: "TestNew", desc: "abc", color: "red", priority: 1 },
    { title: "Test4", desc: "abc", color: "lightGreen", priority: 4 },
    { title: "Test5", desc: "abc", color: "green", priority: 5 },
];


thoughts = thoughts.sort((a,b)=>a.priority - b.priority)

console.log(thoughts)