import { AnimalController } from "../../../controllers";
import { provider } from "../config/initPact";

describe("Animal Service", () => {
  beforeAll(async () => {
    await provider.setup();
  });

  describe("When a request to delete an animal is made", () => {
    beforeAll(async () => {
      await provider.addInteraction({
        uponReceiving: "a request to delete an animal",
        state: "delete animal",
        withRequest: {
          method: "DELETE",
          path: "/animals/Manchas",
        },
        willRespondWith: {
          status: 204,
        },
      });
    });

    test("should return the correct data", async () => {
      const response = await AnimalController.delete("Manchas");
      expect(response.data).toMatchSnapshot();
      await provider.verify();
    });
  });
  afterAll(() => provider.finalize());
});
