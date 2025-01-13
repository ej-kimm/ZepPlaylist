export type melonCharts = {
  httpsDomain: string
  response: MelonResponse
  httpDomain: string
}

export type MelonResponse = {
  RANKDAY: string
  RANKHOUR: string
  STATUS: string
  SONGLIST: MelonChartSong[]
  CHARTINFO: {
    LINKURL: string
    LINKTYPE: string
  }
  STATSELEMENTS: {
    IMPRESSIONID: string
    RANGECODE: string
  }
  MENUID: string
  SECTION: string
  PAGE: string
}

export type MelonChartSong = {
  SONGID: string
  SONGNAME: string
  ALBUMID: string
  ALBUMNAME: string
  ARTISTLIST: MelonArtistList[]
  PLAYTIME: string
  GENRELIST: MelonGenreList[]
  CURRANK: string
  PASTRANK: string
  RANKGAP: string
  RANKTYPE: string
  ISMV: boolean
  ISADULT: boolean
  ISFREE: boolean
  ISHITSONG: boolean
  ISHOLDBACK: boolean
  ISTITLESONG: boolean
  ISSERVICE: boolean
  ISTRACKZERO: boolean
  ALBUMIMG: string
  ALBUMIMGPATH: string
  ALBUMIMGLARGE: string
  ALBUMIMGSMALL: string
  ISSUEDATE: string
  CONTSTYPECODE: string
}

export type MelonArtistList = {
  ARTISTID: string
  ARTISTNAME: string
}

export type MelonGenreList = {
  GENRECODE: string
  GENRENAME: string
}
