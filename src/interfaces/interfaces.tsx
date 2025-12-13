export interface Location {
    location: Station;
    filter:   Filter;
    services: Service[];
}

export interface Filter {
    destination: Station;
}

export interface Station {
    name:    string;
    crs:     string;
    tiploc:  string;
    country: string;
    system:  string;
}

export interface Service {
    locationDetail:  LocationDetail;
    serviceUid:      string;
    runDate:         Date;
    trainIdentity:   string;
    runningIdentity: string;
    atocCode:        AtocCode;
    atocName:        AtocName;
    serviceType:     string;
    isPassenger:     boolean;
}

export enum AtocCode {
    NT = "NT",
    VT = "VT",
    Xc = "XC",
}

export enum AtocName {
    AvantiWestCoast = "Avanti West Coast",
    CrossCountry = "CrossCountry",
    Northern = "Northern",
}

export interface LocationDetail {
    realtimeActivated:       boolean;
    tiploc:                  string;
    crs:                     string;
    description:             string;
    gbttBookedArrival:       string;
    gbttBookedDeparture:     string;
    origin:                  Destination[];
    destination:             Destination[];
    isCall:                  boolean;
    isPublicCall:            boolean;
    realtimeArrival:         string;
    realtimeArrivalActual:   boolean;
    realtimeDeparture:       string;
    realtimeDepartureActual: boolean;
    platform:                string;
    platformConfirmed:       boolean;
    platformChanged:         boolean;
    displayAs:               string;
}

export interface DetailedService extends Service {
    detail: Detail;
}

export interface Detail {
    serviceUid:           string;
    runDate:              Date;
    serviceType:          string;
    isPassenger:          boolean;
    trainIdentity:        string;
    powerType:            string;
    trainClass:           string;
    atocCode:             string;
    atocName:             string;
    performanceMonitored: boolean;
    origin:               Destination[];
    destination:          Destination[];
    locations:            LocationDetailElement[];
    realtimeActivated:    boolean;
    runningIdentity:      string;
}

export interface Destination {
    tiploc:      string;
    description: string;
    workingTime: string;
    publicTime:  string;
}

export interface LocationElement {
    realtimeActivated:           boolean;
    tiploc:                      string;
    crs:                         string;
    description:                 string;
    gbttBookedDeparture?:        string;
    origin:                      Destination[];
    destination:                 Destination[];
    isCall:                      boolean;
    isPublicCall:                boolean;
    realtimeDeparture?:          string;
    realtimeDepartureActual?:    boolean;
    platform:                    string;
    platformConfirmed:           boolean;
    platformChanged:             boolean;
    displayAs:                   string;
    gbttBookedArrival?:          string;
    realtimeArrival?:            string;
    realtimeArrivalActual?:      boolean;
    line?:                       string;
    lineConfirmed?:              boolean;
    path?:                       string;
    pathConfirmed?:              boolean;
    gbttBookedDepartureNextDay?: boolean;
    realtimeDepartureNextDay?:   boolean;
    gbttBookedArrivalNextDay?:   boolean;
    realtimeArrivalNextDay?:     boolean;
}

export interface LocationDetailElement {
    realtimeActivated:              boolean;
    tiploc:                         string;
    crs:                            string;
    description:                    string;
    gbttBookedDeparture?:           string;
    origin:                         Destination[];
    destination:                    Destination[];
    isCall:                         boolean;
    isPublicCall:                   boolean;
    realtimeDeparture?:             string;
    realtimeDepartureActual?:       boolean;
    realtimeGbttDepartureLateness?: number;
    platform:                       string;
    platformConfirmed:              boolean;
    platformChanged:                boolean;
    displayAs:                      DisplayAs;
    gbttBookedArrival?:             string;
    realtimeArrival?:               string;
    realtimeArrivalActual?:         boolean;
    realtimeGbttArrivalLateness?:   number | null;
    line?:                          string;
    lineConfirmed?:                 boolean;
    path?:                          string;
    pathConfirmed?:                 boolean;
}

export enum DisplayAs {
    Call = "CALL",
    Destination = "DESTINATION",
    Origin = "ORIGIN",
}