import Joi from "joi";

describe("Array Validation", () => {
  it("should validate array", () => {
    const hobbiesSchema = Joi.array()
      .items(Joi.string().required().min(3).max(100))
      .min(1)
      .unique();

    const hobbies = ["sleeping", "reading", "coding"];

    const result = hobbiesSchema.validate(hobbies, {
      abortEarly: false,
    });

    console.log(result);
    expect(result.value[0]).toBe("sleeping");
    expect(result.value.length).toBe(3);
  });

  it("should validate array of object", () => {
    const addressesSchema = Joi.array()
      .min(1)
      .items(
        Joi.object({
          street: Joi.string().required().max(200),
          city: Joi.string().required().max(100),
          country: Joi.string().required().max(100),
          zipCode: Joi.string().required().max(10),
        })
      );

    const addresses = [
      {
        street: "Jalan belum ada",
      },
    ];

    const result = addressesSchema.validate(addresses, {
      abortEarly: false,
    });
    console.info(JSON.stringify(result));
  });
});
