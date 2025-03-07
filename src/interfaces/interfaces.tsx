export interface Location {
    name:    string;
    crs:     string;
    tiploc:  string;
    country: string;
    system:  string;
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