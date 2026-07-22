const getData = (uId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Fetched the data!");
            resolve("skc@gmail.com");
        }, 4000);
    });
};

const displayEmail = async () => {
    console.log("Start");

    const email = await getData("skc");

    console.log("Email id of the user is: " + email);

    console.log("End");
};
displayEmail();