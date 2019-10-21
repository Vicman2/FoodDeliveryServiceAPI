const exercise1 = require('../exercise1');

describe("Fizzbuz", ()=> {
    it('Should be a number', ()=> {
        const arg = ['undefined', null, false, "", {}]
        arg.forEach((el) => {
            expect(()=> {exercise1.fizzBuzz(el)}).toThrow()
        })
    })

    it("Should return FizzBuzz for all the numbers divisible by 3 and 5", ()=> {
        const result = exercise1.fizzBuzz(15);
        expect(result).toBe("FizzBuzz");
    })
    it("Should return Fizz for all the numbers divisible by 3", ()=> {
        const result = exercise1.fizzBuzz(9);
        expect(result).toBe("Fizz");
    })
    it("Should return Buzz for all the numbers divisible by 5", ()=> {
        const result = exercise1.fizzBuzz(10);
        expect(result).toBe("Buzz");
    })
})