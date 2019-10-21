const lib = require('../lib');


describe('absolute', ()=> {
    it("Should return a positive number if input is positive", ()=> {
        const result =  lib.absolute(1)
        expect(result).toBe(1)
      })
      it("Should return a positive number if input is negative", ()=> {
        const result =  lib.absolute(-1)
        expect(result).toBe(1)
      })
      it("Should return a zero  if input is zero", ()=> {
          const result =  lib.absolute(0)
          expect(result).toBe(0)
        })
})

describe('Welcome', ()=> {
    it('It should return the greeting message', ()=> {
        const result =lib.greet('Vicman')
        expect(result).toContain('Vicman');
        expect(result).toMatch(/Vicman/)
    })
})

describe('testArray', ()=> {
  it("Should return supported currencies", ()=> {
    const result = lib.getCurrencies();
    // expect(result).toContain('USD');
    // expect(result).toContain('AUD');
    // expect(result).toContain('EUR');
    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]))
  });
})

describe("getObject", ()=> {
  it("Should return a valid object", ()=> {
    const result = lib.getProduct(1);
    expect(result).toStrictEqual({id: 1, price: 10})
  })
})

describe("register user", ()=> {
  it("Should throw an exception if username is falsy", ()=> {
    const arg = [null, undefined, NaN, "", 0, false];
    arg.forEach((el)=> {
      expect(()=> { lib.registerUser(el)}).toThrow();
    })
  })
})