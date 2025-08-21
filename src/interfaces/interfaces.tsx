export interface Location {
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
    locations:            LocationElement[];
    realtimeActivated:    boolean;
    runningIdentity:      string;
}

export interface Service {
    locationDetail:  ServiceDetail;
    serviceUid:      string;
    runDate:         Date;
    trainIdentity:   string;
    runningIdentity: string;
    atocCode:        string;
    atocName:        string;
    serviceType:     string;
    isPassenger:     boolean;
}

export interface ServiceDetail {
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

export interface Destination {
    tiploc:      string;
    description: string;
    workingTime: string;
    publicTime:  string;
}

export enum DisplayAs {
    Call = "CALL",
    Destination = "DESTINATION",
    Origin = "ORIGIN",
}

export interface LocationElement {
    realtimeActivated:        boolean;
    tiploc:                   string;
    crs:                      string;
    description:              string;
    gbttBookedDeparture?:     string;
    origin:                   Destination[];
    destination:              Destination[];
    isCall:                   boolean;
    isPublicCall:             boolean;
    realtimeDeparture?:       string;
    realtimeDepartureActual?: boolean;
    platform:                 string;
    platformConfirmed:        boolean;
    platformChanged:          boolean;
    displayAs:                DisplayAs;
    gbttBookedArrival?:       string;
    realtimeArrival?:         string;
    realtimeArrivalActual?:   boolean;
    line?:                    string;
    lineConfirmed?:           boolean;
    path?:                    string;
    pathConfirmed?:           boolean;
}