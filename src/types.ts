/**
 * Nested object containing the total contributions per sector and industry
 */
export interface CandidateDataJson {
  [cycle: string]: {
    [cid: string]: {
      [key: string]: number
    }
  }
}

/**
 * Key value pair of state initials to state map.
 */
export interface StatesMapJson {
  [initials: string]: string;
}

/**
 * Map of sector id to sector name
 */
export interface SectorMapJson {
  [key: string]: string;
}

/**
 * Key value pair of industry code to industry name
 */
export interface IndustryMap {
  [industry: string]: string;
}

/**
 * Nested object containing totals per industry and sector
 */
export interface IndustryData {
  [cycle: string]: {
    [sector: string]: {
      [industry: string]: {
        total?: number;
        pacs?: number;
        indivs?: number;
      }
    }
  }
}

/**
 * Single resoved entry of IndustryData
 */
export interface IndustryDataEntry {
  industry: string;
  value: number;
  pacs: number;
  indivs: number;
}
