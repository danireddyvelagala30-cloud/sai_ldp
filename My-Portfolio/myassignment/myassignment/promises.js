const getData = (uId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Fetched the data!");
            resolve(`User ${uId}: skc@gmail.com`);
        }, 4000);
    });
};

const main = async () => {
    console.log("start");
    const email = await getData("skc");
    console.log("Email id of the user id is: " + email);
    console.log("end");
};

main();
