function brush() {
    return new Promise((resolve) => {
        console.log("brush karo ");
        setTimeout(resolve, 2000);
        
    })
}

function breakfast() {
    // tera code yahan
    return new Promise((resolve) => {
        console.log("breakFast  karo ");
        setTimeout(resolve, 3000);
        
    })
}

function catchBus() {
    // tera code yahan
    return new Promise((resolve) => {
        console.log("bash Pakro  ");
        setTimeout(resolve, 4000);
        
    })
}
brush()
.then(()=>breakfast())
.then(()=>catchBus())
