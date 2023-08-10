import Joi from "joi";

describe("Object Validation", () => {
  it("should validate object", () => {
    const loginSchema = Joi.object({
      username: Joi.string().required().min(3).max(100).email(),
      password: Joi.string().required().min(6).max(100),
    });

    const request = {
      username: "wafi@wf.com",
      password: "wafilah",
    };

    const result = loginSchema.validate(request, { abortEarly: false });

    console.info(JSON.stringify(result));
    expect(result.value.username).toBe("wafi@wf.com");
    expect(result.value.password).toBe("wafilah");
  });

  it("should validate nested object", () => {
    const createUserSchema = Joi.object({
      id: Joi.string().required().max(100),
      name: Joi.string().required().max(100),
      address: Joi.object({
        street: Joi.string().required().max(200),
        city: Joi.string().required().max(100),
        country: Joi.string().required().max(100),
        zipCode: Joi.string().required().max(10),
      }).required(),
    });

    const request = {
      address: {},
    };

    const result = createUserSchema.validate(request, {
      abortEarly: false,
    });

    // console.info(result);

    if (result.error) {
      result.error.details.forEach(detail => {
        console.info(`${detail.path} : ${detail.message}`);
      });
    }
  });
});
