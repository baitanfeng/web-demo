{
    var suffix = 'name';

    var person = {
        ['first' + suffix]: 'tianya',
        ['last' + suffix]: 'bai'
    };
}

{
    let person = {
        getGreeting () {
            return 'hello';
        }
    };

    let dog = {
        getGreeting () {
            return 'woof';
        }
    };

    let friend = Object.create(person);
    console.log(friend.getGreeting());
    console.log(Object.getPrototypeOf(friend));
    console.log(Object.getPrototypeOf(friend) === person);

    Object.setPrototypeOf(friend, dog);
    console.log(friend.getGreeting());
    console.log(Object.getPrototypeOf(friend));
    console.log(Object.getPrototypeOf(friend) === dog);
}