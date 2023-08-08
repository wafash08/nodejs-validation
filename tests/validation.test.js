import Joi from "joi";

describe("Validation", function () {
  it("should create and validate schema", function () {
    const schema = Joi.string().min(3).max(100).required();

    const result = schema.validate("wafa");
    if (result.error) {
      console.info(result.error);
    }

    expect(result.value).toBe("wafa");
  });

  it("should throw errow if the value does not meet requirements", function () {
    const schema = Joi.string().min(3).max(100).required();

    const result = schema.validate("w");
    if (result.error) {
      console.info(result.error);
    }

    expect(result.error).toBeDefined();
  });

  it("should validate basic data type", function () {
    const usernameSchema = Joi.string().email().required();
    const isAdminSchema = Joi.boolean().required();
    const priceSchema = Joi.number().required().min(1000).max(1000000);

    const resultUsername = usernameSchema.validate("eko@gmail.com");
    console.info(resultUsername);

    const resultIsAdmin = isAdminSchema.validate("true");
    console.info(resultIsAdmin);
    console.info(resultIsAdmin.error);

    const resultPrice = priceSchema.validate("10000");
    console.info(resultPrice);

    expect(resultUsername.value).toBe("eko@gmail.com");
  });
});
