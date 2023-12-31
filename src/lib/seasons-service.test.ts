import {
  doOperationOnMonth,
  getRelevantSeasons,
  getSeasonIndexFromDate,
  getSeasonIndexFromName,
} from './seasons-service';

describe('seasons-service', () => {
  describe('getRelevantSeasons', () => {
    it('WINTER: should return relevant seasons based WINTER date', () => {
      const now = new Date('2023-01-01');
      const relevantSeasons = getRelevantSeasons(now);
      expect(relevantSeasons).toEqual([
        { season: 'WINTER', year: 2023 },
        { season: 'SPRING', year: 2023 },
        { season: 'SUMMER', year: 2023 },
        { season: 'FALL', year: 2022 },
      ]);
    });

    it("SPRING: should return relevant seasons based SPRING date", () => {
      const now = new Date("2023-04-01");
      const relevantSeasons = getRelevantSeasons(now);
      expect(relevantSeasons).toEqual([
        { season: "WINTER", year: 2023 },
        { season: "SPRING", year: 2023 },
        { season: "SUMMER", year: 2023 },
        { season: "FALL", year: 2023 },
      ]);
    });

    it("SUMMER: should return relevant seasons based SUMMER date", () => {
      const now = new Date("2023-07-01");
      const relevantSeasons = getRelevantSeasons(now);
      expect(relevantSeasons).toEqual([
        { season: "WINTER", year: 2024 },
        { season: "SPRING", year: 2023 },
        { season: "SUMMER", year: 2023 },
        { season: "FALL", year: 2023 },
      ]);
    });

    it("FALL: should return relevant seasons based FALL date", () => {
      const now = new Date("2023-10-01");
      const relevantSeasons = getRelevantSeasons(now);
      expect(relevantSeasons).toEqual([
        { season: "WINTER", year: 2024 },
        { season: "SPRING", year: 2024 },
        { season: "SUMMER", year: 2023 },
        { season: "FALL", year: 2023 },
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
    it('WINTER: return index of the season from WINTER date', () => {
      const date = new Date('2023-01-15');
      const seasonIndex = getSeasonIndexFromDate(date);
      expect(seasonIndex).toBe(0); // WINTER season index is 0
    });

    it("SPRING: return index of the season from SPRING date", () => {
      const date = new Date("2023-04-15");
      const seasonIndex = getSeasonIndexFromDate(date);
      expect(seasonIndex).toBe(1); // SPRING season index is 0
    });

    it("SUMMER: return index of the season from SUMMER date", () => {
      const date = new Date("2023-07-15");
      const seasonIndex = getSeasonIndexFromDate(date);
      expect(seasonIndex).toBe(2); // SUMMER season index is 0
    });

    it("FALL: return index of the season from FALL date", () => {
      const date = new Date("2023-10-15");
      const seasonIndex = getSeasonIndexFromDate(date);
      expect(seasonIndex).toBe(3); // FALL season index is 0
    });
  });

  describe('getSeasonIndexFromName', () => {
    it('WINTER: should return the index of the season based on the given season name', () => {
      const seasonName = 'WINTER';
      const seasonIndex = getSeasonIndexFromName(seasonName);
      expect(seasonIndex).toBe(0); // WINTER season index is 0
    });

    it("SPRING: should return the index of the season based on the given season name", () => {
      const seasonName = "SPRING";
      const seasonIndex = getSeasonIndexFromName(seasonName);
      expect(seasonIndex).toBe(1); // SPRING season index is 1
    });

    it("SUMMER: should return the index of the season based on the given season name", () => {
      const seasonName = "SUMMER";
      const seasonIndex = getSeasonIndexFromName(seasonName);
      expect(seasonIndex).toBe(2); // SUMMER season index is 2
    }); 

    it("FALL: should return the index of the season based on the given season name", () => {
      const seasonName = "FALL";
      const seasonIndex = getSeasonIndexFromName(seasonName);
      expect(seasonIndex).toBe(3); // FALL season index is 3
    });
  });
});
