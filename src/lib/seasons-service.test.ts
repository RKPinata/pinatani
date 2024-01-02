import {
  doOperationOnMonth,
  getRelevantSeasons,
  getSeasonIndexFromDate,
  getSeasonIndexFromName,
} from './seasons-service';

describe('seasons-service', () => {
  describe('getRelevantSeasons', () => {
    it('Winter: should return relevant seasons based winter date', () => {
      const now = new Date('2023-01-01');
      const relevantSeasons = getRelevantSeasons(now);
      expect(relevantSeasons).toEqual([
        { season: 'winter', year: 2023 },
        { season: 'spring', year: 2023 },
        { season: 'summer', year: 2023 },
        { season: 'fall', year: 2022 },
      ]);
    });

    it("Spring: should return relevant seasons based spring date", () => {
      const now = new Date("2023-04-01");
      const relevantSeasons = getRelevantSeasons(now);
      expect(relevantSeasons).toEqual([
        { season: "winter", year: 2023 },
        { season: "spring", year: 2023 },
        { season: "summer", year: 2023 },
        { season: "fall", year: 2023 },
      ]);
    });

    it("Summer: should return relevant seasons based summer date", () => {
      const now = new Date("2023-07-01");
      const relevantSeasons = getRelevantSeasons(now);
      expect(relevantSeasons).toEqual([
        { season: "winter", year: 2024 },
        { season: "spring", year: 2023 },
        { season: "summer", year: 2023 },
        { season: "fall", year: 2023 },
      ]);
    });

    it("Fall: should return relevant seasons based fall date", () => {
      const now = new Date("2023-10-01");
      const relevantSeasons = getRelevantSeasons(now);
      expect(relevantSeasons).toEqual([
        { season: "winter", year: 2024 },
        { season: "spring", year: 2024 },
        { season: "summer", year: 2023 },
        { season: "fall", year: 2023 },
      ]);
    });

  });

  describe('doOperationOnMonth', () => {
    it('Should add specified number of months to the given date', () => {
      const date = new Date('2023-01-01');
      const monthsToAdd = 3;
      const result = doOperationOnMonth({
        operation: 'add',
        date,
        months: monthsToAdd,
      });
      expect(result.getMonth).toEqual(new Date('2023-04-01').getMonth);
    });

    it("Should increment year if exceed December", () => {
      const date = new Date("2023-12-01");
      const monthsToAdd = 3;
      const result = doOperationOnMonth({
        operation: "add",
        date,
        months: monthsToAdd,
      });
      expect(result.getFullYear).toEqual(new Date("2024-03-01").getFullYear);
    });

    it("Should return correct date for add operation", () => {
      const date = new Date("2023-12-01");
      const monthsToAdd = 3;
      const result = doOperationOnMonth({
        operation: "add",
        date,
        months: monthsToAdd,
      });
      expect(result).toEqual(new Date("2024-03-01"));
    });

    it("Should subtract specified number of months from the given date", () => {
      const date = new Date("2023-04-01");
      const monthsToSubtract = 3;
      const result = doOperationOnMonth({
        operation: "subtract",
        date,
        months: monthsToSubtract,
      });
      expect(result.getMonth).toEqual(new Date("2023-01-01").getMonth);
    });


    it("Should decrement year if below January", () => {
      const date = new Date("2023-03-01");
      const monthsToSubtract = 3;
      const result = doOperationOnMonth({
        operation: "subtract",
        date,
        months: monthsToSubtract,
      });
      expect(result.getFullYear).toEqual(new Date("2022-12-01").getFullYear);
    });

    it("Should return correct date for subtract operation", () => {
      const date = new Date("2023-03-01");
      const monthsToSubtract = 3;
      const result = doOperationOnMonth({
        operation: "subtract",
        date,
        months: monthsToSubtract,
      });
      expect(result).toEqual(new Date("2022-12-01"));
    });
  });

  describe('getSeasonIndexFromDate', () => {
    it('Winter: return index of the season from winter date', () => {
      const date = new Date('2023-01-15');
      const seasonIndex = getSeasonIndexFromDate(date);
      expect(seasonIndex).toBe(0); // winter season index is 0
    });

    it("Spring: return index of the season from spring date", () => {
      const date = new Date("2023-04-15");
      const seasonIndex = getSeasonIndexFromDate(date);
      expect(seasonIndex).toBe(1); // spring season index is 0
    });

    it("Summer: return index of the season from summer date", () => {
      const date = new Date("2023-07-15");
      const seasonIndex = getSeasonIndexFromDate(date);
      expect(seasonIndex).toBe(2); // summer season index is 0
    });

    it("Fall: return index of the season from fall date", () => {
      const date = new Date("2023-10-15");
      const seasonIndex = getSeasonIndexFromDate(date);
      expect(seasonIndex).toBe(3); // fall season index is 0
    });
  });

  describe('getSeasonIndexFromName', () => {
    it('Winter: should return the index of the season based on the given season name', () => {
      const seasonName = 'winter';
      const seasonIndex = getSeasonIndexFromName(seasonName);
      expect(seasonIndex).toBe(0); // winter season index is 0
    });

    it("Spring: should return the index of the season based on the given season name", () => {
      const seasonName = "spring";
      const seasonIndex = getSeasonIndexFromName(seasonName);
      expect(seasonIndex).toBe(1); // spring season index is 1
    });

    it("Summer: should return the index of the season based on the given season name", () => {
      const seasonName = "summer";
      const seasonIndex = getSeasonIndexFromName(seasonName);
      expect(seasonIndex).toBe(2); // summer season index is 2
    }); 

    it("Fall: should return the index of the season based on the given season name", () => {
      const seasonName = "fall";
      const seasonIndex = getSeasonIndexFromName(seasonName);
      expect(seasonIndex).toBe(3); // fall season index is 3
    });
  });
});
