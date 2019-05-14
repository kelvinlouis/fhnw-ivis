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
